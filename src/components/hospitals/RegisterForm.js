import { Button, Form, Grid, Header } from "semantic-ui-react"
import classes from "../../organization/RegisterHospital.module.css";
import SearchInput from "../search/SearchInput"
import {Radio} from "antd"
const RegisterForm = ({values,handleChange,handlePlaces,handleSubmit,loading,setFormLogin}) => {
  const {name,email,address,password,state,city,mobileNumber} = values  
  return (
        <div className={classes.RegisterForm_H}>
          <Grid>
          <Grid.Row className="text-center">
        <Radio.Group >
          <Radio.Button onClick={() => setFormLogin(true)}>Login</Radio.Button>
          <Radio.Button onClick={() => setFormLogin(false)}>
            Register
          </Radio.Button>
        </Radio.Group>
        </Grid.Row>
            <Grid.Row>
            <Form onSubmit={handleSubmit}>
            <Header className="text-center">Register Your Hospital with NitiMed</Header>
              <Form.Input label="Name" className={classes.RegisterForm_HInput}
                
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  placeholder="Enter Hospital Name"
                  required
                />
            
              <Form.Input label="Email" className={classes.RegisterForm_HInput}
     
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter Hospital Email"
                  required
                />
     
              <Form.Input label="Password" className={classes.RegisterForm_HInput}
                
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Enter a password"
                  required
                />
          
              <Form.Input label="Address" className={classes.RegisterForm_HInput}
                
                  type="text"
                  name="address"
                  value={address}
                  onChange={handleChange}
                  placeholder="Enter Hospital Address"
                  required
                />
       
              <div className={`${classes.RegisterForm_HInput} required field`}>
              <label>State</label>
              <div style={{width:'100%'}}>
              <SearchInput category={`states/India`} name="state" placeholder="State" value={state} handlePlaces={handlePlaces}/>
              </div></div>
              <div className={`${classes.RegisterForm_HInput} required field`}>
              <label>City</label>
              <div style={{width:'100%'}}>
              <SearchInput category={state ? `cities/${state}`: false} name="city" value={city} placeholder="City" handlePlaces={handlePlaces}/>
              </div></div>
              <Form.Input label="Mobile Number" className={classes.RegisterForm_HInput}
                  type="tel"
                  name="mobileNumber"
                  value={mobileNumber}
                  onChange={handleChange}
                  pattern="[1-9]{1}[0-9]{9}"
                  placeholder="Enter Hospital mobile Number"
                  required
                />
              <div style={{ textAlign: "center" }}>
                <Button disabled={loading} loading={loading} type="submit" primary fluid size="large">
                  Register
                </Button>
              </div>
            </Form>
            </Grid.Row>
            <Grid.Row className="text-center">
            <div style={{ textAlign: "center", fontSize: "1rem", marginTop: "4px" }}>
              Already registered?{" "}
              <span
                onClick={() => setFormLogin(true)}
                style={{ color: "blue", cursor: "pointer" }}
              >
                Login
              </span>
            </div>
            </Grid.Row>
            </Grid>
        </div>
      );
}
export default RegisterForm;