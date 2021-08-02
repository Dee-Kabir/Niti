import { useEffect, useState, Fragment } from "react";
import {
  isAuthenticated,
  authenticateUser,
  checkUser,
} from "../../actions/auth";
import firebase from "../../firebase";
import {
  setLanguageCode,
  sigininWithPhoneNumber,
} from "../../actions/firebaseapi";
import MobileAndOtpForm from "../../components/auth/MobileAndOtpForm";
import ErrorComponent from "../../utilities/ErrorComponent";
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
    } else if (
      props.match.params.userType !== "user" &&
      props.match.params.userType !== "doctor"
    ) {
      props.history.replace("/dfdsfs");
    }
  }, []);
  const {
    mobileNumber,
    otp,
    mobileNumberSubmit,
    otpSubmit,
    error,
    firebaseEvent,
    loading,
  } = values;
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value, error: "" });
  };
  const handleMobileNumberSubmit = (e) => {
    e.preventDefault();
    if (mobileNumber.toString().length === 10) {
      setValues({ ...values, loading: true });
      try {
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
              loading: false,
            });
          })
          .catch((err) => {
            setValues({
              ...values,
              mobileNumberSubmit: false,
              otpSubmit: false,
              error: "try again" && err.message,
              loading: false,
            });
          });
      } catch (err) {
        setValues({
          ...values,
          error: "error while connecting",
          loading: false,
        });
      }
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
      setValues({ ...values, loading: true });
      try {
        firebaseEvent
          .confirm(otp)
          .then((result) => {
            checkUser(result.user.uid, props.match.params.userType).then(
              (data) => {
                if (!data) {
                  localStorage.setItem(
                    "mobileRegister",
                    result.user.phoneNumber
                  );
                  setValues({ ...values, loading: false });
                  props.history.replace(
                    `/registration-after-mobile/${props.match.params.userType}/${result.user.uid}`
                  );
                } else {
                  authenticateUser(
                    result.user.uid,
                    props.match.params.userType
                  ).then(() => {
                    setValues({ ...values, loading: false });

                    window.location.href = "/";
                  });
                }
              }
            );
          })
          .catch((err) => {
            setValues({
              ...values,
              mobileNumberSubmit: false,
              otpSubmit: false,
              error: "Try again" && err.message,
              mobileNumber: "",
              otp: "",
              loading: false,
            });
          });
      } catch (err) {
        setValues({
          ...values,
          error: "Error!!!" && err.message,
          loading: false,
        });
      }
    } else {
      setValues({
        ...values,
        error: "Enter 6 digit valid OTP",
        loading: false,
      });
    }
  };
  return (
    <Fragment>
      <ErrorComponent error={error} />
      <MobileAndOtpForm
        handleChange={handleChange}
        handleMobileNumberSubmit={handleMobileNumberSubmit}
        mobileNumberSubmit={mobileNumberSubmit}
        otpSubmit={otpSubmit}
        handleotpSubmit={handleotpSubmit}
        mobileNumber={mobileNumber}
        otp={otp}
        loading={loading}
      />
    </Fragment>
  );
};
export default MobileLogin;
