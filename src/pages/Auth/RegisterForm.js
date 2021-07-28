import { Fragment } from "react";
import SearchInput from "../../components/search/SearchInput"
import classes from "./RegisterForm.module.css";
const RegisterForm = (props) => {
    const {name,mobileNumber,address,state,city,loading} = props.values
    const {handlePlaces,handleChange,handleSubmit,heading} = props

    return (
        <Fragment>
          <div className={classes.Register_Form}>
            <form className={classes.Register_Form_Block} onSubmit={handleSubmit}>
              <div style={{ textAlign: "center", margin: "32px" }}>
                <h2>{heading}</h2>
              </div>
              <div className={classes.Form_Input}>
                <label>Name</label>
                <input
                  type="text" 
                  name="name"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={handleChange}
                  required
                />
              </div> 
              <div className={classes.Form_Input}>
                <label>MobileNumber</label>
                <input
                  type="text"
                  name="mobileNumber"
                  placeholder="Enter Your 10 digit Mobile Number"
                  pattern="[1-9]{1}[0-9]{9}"
                  value={mobileNumber}
                  required
                  readOnly
                />
              </div>
              <div className={classes.Form_Input}>
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter Your Address"
                  value={address}
                  onChange={handleChange}
                  required
                />
              </div>
            <div className={classes.Form_Input}>
            <label>State</label>
            <div style={{width: '70%'}}>
            <SearchInput category={`states/India`} value={state}  name="state" handlePlaces={handlePlaces} placeholder="select State" />
            </div>
            </div>
            <div className={classes.Form_Input}>
            <label>City</label>
            <div style={{width:'70%'}}>
            <SearchInput category={state ? `cities/${state}`: false} value={city} name="city" handlePlaces={handlePlaces} placeholder="select city" />
            </div> 
            </div>
            <div style={{textAlign:'end'}}>
            <button className={classes.Submit_btn_} disabled={!!loading} loading={loading ? "true" : "false"} type="submit">
                Submit
            </button>
            </div>
            </form>
          </div>
        </Fragment>
      );
}
export default RegisterForm;