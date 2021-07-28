import { Fragment, useState } from "react";
import classes from "./RegisterHospital.module.css";
import SearchInput from "../components/search/SearchInput"
import {firebaseLogin,firebaseRegister} from "../actions/firebaseapi";
import firebase from "../firebase";
import { authenticateHospital, registerHospital } from "../actions/auth";
import LoadingComponent from "../utilities/LoadingComponent";
const RegisterHospital = (props) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    country:"",
    state: "",
    city:"",
    mobileNumber: "",
  });
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [formLogin, setFormLogin] = useState(false);
  const { name, email, password, address, mobileNumber,country,state,city } = values;
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value});
    setError("")
  };
  const handlePlaces = (data) => {
    setValues({...values,[data.category]: data.text})
    setError("")
} 
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      firebaseRegister(email,password).then((createdUser)=>{
        createdUser.user.updateProfile({
          displayName: name,
        }).then(()=>{
          registerHospital({name: name,
            mobileNumber: "+91"+mobileNumber,
            address: address,
            country: country,
            state: state,
            city: city,
            email: email,
          },createdUser.user.uid).then(()=>  {
            setFormLogin(true)
            setValues({...values,name: "",mobileNumber:"",email:"",password:"",address:"",country:"",state:"",city:""})
            setLoading(false)
            setError("")
          }
            ).catch(err => {
              setError(err.message)
              setLoading(false)
            })
           
          }).catch(err => {
            setError(err.message)
            setLoading(false)
          })
        }).catch(err =>{
          setError(err.message)
          setLoading(false)
        })
  }catch{
      setError("Error while connecting")
      setLoading(false)
  }
}
  const handleloginSubmit = (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      firebaseLogin(email,password).then(()=>{
        firebase.auth().onAuthStateChanged((user)=> {
          authenticateHospital(user.uid).then(()=>{
            setValues({...values,email:"",password:""})
            setError("")
            setLoading(false)
            window.location.href = "/"
          })
        
        
        
        })
        
      }).catch(err => {
        setError(err.message)
        setLoading(false)
      })
    }catch{ setError("Error while connecting")
    setLoading(false)}
  }
  const loginForm = () => (
    <div className={classes.RegisterForm_H} >
      <div className={classes.RegisterForm_Block} style={{height:'50%'}}>
        <div style={{ textAlign: "center", margin: "32px 8px 32px" }}>
          <h2 style={{fontWeight:'500'}}>Login to NitiMed</h2>
        </div>
        <form onSubmit={handleloginSubmit} style={{ marginTop: "30px" }}>
          <div className={classes.RegisterForm_HInput}>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter Hospital Email"
              required
            />
          </div>
          <div className={classes.RegisterForm_HInput}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter a password"
              required
            />
          </div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button disabled={loading} type="submit" className={classes.Submit_Btn}>
              Login
            </button>
          </div>
        </form>
        <p style={{ textAlign: "center", fontSize: "1rem", marginTop: "4px" }}>
          Not Registered yet?{" "}
          <span
            onClick={() => setFormLogin(false)}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
  const registerForm = () => (
    <div className={classes.RegisterForm_H}>
      <div className={classes.RegisterForm_Block}>
        <div style={{ textAlign: "center", margin: "16px 8px 32px" }}>
          <h2 style={{fontWeight:'600'}}>Register Your Hospital with NitiMed</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={classes.RegisterForm_HInput}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter Hospital Name"
              required
            />
          </div>
          <div className={classes.RegisterForm_HInput}>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter Hospital Email"
              required
            />
          </div>
          <div className={classes.RegisterForm_HInput}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter a password"
              required
            />
          </div>
          <div className={classes.RegisterForm_HInput}>
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={handleChange}
              placeholder="Enter Hospital Address"
              required
            />
          </div>
          <div className={classes.RegisterForm_HInput}>
          <label>Country</label>
          <div style={{width:'70%'}}>
          <SearchInput category="countries" name="country" placeholder="Country" handlePlaces={handlePlaces}/>
          </div>
          </div>
          <div className={classes.RegisterForm_HInput}>
          <label>State</label>
          <div style={{width:'70%'}}>
          <SearchInput category={country ? `states/${country}` : false} name="state" placeholder="State" handlePlaces={handlePlaces}/>
          </div></div>
          <div className={classes.RegisterForm_HInput}>
          <label>City</label>
          <div style={{width:'70%'}}>
          <SearchInput category={state ? `cities/${state}`: false} name="city" placeholder="City" handlePlaces={handlePlaces}/>
          </div></div>
          <div className={classes.RegisterForm_HInput}>
            <label>Mobile Number</label>
            <input
              type="tel"
              name="mobileNumber"
              value={mobileNumber}
              onChange={handleChange}
              pattern="[1-9]{1}[0-9]{9}"
              placeholder="Enter Hospital mobile Number"
              required
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <button disabled={loading} type="submit" className={classes.Submit_Btn}>
              Register
            </button>
          </div>
        </form>
        <p style={{ textAlign: "center", fontSize: "1rem", marginTop: "4px" }}>
          Already registered?{" "}
          <span
            onClick={() => setFormLogin(true)}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
  return (!loading ? 
    <Fragment>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!formLogin && registerForm()}
      {formLogin && loginForm()}
    </Fragment> : <LoadingComponent loading={loading} />
  );
};
export default RegisterHospital;
