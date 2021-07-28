// import { isAuthenticated } from "../../actions/auth";
// import { addDoctor } from "../../actions/hospital";
import AddDoctorForm from "./AddDoctorForm";
import { useState,Fragment } from "react";
import { addDoctortoHospital } from "../actions/firebaseapi";
import { isAuthenticated } from "../actions/auth";
import LoadingComponent from "../utilities/LoadingComponent";

const AddDoctor = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    address:"",
    city:"",
    state:"",
    speciality: ""
  });
  const { name,email,mobileNumber,address,city,state } = values;
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/300.png/09f/fff"
  );
  const [photo,setPhoto] = useState("")
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
          setPreview(URL.createObjectURL(img));
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
            addDoctortoHospital(isAuthenticated(),{name,email,mobileNumber:'+91'+mobileNumber,address,city,state},photo).then((data) => {
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
      <AddDoctorForm handlePlaces={handlePlaces} setValues={setValues} values={values} handleChange={handleChange} preview={preview} setPreview={handleImageChange} handleSubmit={handleSubmit}/>
    </Fragment> : <LoadingComponent loading={loading} />
  );
};
export default AddDoctor;