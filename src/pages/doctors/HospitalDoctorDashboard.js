import { Fragment, useEffect, useState } from "react"
import { getDoctor } from "../../actions/auth"
import EditDoctorInfo from "../../components/doctors/EditDoctorInfo"
import PendingAppointments from "../../components/doctors/PendingAppointments"
import ShowDoctorInfo from "../../components/doctors/ShowDoctorInfo"
import CompletedAppointments from "../../components/doctors/CompletedAppointments"
import classes from "../user/UserDashboard.module.css"
import LoadingComponent from "../../utilities/LoadingComponent"
const HospitalDoctorDashboard = (props) => {
    const [values,setValues] = useState({
        info:true,
        edit: false,
        appointments: false,
        appointmentHistory:false,
        user: ""
    })
    const [loading,setLoading] = useState(false)
    const [error, setError] = useState("")
    const changeComponent = (name) => {
        setValues({...values,info:false,edit:false,appointments:false,appointmentHistory:false,[name]: true})
    }
    const {info,edit,appointments,appointmentHistory,user} = values;
    useEffect(()=>{
        loadUser()
    },[])
    const loadUser = () => {
        // if(isAuthenticated() != props.match.params.hospitalId){
        //     window.location.href = "/nvjnvjdv"
        // }
        setLoading(true)
        getDoctor(props.match.params.doctorId).then((data)=>{
            setValues({...values,user:data.data()})
        })
        setLoading(false)
    }
    return(!loading ? 
        <div className={classes.Dashboard}>
        <div className={classes.Dashboard_block}>
        <div className={classes.Dashboard_row}>
        <div className={classes.Dashboard_menu_column}>
        <div className={classes.Dashboard_menu_items}>
        <div className={classes.Dashboard_menu_item} onClick={() =>changeComponent('info')}>Account Information</div>
        <div className={classes.Dashboard_menu_item} onClick={() => changeComponent('edit')}>Edit Account Information </div>
        <div className={classes.Dashboard_menu_item} onClick={() => changeComponent('appointments')}>check pending Appointments</div>
        <div className={classes.Dashboard_menu_item} onClick={() => changeComponent('appointmentHistory')}>Completed Appointments</div>
        </div>
        </div>
        <div className={classes.Dashboard_info_column}>
        {!loading  ? <Fragment>
            {error && <p style={{fontSize:'1.2rem',color:'red'}}>{error}</p>}
            {info && <ShowDoctorInfo user={user} id={ props.match.params.doctorId} /> }
            {edit && <EditDoctorInfo user={user} docId ={ props.match.params.doctorId}  />}
            {appointments && <PendingAppointments doctorId ={ props.match.params.doctorId}/>}
            {appointmentHistory && <CompletedAppointments doctorId ={ props.match.params.doctorId} />}
            </Fragment>
            : <LoadingComponent loading={loading} />
            }
        </div>
        </div>
        
        </div>

        </div> : <LoadingComponent loading={loading} />
    )
}
export default HospitalDoctorDashboard;