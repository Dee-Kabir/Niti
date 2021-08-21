import { useEffect, useState } from "react";
import { getUser, isAuthenticated } from "../../actions/auth";
import RegisterForm from "./RegisterForm"
import {editInfo} from "../../actions/firebaseapi"
const EditAccountInfo = ({user,props}) => {
    const [values,setValues] = useState({
        name: "",
        mobileNumber: "",
        address: "",
        country: "",
        state: "",
        city: "",
        loading: false,
        error: "", 
    
      });
      const { name,mobileNumber, address, loading, error,country,state,city } =values;
      const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value, error: "" });
      };
      const handlePlaces = (data) => {
        setValues({...values,[data.category]: data.text,err:""})
    } 
    useEffect(()=>{
        loadUserInfo()
    },[])
    const loadUserInfo = () => {
        getUser(isAuthenticated()).then(data => {
            let {name,mobileNumber,address,country,state,city} = data.data();
            setValues({...values,name:name,mobileNumber:mobileNumber,address:address,country:country,state:state,city:city})
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (formIsValid()) {
          setValues({ ...values, loading: true });
          const id = isAuthenticated()
          console.log("id in",id)
          try {editInfo(name, address,country, state, city,id ).then(() => {
                      
            //   authenticateUser(id)
            getUser(isAuthenticated(),"users").then((data) => {
                localStorage.setItem("userInfo", JSON.stringify(data));
              });
              setValues({ ...values, error: "", loading: false });
              window.location.reload()

            })}catch(err) {
                console.log(err)
              setValues({
                ...values,
                error: "Connectivity Problem!!" && err.message,
                loading: false,
              });
            }
        }
      };
      const formIsValid = () => {
        if (!name) {
          setValues({ ...values, error: "name is required" }); 
          return false;
        }else if(mobileNumber.toString().length != 10){
            setValues({ ...values, error: "Valid mobileNumber is required" });
            return false;
        }if(address.length < 20){
            setValues({...values,error: "Enter at least 20 character long address"})
        }
        else {
          return true;
        }
      };
    return(
        <div>
        <p style={{color:'red'}}>{error}</p>
        <RegisterForm values={values}
        heading = "Edit Account Information"
        handlePlaces={handlePlaces}
        handleChange={handleChange}
        handleSubmit={handleSubmit} />
        
        </div>
    )
} 
export default EditAccountInfo;