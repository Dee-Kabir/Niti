import classes from "./ShowDoctorInfo.module.css";
import firebase from "../../firebase";
import { isAuthenticated } from "../../actions/auth";
import { Link, useHistory } from "react-router-dom";
const ShowDoctorInfo = ({ user, id }) => {
  const history = useHistory()
  const setAvailability = () => {
    firebase
      .firestore()
      .collection("doctors")
      .doc(id ? id : `${isAuthenticated()}`)
      .update({
        available: !user.available,
      })
      .then(() => {
        window.location.reload();
      });
  };
  return user ? (
    <div className={classes.ShowUserInfo_block}>
      <div className={classes.ShowUserInfo_block_heading}>
        Account Information
      </div>
      <div style={{ padding: "8px" }}>
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
          <div>{user.city ? user.city : "No city Selected"}</div>
        </div>
        <div className={classes.ShowUserInfo_block_info}>
          <label>Available</label>
          <div>
            <input
              type="checkbox"
              checked={user.available}
              onChange={setAvailability}
            />
          </div>
        </div>
        <div className={classes.ShowUserInfo_block_info}>
        <label>click the button to join room</label>
        <Link to={`/join-room?host=true&name=${user.name}&userId=${id ? id.substr(1,12) : isAuthenticated().substr(1,12) }`} ><button>Host Meeting</button></Link>
        </div>
      </div>
    </div>
  ) : (
    <h1>No User Found</h1>
  );
};
export default ShowDoctorInfo;
