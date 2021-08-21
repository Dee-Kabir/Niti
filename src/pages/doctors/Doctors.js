import { Container, Header } from "semantic-ui-react";
import classes from "./Doctors.module.css";
import DoctorSearchBox from "../../components/doctors/DoctorsSearchBox";
const Doctors = () => {
  return (
    <Container fluid>
      <div className={classes.Doctors_flow}>
        <Header
          style={{ color: "white", fontSize: "2rem", textAlign: "center" }}
        >
          How Nitimed helps in Doctor Consultation ?
        </Header>
        <div className={classes.Doctors_flow_points}>
          <div className={classes.Doctors_flow_point}>Choose a Doctor</div>
          <div className={classes.Doctors_flow_point}> Book a Slot</div>
          <div className={classes.Doctors_flow_point}>Make Payment</div>
          <div className={classes.Doctors_flow_point}>Make a video call</div>
          <div className={classes.Doctors_flow_point}>Problem solved</div>
        </div>
      </div>
      <div className={classes.SearchResults}>
        <DoctorSearchBox />
      </div>
    </Container>
  );
};
export default Doctors;
