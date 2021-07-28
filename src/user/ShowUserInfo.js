import classes from "./ShowUserInfo.module.css"
const ShowUserInfo = ({user}) => {
    return( user ? 
        <div className={classes.ShowUserInfo_block}>
        <div className={classes.ShowUserInfo_block_heading}>Account Information</div>
        <div style={{padding:'8px'}}>
        <div className={classes.ShowUserInfo_block_info}>
        <label>Name</label>
        <div>{user.name}</div>
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
        </div>
        </div>
        : <h1>No User Found</h1>
    )
}
export default ShowUserInfo;