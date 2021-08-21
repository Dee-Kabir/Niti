import { useEffect, useState } from "react";
import classes from "./RegisterDoctor.module.css";
import { savedoctor } from "../../actions/firebaseapi";
import LoadingComponent from "../../utilities/LoadingComponent"
import { authenticateUser } from "../../actions/auth";
import RegisterDoctorForm from "../../components/doctors/RegisterDoctorForm";
const RegisterDoctor = (props) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    mobileNumber:"",
    qualification: "", 
    jobType: "",                  //whether public or private
    servingType:"",               // whether serving or retired
    workTime: "",                 //whether full time or parttime
    weekDays: [],             // week days
    speciality: "",
    fee: 0,
    address: "",
    state: "",
    city: "",
  });

  const {
    name,
    email,
    mobileNumber,
    qualification,
    jobType ,               //whether public or private
    servingType,               // whether serving or retired
    workTime ,                //whether full time or parttime
    weekDays,             // week days
    speciality,
    fee,
    address,
    state,
    city,
  } = values;
  const [loading,setLoading] = useState(false)
  const [photo,setPhoto] = useState("");
  const [proof,setProof] = useState("");
  const [qualificationProof,setQualificationProof] = useState("");
  const [doctorPhoto, setDoctorPhoto] = useState("")
  const [error,setError] = useState("");

  useEffect(()=>{
    checkmobileNUmber()
    if(props.match.params.userId !== localStorage.getItem("mobileRegister")){
      window.location.href = "/rfrfrf"
    }
  },[])
  function clean(){
    localStorage.removeItem("mobileRegister")
  }
  const checkmobileNUmber = () => {
      setValues({...values,mobileNumber: (props.match.params.userId).substr(3,10)})
  }
  const handlePlaces = (data) => {
    setValues({...values,[data.category]: data.text})
    setError("")
  } 
  const handleChange=(e)=>{
    setValues({...values,[e.target.name]: e.target.value})
    setError("")
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
 
    if(name && email && mobileNumber && qualification && jobType && servingType && workTime && weekDays.length > 0 && speciality && address && state && city && photo && proof){
      setLoading(true);
      savedoctor(name,email,mobileNumber,qualification,speciality,jobType,servingType,fee,workTime,weekDays,address,state,city,photo,proof).then(()=>{
        authenticateUser(`+91${mobileNumber}`,"doctor")
        setLoading(false)
        window.location.href = "/"
        clean()
      }).catch((err) => {
        setError(err.message)
        setLoading(false)
      })
    }else{
      setError("All marked Fields are required");
    }
  }
  const handleImageChange = (e) => {
    const img = e.target.files[0];
    console.log(img,"image")
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
        else if(e.target.name == "proof"){
        setQualificationProof(URL.createObjectURL(img))
        setProof(img)
        }
        setError("")
      }
    }
  };
  return (!loading ? 
    <div className={classes.RegisterForm} >
    <div className={classes.RegisterForm_Block}>
    <div className={classes.Heading_Add_doctor}>Register on NitiMed</div>
    {error && <p style={{fontSize:'1.2rem',color:'red'}}>{error}</p>}
    <RegisterDoctorForm edit={false} handleSubmit={handleSubmit} handleChange={handleChange} setValues={setValues} values ={values} 
    handlePlaces={handlePlaces} doctorPhoto ={doctorPhoto} handleImageChange={handleImageChange} qualificationProof={qualificationProof} loading ={loading} />
      </div>
    </div> : <LoadingComponent loading={loading} />
  );
};
export default RegisterDoctor;
