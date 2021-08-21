import { Fragment, useState } from "react";
import {firebaseLogin,firebaseRegister} from "../../actions/firebaseapi";
import firebase from "../../firebase";
import { authenticateHospital, registerHospital } from "../../actions/auth";
import LoadingComponent from "../../utilities/LoadingComponent";
import RegisterForm from "../../components/hospitals/RegisterForm";
import LoginForm from "../../components/hospitals/LoginForm";
import ErrorComponent from "../../utilities/ErrorComponent";
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
          registerHospital({name: name.toUpperCase(),
            mobileNumber: "+91"+mobileNumber,
            address: address,
            country: country,
            state: state.toUpperCase(),
            city: city.toUpperCase(),
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
  
  return (!loading ? 
    <Fragment>
      {error && <ErrorComponent error={error} />}
      {!formLogin && <RegisterForm handleChange={handleChange} handlePlaces={handlePlaces} handleSubmit={handleSubmit} loading={loading} values={values} setFormLogin={setFormLogin} />}
      {formLogin && <LoginForm handleChange={handleChange} setFormLogin={setFormLogin} handleloginSubmit={handleloginSubmit} loading={loading} email={email} password={password}/>}
    </Fragment> : <LoadingComponent loading={loading} />
  );
};
export default RegisterHospital;
