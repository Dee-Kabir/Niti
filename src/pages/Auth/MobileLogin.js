import { useEffect, useState, Fragment } from "react";
import classes from "./MobileLogin.module.css";
import firebase from "../../firebase";
import {
  setLanguageCode,
  sigininWithPhoneNumber,
} from "../../actions/firebaseapi";
import {
  authenticateUser, checkUser,
  isAuthenticated,
} from "../../actions/auth";
const MobileLogin = (props) => {
  const [values, setValues] = useState({
    mobileNumber: "",
    otp: "",
    mobileNumberSubmit: false,
    otpSubmit: false,
    error: false,
    loading: false,
    firebaseEvent: "",
  });
  useEffect(() => {
    if (isAuthenticated()) {
      props.history.replace("/");
    }
  }, []);
  const {
    mobileNumber,
    otp,
    mobileNumberSubmit,
    otpSubmit,
    error,
    firebaseEvent,
    loading
  } = values;
  const handleMobileNumberSubmit = (e) => {
    e.preventDefault();
    if (mobileNumber.toString().length === 10) {
      setValues({ ...values, loading: true });
      setLanguageCode();
      let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha", {
        size: "invisible",
      });
      sigininWithPhoneNumber(mobileNumber, recaptcha)
        .then((e) => {
          setValues({
            ...values,
            mobileNumberSubmit: true,
            otpSubmit: true,
            firebaseEvent: e,
            loading:false
          });
        })
        .catch((err) => {
          setValues({
            ...values,
            mobileNumberSubmit: false,
            otpSubmit: false,
            error: "try again" && err.message,
            loading:false
          });
        });
    } else {
      setValues({
        ...values,
        error: "Enter 10 digit valid Mobile Number",
      });
    }
  };
  const handleotpSubmit = (e) => {
    e.preventDefault();
    if (otp.toString().length === 6) {
      setValues({...values,loading:true})
      firebaseEvent
        .confirm(otp)
        .then((result) => {
          checkUser(result.user.uid,props.match.params.userType).then(data => {
            if(!data){
              localStorage.setItem(
                "mobileRegister",
               result.user.phoneNumber
              );
              setValues({...values,loading:false})
              props.history.replace(`/registration-after-mobile/${props.match.params.userType}/${result.user.uid}`);
            }else {

              authenticateUser(result.user.uid,props.match.params.userType).then(()=>{
                setValues({...values,loading:false})
              
              window.location.href = "/";
              });
              
            }
          })
        })
        .catch((err) => {
          setValues({
            ...values,
            mobileNumberSubmit: false,
            otpSubmit: false,
            error: "Try again",
            mobileNumber: "",
            otp: "",
            loading:false
          });
        });
    } else {
      setValues({
        ...values,
        error: "Enter 6 digit valid OTP",
        loading: false,
      });
    }
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value, error: "" });
  };

  const mobileNumberForm = () => (
    <form onSubmit={handleMobileNumberSubmit}>
      <input
        className={classes.mobile_number_input}
        onChange={handleChange}
        value={mobileNumber}
        placeholder="Enter your 10 digit Mobile Number"
        type="number"
        pattern="[1-9]{1}[0-9]{9}"
        name="mobileNumber"
      />
      <button id="recaptcha" type="button">
        Recaptcha
      </button>
      <button
        type="submit"
        disabled={loading}
        className={classes.GET_OTP_btn}
      >
        GET OTP
      </button>
    </form>
  );
  const otpForm = () => (
    <form onSubmit={handleotpSubmit}>
      <input
        className={classes.mobile_number_input}
        onChange={handleChange}
        value={otp}
        type="number"
        placeholder="Enter 6 digit OTP"
        pattern="[0-9]{6}"
        name="otp"
      />
      <button type="submit" disabled={loading} className={classes.GET_OTP_btn}>
        Submit OTP
      </button>
    </form>
  );
  return (
    <Fragment>
      <div className={classes.authContainer}>
        <div className={classes.auth_input_container}>
          <div className={classes.register_heading}>
            <h2>Register or Sign In for Nitimed</h2>
            <p style={{ color: "rgb(89,100,102)" }}>
              An OTP will be sent to your mobile number for verification
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            {!mobileNumberSubmit && mobileNumberForm()}
            {otpSubmit && otpForm()}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default MobileLogin;
