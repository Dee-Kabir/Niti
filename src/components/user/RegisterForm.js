import { Button, Form, Grid, Header } from "semantic-ui-react";
import SearchInput from "../search/SearchInput"
import classes from "../../pages/Auth/RegisterForm.module.css";
const RegisterForm = (props) => {
    const {name,mobileNumber,address,state,city,loading} = props.values
    const {handlePlaces,handleChange,handleSubmit,heading} = props
    return (
        <Grid stackable>
        <Grid.Row className="m-4">
            <Form  onSubmit={handleSubmit}>
              <Header >{heading}</Header>
              <Form.Input label="Name" className={classes.Form_Input}
                  type="text" 
                  name="name"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={handleChange}
                  required />
              <Form.Input label="Mobile Number" className={classes.Form_Input}
                  type="text"
                  name="mobileNumber"
                  placeholder="Enter Your 10 digit Mobile Number"
                  pattern="[1-9]{1}[0-9]{9}"
                  value={mobileNumber}
                  required
                  readOnly />
              <Form.Input label="Address" className={classes.Form_Input}
                  type="text"
                  name="address"
                  placeholder="Enter Your Address"
                  value={address}
                  onChange={handleChange}
                  required
                />
            <div className={`${classes.Form_Input} required field`}>
            <label>State</label>
            <SearchInput category={`states`} value={state}  name="state" handlePlaces={handlePlaces} placeholder="select State" />
            </div>
            <div className={`${classes.Form_Input} required field`}>
            <label>City</label>
            <SearchInput category={state} value={city} name="city" handlePlaces={handlePlaces} placeholder="select city" />
            </div> 
            <div style={{textAlign:'end'}}>
            <Button primary disabled={loading} loading={loading} type="submit">
                Submit
            </Button>
            </div>
            </Form>
            </Grid.Row>
        </Grid>
      );
}
export default RegisterForm;