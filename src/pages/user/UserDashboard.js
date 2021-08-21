import classes from "./UserDashboard.module.css"
import ShowUserInfo from "../../components/user/ShowUserInfo";
import EditAccountInfo from "../../components/user/EditAccountInfo";
import AppointmentHistory from "../../components/user/AppointmentHistory";
import { Fragment, useEffect, useState } from "react";
import { getUser, isAuthenticated } from "../../actions/auth";
import LoadingComponent from "../../utilities/LoadingComponent";
import {Link} from "react-router-dom"
const UserDashboard = (props) =>{
    const [values,setValues] = useState({
        info:true,
        edit: false,
        appointmentHistory:false,
        user:"",
        loading : false
    })
    const changeComponent = (name) => {
        setValues({...values,info:false,edit:false,appointmentHistory:false,[name]: true})
    }
    const {info,edit,appointmentHistory,user,loading} = values;
    useEffect(()=>{
        loadUser()
    },[])
    const loadUser = () => {
        setValues({...values,loading:true})
        getUser(isAuthenticated(),"user").then((data)=>{
            setValues({...values,user:data.data(),loading:false})
        })
    }
    return(
        <div className={classes.Dashboard}>
        <div className={classes.Dashboard_block}>
        <div className={classes.Dashboard_row}>
        <div className={classes.Dashboard_menu_column}>
        <div className={classes.Dashboard_menu_items}>
        <div className={classes.Dashboard_menu_item} onClick={() =>changeComponent('info')}>Account Information</div>
        <div className={classes.Dashboard_menu_item} onClick={() => changeComponent('edit')}>Edit Account </div>
        <div className={classes.Dashboard_menu_item}><Link to="/doctors" style={{color:'inherit'}}>Book Appointment</Link></div>
        <div className={classes.Dashboard_menu_item} onClick={() => changeComponent('appointmentHistory')}>Appointment History</div>
        </div>
        </div>
        <div className={classes.Dashboard_info_column}>
        {!loading  ? <Fragment>
        {info && <ShowUserInfo user={user}  /> }
        {edit && <EditAccountInfo user = {user} props={props} />}
        {appointmentHistory && <AppointmentHistory user={user}  />}
        </Fragment>
        : <LoadingComponent loading={loading} />
        }
        </div>
        </div>
        
        </div>

        </div>
    )
}
export default UserDashboard;