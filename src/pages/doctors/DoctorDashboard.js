import { Fragment, useEffect, useState } from "react"
import { getDoctor, isAuthenticated } from "../../actions/auth"
import EditDoctorInfo from "../../components/doctors/EditDoctorInfo"
import PendingAppointments from "../../components/doctors/PendingAppointments"
import ShowDoctorInfo from "../../components/doctors/ShowDoctorInfo"
import CompletedAppointments from "../../components/doctors/CompletedAppointments"
import classes from "../../pages/user/UserDashboard.module.css"
import LoadingComponent from "../../utilities/LoadingComponent"
import ErrorComponent from "../../utilities/ErrorComponent"
const DoctorDashboard = (props) => {
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
        if(isAuthenticated() != props.match.params.doctorId){
            window.location.href = "/nvjnvjdv"
        }
        setLoading(true)
        getDoctor(isAuthenticated()).then((data)=>{
            setValues({...values,user:data.data()})
        }).catch(err =>
            setError(err.message)
        )
        setLoading(false)
    }
    return(!loading ? <Fragment>
        {error && <ErrorComponent error={error} />}
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
            {error && <ErrorComponent error={error}/>}
            {info && <ShowDoctorInfo user={user}  /> }
            {edit && <EditDoctorInfo user={user} />}
            {appointments && <PendingAppointments />}
            {appointmentHistory && <CompletedAppointments />}
            </Fragment>
            : <LoadingComponent loading={loading} />
            }
        </div>
        </div>
        
        </div>

        </div> </Fragment>: <LoadingComponent loading={loading} />
    )
}
export default DoctorDashboard;