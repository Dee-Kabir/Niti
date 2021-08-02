import {Button, Form, Input} from "semantic-ui-react"
import classes from "../../pages/Auth/MobileLogin.module.css";
const MobileAndOtpForm = ({handleChange,handleMobileNumberSubmit,handleotpSubmit,mobileNumber,otp,loading,mobileNumberSubmit,otpSubmit}) => {
    const mobileNumberForm = () => (
    <Form loading={loading} onSubmit={handleMobileNumberSubmit}>
      <Form.Input 
        className={`${classes.mobile_number_input} mt-4`}
        onChange={handleChange}
        value={mobileNumber}
        placeholder="Enter your 10 digit Mobile Number"
        type="number"
        pattern="[1-9]{1}[0-9]{9}"
        name="mobileNumber"
        required
      />
      {<Button id="recaptcha" type="button">
        Recaptcha
      </Button>}
      <Button
        type="submit"
        disabled={loading}
        fluid
        primary
        size="big"
        className="mt-4"
        loading={loading}
      >
        GET OTP
      </Button>
    </Form>
  );
  const otpForm = () => (
    <Form onSubmit={handleotpSubmit}>
      <Form.Input
        className={classes.mobile_number_input}
        onChange={handleChange}
        value={otp}
        type="number"
        placeholder="Enter 6 digit OTP"
        pattern="[0-9]{6}"
        name="otp"
        required
      />
      <Button type="submit" 
      disabled={loading}
      loading={loading}
      primary
      fluid
      size="big"
      
      >
        Submit OTP
      </Button>
    </Form>
  );
  return (
      <div className={classes.authContainer}>
        <div className={classes.auth_input_container}>
          <div className={classes.register_heading}>
            <h2>Register or Sign In for Nitimed</h2>
            <p style={{ color: "rgb(89,100,102)" }}>
              An OTP will be sent to your mobile number for verification
            </p>
          </div>
          <div style={{ textAlign: "center",padding:'16px',marginBottom:'30px' }}>
            {!mobileNumberSubmit && mobileNumberForm()}
            {otpSubmit && otpForm()}
          </div>
        </div>
      </div>
  );
}
export default MobileAndOtpForm