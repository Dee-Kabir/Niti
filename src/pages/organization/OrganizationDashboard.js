import { useState,useEffect,Fragment } from "react";
import { getHospital, isAuthenticated } from "../../actions/auth";
import classes from "../user/UserDashboard.module.css"
import LoadingComponent from "../../utilities/LoadingComponent";
import ShowUserInfo from "../../components/user/ShowUserInfo";
import { editHospitalInfo } from "../../actions/firebaseapi";
import AddDoctor from "../../components/hospitals/AddDoctor";
import Doctors from "./Doctors";
import RegisterForm from "../../components/hospitals/RegisterForm";
import ErrorComponent from "../../utilities/ErrorComponent"
const OrganizationDashboard = (props) => {
    const [values,setValues] = useState({
        info:true,
        edit: false,
        add: false,
        all:false,
        user:"",
        loading : false,
        error: ""
    })
    const [error, setError] = useState("")
    const changeComponent = (name) => {
        setValues({...values,info:false,add:false,edit:false,all:false,[name]: true})
    }
    const {info,edit,add,all,appointmentHistory,user,loading} = values;
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
                setValues({...values,loading:false})
                setError("")
                window.location.reload();
            })
        }catch{
            setValues({...values,loading:false})
            setError("Connectivity error")
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
        {!loading  ? <Fragment>
            {error && <ErrorComponent error={error} />}
            {info && <ShowUserInfo user={user}  /> }
            {edit && <RegisterForm values={user} handleChange={handleChange} handlePlaces={handlePlaces} handleSubmit={handleeditSubmit} loading={loading} edit={true}  />}
            {add && <AddDoctor/>}
            {all && <Doctors doctors = {user.doctors} />}
            </Fragment>
            : <LoadingComponent loading={loading} />
            }
        </div>
        </div>
        
        </div>

        </div> : <LoadingComponent loading={loading} />
    )
}
export default OrganizationDashboard;
