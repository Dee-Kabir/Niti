import UploadFiles from "../uploadFiles/UploadFiles"
import classes from "./Doctors.module.css"
import DoctorSearchBox from "./DoctorsSearchBox"
const Doctors = () => {
    return (
        <div className={classes.Doctors_component}>
        <div className={classes.Doctors_flow}>
        <div className={classes.Doctors_flow_heading}>How Nitimed helps in Doctor Consultation ?</div>
        <div className={classes.Doctors_flow_points}>
        <div className={classes.Doctors_flow_point}>Choose a Doctor</div>
        <div className={classes.Doctors_flow_point}> Book a Slot</div>
        <div className={classes.Doctors_flow_point}>Make Payment</div>
        <div className={classes.Doctors_flow_point}>Make a video call</div>
        <div className={classes.Doctors_flow_point}>Problem solved</div>
        </div>
        </div>
        <div className={classes.SearchResults}>
        <DoctorSearchBox />
        </div>
        <UploadFiles />

        </div>
    )
}
export default Doctors;
