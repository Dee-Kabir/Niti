import { useEffect, useState } from "react";
import { Fragment } from "react";
import RegisterForm from "./RegisterForm";
import {authenticateUser, register, signout} from "../../actions/auth";
const Register = (props) => {
  const [values, setValues] = useState({
    name: "",
    mobileNumber: "",
    address: "",
    state: "",
    city: "",
    loading: false,
    error: "", 

  });
  const { name,mobileNumber, address, loading, error,state,city } =values;
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value, error: "" });
  };
  useEffect(()=>{
    checkmobileNUmber();
    return function clean (){
      localStorage.removeItem("mobileRegister");
    }
  },[])
  const checkmobileNUmber = () => {
    let number_mo = localStorage.getItem("mobileRegister");
    if(number_mo){
      setValues({...values,mobileNumber: localStorage.getItem("mobileRegister").substr(3,10)})
    }else{
      props.location.replace = "/login/user"
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (formIsValid()) {
      setValues({ ...values, loading: true });
      var id = props.match.params.userId
      
      register({ name, mobileNumber, address, state, city,id }).then(() => {
        try {          
          authenticateUser(id,"user").then(()=>{
            localStorage.removeItem("mobileRegister")
          setValues({ ...values, error: "", loading: false });
          window.location.href = "/"
          })
        } catch(err) {
          setValues({
            ...values,
            error: "Connectivity Problem!!" && err.message,
            loading: false,
          });
        }
      });
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
  const handlePlaces = (data) => {
      setValues({...values,[data.category]: data.text})
  } 
  return (
    <Fragment>
      <RegisterForm
        values={values}
        heading = "Register for NitiMed"
        handlePlaces={handlePlaces}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <p>{error}</p>
    </Fragment>
  );
};
export default Register;
