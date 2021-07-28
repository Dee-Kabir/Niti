import { useState,useEffect,Fragment } from "react";
import { getHospital, isAuthenticated } from "../actions/auth";
import classes from "../user/UserDashboard.module.css"
import LoadingComponent from "../utilities/LoadingComponent";
import ShowUserInfo from "../user/ShowUserInfo";
import EditHospitalInfo from "./EditHospitalInfo";
import { editHospitalInfo } from "../actions/firebaseapi";
import AddDoctor from "./AddDoctor";
import Doctors from "./Doctors";
const OrganizationDashboard = (props) => {
    const [values,setValues] = useState({
        info:true,
        edit: false,
        add: false,
        all:false,
        appointmentHistory:false,
        user:"",
        loading : false,
        error: ""
    })
    const changeComponent = (name) => {
        console.log(name)
        setValues({...values,info:false,add:false,edit:false,all:false,appointmentHistory:false,[name]: true})
    }
    const {info,edit,add,all,appointmentHistory,user,loading,error} = values;
    useEffect(()=>{
        loadUser()
    },[])
    const loadUser = () => {
        setValues({...values,loading:true})
        if(isAuthenticated() != props.match.params.hospitalId){
            window.location.href = "/nvjnvjdv"
        }
        setValues({...values,loading:true})
        getHospital(isAuthenticated()).then((data)=>{
            setValues({...values,user:data.data(),loading:false})
        })
    }
    const handleChange = (e) => {
        setValues({...values,user:{...user,[e.target.name]:e.target.value}})
    }
    const handlePlaces = (data) => {
        setValues({...values,user: {...user,[data.category]: data.text}})
    } 
    const handleeditSubmit = (e) => {
        e.preventDefault();
        try{
            setValues({...values,error:"",loading:true})
            editHospitalInfo(user,isAuthenticated()).then((data) => {
                setValues({...values,error:"",loading:false})
                window.location.reload();
            })
        }catch{
            setValues({...values,error: "Connectivity error",loading:false})
        }
    }
    return(!loading ? 
        <div className={classes.Dashboard}>
        <div className={classes.Dashboard_block}>
        <div className={classes.Dashboard_row}>
        <div className={classes.Dashboard_menu_column}>
        <div className={classes.Dashboard_menu_items}>
        <div className={classes.Dashboard_menu_item} onClick={() =>changeComponent('info')}>Hospital Information</div>
        <div className={classes.Dashboard_menu_item} onClick={() => changeComponent('edit')}>Edit Hospital Information </div>
        <div className={classes.Dashboard_menu_item} onClick={() => changeComponent('add')}>Add a doctor</div>
        <div className={classes.Dashboard_menu_item} onClick={() => changeComponent('all')}>All Doctors</div>
        </div>
        </div>
        <div className={classes.Dashboard_info_column}>
        <div>
        {!loading  ? <Fragment>
            {error && <p style={{fontSize:'1.2rem',color:'red'}}>{error}</p>}
            {info && <ShowUserInfo user={user}  /> }
            {edit && <EditHospitalInfo values={user} handleChange={handleChange} handlePlaces={handlePlaces} handleSubmit={handleeditSubmit} />}
            {add && <AddDoctor />}
            {all && <Doctors />}
            </Fragment>
            : <LoadingComponent loading={loading} />
            }
        </div>
        </div>
        </div>
        
        </div>

        </div> : <LoadingComponent loading={loading} />
    )
}
export default OrganizationDashboard;
