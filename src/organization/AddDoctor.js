// import { isAuthenticated } from "../../actions/auth";
// import { addDoctor } from "../../actions/hospital";
import AddDoctorForm from "./AddDoctorForm";
import { useState,Fragment } from "react";
import { addDoctortoHospital } from "../actions/firebaseapi";
import { isAuthenticated } from "../actions/auth";
import LoadingComponent from "../utilities/LoadingComponent";
import RegisterDoctorForm from "../doctors/RegisterDoctorForm";

const AddDoctor = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    qualification: "", 
    jobType: "public",                  //whether public or private
    servingType:"serving",               // whether serving or retired
    workTime: "fulltime",                 //whether full time or parttime
    weekDays: [],             // week days
    consultingTime: "",           // working Time
    speciality: "",
    fee: 0,
    address:"",
    city:"",
    state:"",
  });
  const { name,
    email,
    mobileNumber,
    qualification,
    jobType ,               //whether public or private
    servingType,               // whether serving or retired
    workTime ,                //whether full time or parttime
    weekDays,             // week days
    consultingTime,          // working Time
    speciality,
    fee,
    address,
    state,
    city } = values;
  const [doctorPhoto, setDoctorPhoto] = useState("")
  const [photo,setPhoto] = useState("");
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);

  const handleImageChange = (e) => {
    const img = e.target.files[0];
    if (img) {
      if(img.size > 2000000){
        setError( "Image size should be less than 2mb")
      }else if(img.type != "image/jpeg"){
        setError("Only .jpeg images allowed")
      }
      else{
        if(e.target.name == "photo"){
          setDoctorPhoto(URL.createObjectURL(img));
          setPhoto(img)
        }
        setError("")
      }
    }
  };
    const handleChange = (e) => {
        setValues({...values,[e.target.name]:e.target.value})
        setError("")
        
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        try{
            if(name && email && mobileNumber.length == 10 && address && city && state){
              setLoading(true)
            addDoctortoHospital(isAuthenticated(),{name: name.toUpperCase(),
              email,
              mobileNumber:'+91'+mobileNumber,qualification,jobType,servingType,workTime,weekDays,speciality,fee,
              address,city:city.toUpperCase(),state:state.toUpperCase()},
              doctorPhoto,
              ).then((data) => {
              setLoading(false)
              setError("")
              window.location.href = "/"
            })
            }else{
              setError("All fields required");
            }
        }catch{
            setLoading(false)
            setError("Error while connecting")
        }
    }
    const handlePlaces = (data) => {
      setValues({...values,[data.category]: data.text})
      setError("");
  } 
  return (!loading ?
    <Fragment>
    {error && <p style={{fontSize:'1.1rem',color:'red'}}>{error}</p>}
      <RegisterDoctorForm handlePlaces={handlePlaces} 
      setValues={setValues} 
      values={values} 
      handleChange={handleChange} 
      doctorPhoto={doctorPhoto} setPreview={handleImageChange} handleSubmit={handleSubmit} handleImageChange={handleImageChange} loading={loading}  addDoctor={true}/>
    </Fragment> : <LoadingComponent loading={loading} />
  );
};
export default AddDoctor;