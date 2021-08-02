import classes from "./ShowDoctorInfo.module.css"
import firebase from "../../firebase"
import { isAuthenticated } from "../../actions/auth"
import { Form } from "semantic-ui-react"
const ShowDoctorInfo = ({user}) => {
    const setAvailability = () => {
        firebase.firestore().collection("doctors").doc(`${isAuthenticated() }`).update({
            available: !user.available
        }).then(()=>{
            window.location.reload()
        })
    }
    return( user ? 
        <div className={classes.ShowUserInfo_block}>
        <div className={classes.ShowUserInfo_block_heading}>Account Information</div>
        <div style={{padding:'8px'}}>
        <div className={classes.ShowUserInfo_block_info}>
        <label>Name</label>
        <div>Dr. {user.name}</div>
        </div>
        <div className={classes.ShowUserInfo_block_info}>
        <label>Mobile No.</label>
        <div>{user.mobileNumber}</div>
        </div>
        <div className={classes.ShowUserInfo_block_info}>
        <label>Address</label>
        <div>{user.address}</div>
        </div>
        <div className={classes.ShowUserInfo_block_info}>
        <label>State</label>
        <div>{user.state ? user.state : "No state Selected"}</div>
        </div>
        <div className={classes.ShowUserInfo_block_info}>
        <label>City</label>
        <div>{user.city ? user.city : "No city Selected" }</div>
        </div> 
        <div className={classes.ShowUserInfo_block_info}>
        <label>Available</label>
        <div>
        <Form.Field control="radio" checked={user.available} onChange ={setAvailability} />
        </div>
        </div> 
        </div>
        </div>
        : <h1>No User Found</h1>
    )
}
export default ShowDoctorInfo;