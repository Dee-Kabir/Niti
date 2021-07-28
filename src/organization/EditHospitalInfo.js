import SearchInput from "../components/search/SearchInput"
import classes from './OrganizationDashboard.module.css'
const EditHospitalInfo = (props) =>{
    const {name,address,email,mobileNumber,country,state,city} = props.values
    const {handleChange,handlePlaces,handleSubmit} = props
    return(
        <div className={classes.Edit_hospitalInfo}>
        <div className={classes.Edit_hospitalInfo_block}>
        <div className={classes.Edit_hospitalInfo_heading}>Edit Hospital Information</div>
        <div >
        <form className={classes.Edit_hospitalInfo_form} onSubmit={handleSubmit} >
        <div className={classes.Edit_hospitalInfo_field}>
        <label>Name</label>
        <input type="text" name="name" placeholder="Enter Hospital Name" value={name} onChange={handleChange} required />
        </div>
        <div className={classes.Edit_hospitalInfo_field}>
        <label>Mobile No.</label>
        <input type="text"  name="mobileNumber" placeholder="Enter 10 digit Mobile Number" value={mobileNumber} required readOnly/>
        </div>
        <div className={classes.Edit_hospitalInfo_field}>
        <label >Email</label>
        <input type="email" name="email" placeholder="Enter Hospital Email" value={email} onChange={handleChange} required readOnly/>
        </div>
        <div className={classes.Edit_hospitalInfo_field}>
        <label>Address</label>
        <input type="text" name="address" placeholder="Enter Hospital Address" value={address} onChange={handleChange} required />
        </div>
        <div className={classes.Edit_hospitalInfo_field}>
        <label>Country</label>
        <div style={{width: '70%'}}>
        <SearchInput category={"/countries"} value={country}  name="country" handlePlaces={handlePlaces} placeholder="select Country" />
        </div>
        </div>
        <div className={classes.Edit_hospitalInfo_field}>
        <label>State</label>
        <div style={{width: '70%'}}>
        <SearchInput category={country ? `states/${country}` : false} value={state}  name="state" handlePlaces={handlePlaces} placeholder="select State" />
        </div>
        </div>
        <div className={classes.Edit_hospitalInfo_field}>
        <label>City</label>
        <div style={{width: '70%'}}>
        <SearchInput category={state ? `cities/${state}` : false} value={city}  name="city" handlePlaces={handlePlaces} placeholder="select City" />
        </div>
        </div>
        <div style={{width:'100%',textAlign:'right'}} >
        <button className={classes.Edit_hospitalInfo_btn} type="submit">Submit</button>
        </div>
        </form>
        </div>
        </div>
        </div>
    )
}
export default EditHospitalInfo;