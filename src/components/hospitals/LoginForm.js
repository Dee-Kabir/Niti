import { Grid, Header, Form, Button } from "semantic-ui-react";
import classes from "../../pages/organization/RegisterHospital.module.css";
import { Radio } from "antd";
const LoginForm = ({
  handleChange,
  email,
  password,
  handleloginSubmit,
  loading,
  setFormLogin,
}) => {
  return (
    <div className={classes.RegisterForm_H}>
      <Grid>
        <Grid.Row className="text-center">
          <Radio.Group>
            <Radio.Button onClick={() => setFormLogin(true)}>
              Login
            </Radio.Button>
            <Radio.Button onClick={() => setFormLogin(false)}>
              Register
            </Radio.Button>
          </Radio.Group>
        </Grid.Row>
        <Grid.Row>
          <Form onSubmit={handleloginSubmit}>
            <Header className="text-center">Login to NitiMed</Header>
            <Form.Input
              label="Email"
              className={classes.RegisterForm_HInput}
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter Hospital Email"
              required
            />
            <Form.Input
              label="Password"
              className={classes.RegisterForm_HInput}
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter a password"
              required
            />
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Button
                disabled={loading}
                loading={loading}
                type="submit"
                primary
                fluid
                size="large"
              >
                Login
              </Button>
            </div>
          </Form>
        </Grid.Row>
        <Grid.Row className="text-center">
          <div
            style={{ textAlign: "center", fontSize: "1rem", marginTop: "4px" }}
          >
            Not Registered yet?{" "}
            <span
              onClick={() => setFormLogin(false)}
              style={{ color: "blue", cursor: "pointer" }}
            >
              Register
            </span>
          </div>
        </Grid.Row>
      </Grid>
    </div>
  );
};
export default LoginForm;
