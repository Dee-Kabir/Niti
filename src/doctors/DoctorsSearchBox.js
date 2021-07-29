import { useState } from "react";
import { findDoctorByName, findHospitals } from "../actions/firebaseapi";
import SearchInput from "../components/search/SearchInput"
import classes from "./Doctors.module.css"
import DoctorCard from "./DoctorCard"
import HospitalCard from "../components/cards/HospitalCard";
const DoctorSearchBox = () => {
    const [values,setValues] = useState({
        state: "",
        city: "",
        error: ""
    })
    const {state,city,error} = values;
    const [doctorName,setDoctorName] = useState("")
    const [foundDoctors,setFinfDoctors] = useState("")
    const [foundHospitals,setFindHospitals] = useState("")
    const handlePlaces = (data) => {
        if(data.category == "state")
        setValues({state:"",city:"",[data.category]: data.text,error:""})
        else
        setValues({...values,[data.category]: data.text,error:""})
    } 
    const handleChange = (e) => {
        setDoctorName(e.target.value)
        setValues({...values,error:""})
    }
    const findDoctor = () => {
        if(doctorName!=""){
            findDoctors(doctorName,"name")
        }else if(city!=""){
            findDoctors(city,"city")
        }else if(state!=""){
            findDoctors(state,"state")
        }else{
            setValues({...values,error:"Select at least one field"})
        }
        
    }
    const findDoctors = (value,type) => {
        let result = [];
        let hospitalsResult = []
        findDoctorByName(value,type).then((data)=> {
            data.forEach((da) => 
                result.push({...da.data(),id: da.id})
            )
            setFinfDoctors(result)
        })
        findHospitals(value,type).then((data)=>{
            data.forEach((da)=>{
                hospitalsResult.push({...da.data(),id:da.id})
            })
            setFindHospitals(hospitalsResult)
        })
    }
    return(
        <div style={{width: '100%'}}>
        <div className={classes.Doctor_SearchBox_Heading}>Find a Doctor</div>
        {error && <p style={{fontSize:"1.2rem",color:'red'}}>{error}</p>}
        <div className={classes.Doctor_SearchBox}>
        <div className={classes.Doctor_SearchBox_state}>
        <SearchInput category="states/India" value={state} name="state" handlePlaces={handlePlaces} placeholder="state" />
        </div>
        <div className={classes.Doctor_SearchBox_city}>
        <SearchInput category={state ? `cities/${state}`: false} value={city} name="city" handlePlaces={handlePlaces} placeholder="city" />
        </div>
        <div style={{margin: "0 8px",fontWeight: '700'}}>Or</div>
        <div className={classes.Doctor_SearchBox_doctor_name}>
        <input type="text" placeholder="Enter Doctor Name" name="doctorName" value={doctorName} onChange={handleChange}/>
        </div>
        <button onClick={findDoctor} className={classes.Find_A_Doctor_btn}>Find Doctor</button>
        </div>
        {foundHospitals.length>0  && <h1>Hospitals</h1>}
        
            {foundHospitals.length>0 && foundHospitals.map((hosp,_)=>(
                <HospitalCard key={hosp.id} hospital={hosp} />
            ))
        }
        {foundDoctors && <h1>Doctors</h1>}
        
            {foundDoctors && (foundDoctors.length > 0 ? foundDoctors.map((doc,_)=>(
                <DoctorCard key={_} doctor={doc} />
            )) : <h1>No doctor Found</h1>)
        }
        </div>
    )
}
export default DoctorSearchBox;