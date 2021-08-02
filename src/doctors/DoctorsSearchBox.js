import { useState,Fragment, useEffect } from "react";
import { findDoctorByName, findHospitals } from "../actions/firebaseapi";
import SearchInput from "../components/search/SearchInput"
import classes from "./Doctors.module.css"
import DoctorCard from "./DoctorCard"
import HospitalCard from "../components/cards/HospitalCard";
import { isAuthenticated } from "../actions/auth";
import { Grid, Header, Input } from "semantic-ui-react";
import ErrorComponent from "../utilities/ErrorComponent"
import { Alert } from "antd";
const DoctorSearchBox = () => {
    const [values,setValues] = useState({
        state: "",
        city: "",
        error: ""
    })
    useEffect(()=>{
        if(isAuthenticated()){
            const cityName = JSON.parse(localStorage.getItem("userInfo")).city
        findDoctors(cityName,"city");
        }
    },[])
    const {state,city,error} = values;
    const [doctorName,setDoctorName] = useState("")
    const [foundPrivateDoctors,setFindPrivateDoctors] = useState("")
    const [foundGovernmentDoctors,setFindGovernmentDoctors] = useState("")
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
        let governmentResult = []
        let hospitalsResult = []
        findDoctorByName(value,type).then((data)=> {
            data.forEach((da) => {
                if(da.data().jobType == "public"){
                    governmentResult.push({...da.data(),id: da.id})
                }else{
                    result.push({...da.data(),id: da.id})
                }
                
            })
            setFindGovernmentDoctors(governmentResult)
            setFindPrivateDoctors(result)
        })
        findHospitals(value,type).then((data)=>{
            data.forEach((da)=>{
                hospitalsResult.push({...da.data(),id:da.id})
            })
            setFindHospitals(hospitalsResult)
        })
    }
    return(
        <Grid stackable className="m-3">
        <Header size="large">Find a Doctor </Header>
        <ErrorComponent error={error} />
        <div className={classes.Doctor_SearchBox}>
        <div className={classes.Doctor_SearchBox_state}>
        <SearchInput category="states/India" value={state} name="state" handlePlaces={handlePlaces} placeholder="state" />
        </div>
        <div style={{margin: "0 8px",fontWeight: '700'}}>Or</div>
        <div className={classes.Doctor_SearchBox_city}>
        <SearchInput category={state ? `cities/${state}`: false} value={city} name="city" handlePlaces={handlePlaces} placeholder="city" />
        </div>
        <div style={{margin: "0 8px",fontWeight: '700'}}>Or</div>
        <div className={classes.Doctor_SearchBox_doctor_name}>
        <Input style={{width:'100%'}} type="text" placeholder="Enter Doctor Name" name="doctorName" value={doctorName} onChange={handleChange}/>
        </div>
        <button onClick={findDoctor} className={classes.Find_A_Doctor_btn}>Find Doctor</button>
        </div>
        {foundHospitals.length>0  && <h1>Hospitals</h1>}
            {foundHospitals.length>0 && foundHospitals.map((hosp,_)=>(
                <HospitalCard key={hosp.id} hospital={hosp} />
            ))
        }
        {foundGovernmentDoctors.length > 0 ? <Fragment><h1>Government Doctors</h1>
            {foundGovernmentDoctors.map((doc,_)=>(
                <DoctorCard key={_} doctor={doc} />
            )) }</Fragment>: foundGovernmentDoctors && <Alert className="mt-4" type="info" message="No Government doctor Found"/>
        }
        {foundPrivateDoctors.length > 0 ? <Fragment><h1>Private Doctors</h1>
            {foundPrivateDoctors.map((doc,_)=>(
                <DoctorCard key={_} doctor={doc} />
            )) }</Fragment>: foundPrivateDoctors && <Alert className="mt-4" type="info" message="No doctor Found"/>
        }
        </Grid>
    )
}
export default DoctorSearchBox;