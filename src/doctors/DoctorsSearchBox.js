import { useState } from "react";
import { findDoctorByName } from "../actions/firebaseapi";
import SearchInput from "../components/search/SearchInput"
import classes from "./Doctors.module.css"
import DoctorCard from "./DoctorCard"
const DoctorSearchBox = () => {
    const [values,setValues] = useState({
        state: "",
        city: "",
        error: ""
    })
    const {state,city,error} = values;
    const [doctorName,setDoctorName] = useState("")
    const [foundDoctors,setFinfDoctors] = useState("")
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
        let result = [];
        if(doctorName!=""){
            findDoctorByName(doctorName,"name").then((data)=> {
                data.forEach((da) => 
                    result.push(da.data())
                )
                setFinfDoctors([...result])
            })
        }else if(city!=""){
            findDoctorByName(city,"city").then((data)=> {
                data.forEach((da) => 
                    result.push(da.data())
                )
                setFinfDoctors([...result])
            })
        }else if(state!=""){
            findDoctorByName(state,"state").then((data)=> {
                data.forEach((da) => 
                    result.push(da.data())
                )
                setFinfDoctors([...result])
            })
            
        }else{
            setValues({...values,error:"Select at least one field"})
        }
        
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
        <div style={{margin: "auto 8px",fontWeight: '700'}}>Or</div>
        <div className={classes.Doctor_SearchBox_doctor_name}>
        <input type="text" placeholder="Enter Doctor Name" name="doctorName" value={doctorName} onChange={handleChange}/>
        </div>
        <button onClick={findDoctor} className={classes.Find_A_Doctor_btn}>Find Doctor</button>
        </div>
        {
            foundDoctors.length > 0 ? foundDoctors.map((doc,_)=>(
                <DoctorCard key={_} doctor={doc} />
            )) : <h1>No doctor Found</h1>
        }
        </div>
    )
}
export default DoctorSearchBox;