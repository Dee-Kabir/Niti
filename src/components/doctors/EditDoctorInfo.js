import { useEffect, useState } from "react";
import { getDoctor, isAuthenticated } from "../../actions/auth";
import RegisterDoctorForm from "../../doctors/RegisterDoctorForm";
import LoadingComponent from "../../utilities/LoadingComponent";
import classes from "./ShowDoctorInfo.module.css"
import {editDoctor} from "../../actions/firebaseapi"

const EditDoctorInfo = ({user}) => {
    const [values,setValues] = useState({
        name: "",
        email: "",
        mobileNumber:"",
        qualification: "",
        jobType: "",                  //whether public or private
        servingType:"",               // whether serving or retired
        workTime: "",                 //whether full time or parttime
        weekDays: [],             // week days
        consultingTime: "",           // working Time
        speciality: "",
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
    consultingTime,          // working Time
    speciality,
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
        loadDoctorInfo()
    },[])
    const handleChange=(e)=>{
        setValues({...values,[e.target.name]: e.target.value})
        setError("")
    }
    const handlePlaces = (data) => {
        setValues({...values,[data.category]: data.text})
        setError("")
    } 
    
    const loadDoctorInfo = () => {
        // getDoctor(isAuthenticated()).then(data => {
            let {name,
                email,
                mobileNumber,
                qualification,
                jobType ,               //whether public or private
                servingType,               // whether serving or retired
                workTime ,                //whether full time or parttime
                weekDays,             // week days
                consultingTime,          // working Time
                speciality,
                address,
                state,
                city,photo,proof} = user;
            setValues({...values,name:name,email: email,mobileNumber:mobileNumber,qualification:qualification,
                jobType:jobType,servingType: servingType,workTime:workTime,weekDays:weekDays,consultingTime:consultingTime,
                speciality:speciality,address:address,state:state,city:city})
                setDoctorPhoto(photo)
                setQualificationProof(proof)
        // })
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        setLoading(true);
        const id = isAuthenticated()
        // if(name && email && mobileNumber && qualification && jobType && servingType && workTime && weekDays.length > 0 && consultingTime && speciality && address && state && city && photo && proof){
          editDoctor(name,email,id,mobileNumber,qualification,jobType,servingType,workTime,weekDays,address,speciality,state,city).then(()=>{
            setLoading(false)
            window.location.replace(`/doctor-dashboard/${id}`)
          }).catch(() => {
            setLoading(false)
          })
        // }
    }

    return (!loading ? 
        <div className={classes.RegisterForm} >
        <div className={classes.RegisterForm_Block}>
        <div className={classes.Heading_Add_doctor}>Register on NitiMed</div>
        {error && <p style={{fontSize:'1.2rem',color:'red'}}>{error}</p>}
        <RegisterDoctorForm handleSubmit={handleSubmit} handleChange={handleChange} setValues={setValues} values ={values} 
        handlePlaces={handlePlaces} doctorPhoto ={doctorPhoto} qualificationProof={qualificationProof} loading ={loading} edit={true} />
          </div>
        </div> : <LoadingComponent loading={loading} />
      );
} 
export default EditDoctorInfo;