import { Component } from "react";
import { Header, Input, Table } from "semantic-ui-react";
import { isAuthenticated } from "../../actions/auth";
import firebase from "../../firebase";
import ErrorComponent from "../../utilities/ErrorComponent";
import LoadingComponent from "../../utilities/LoadingComponent";
const doctorsRef = firebase.firestore().collection("doctors");
class PendingAppointments extends Component {
  state = { appointments: [], loading: false, error: "" };
  componentDidMount() {
    this.loadAppointments();
  }
  loadAppointments = async () => {
    this.setState({ loading: true });
    const appointmentRef = await (
      await doctorsRef
        .doc(`${this.props.doctorId ? this.props.doctorId : isAuthenticated()}`)
        .collection("appointments")
        .doc("pendingAppointments")
        .get()
    ).data().appointments;
    appointmentRef &&
      appointmentRef.map(async (element) =>
        element.get().then((data) =>
          data
            .data()
            .user.get()
            .then((docData) =>
              this.setState((prevAppointmnets) => ({
                appointments: [
                  ...prevAppointmnets.appointments,
                  {
                    patientName: docData.data().name,
                    created: data.data().created,
                    completed: data.data().completed,
                    appointmentId: data.id,
                  },
                ],
              }))
            )
        )
      );
    this.setState({ loading: false });
  };
  makeAppointmentDone = (id) => {
    this.setState({ loading: true });
    const doctorRef = doctorsRef.doc(
      `${this.props.doctorId ? this.props.doctorId : isAuthenticated()}`
    );
    const doctorsRefu = doctorsRef
      .doc(`${this.props.doctorId ? this.props.doctorId : isAuthenticated()}`)
      .collection("appointments");
    const appointmentRef = firebase
      .firestore()
      .collection("appointment")
      .doc(`${id}`);
    const tillNowRecordsRef = firebase
      .firestore()
      .collection("tillNowRecords")
      .doc("records");
    firebase
      .firestore()
      .runTransaction(async (transaction) => {
        const docTransaction = await transaction.get(doctorRef);
        if (!docTransaction) {
          this.setState({ error: "Sorry error occurred" });
        } else {
          const tillNowtransaction = await transaction.get(tillNowRecordsRef);
          var newBookingNumbers =
            tillNowtransaction.data().consultationCompleted + 1;
          transaction
            .update(doctorsRefu.doc("pendingAppointments"), {
              appointments:
                firebase.firestore.FieldValue.arrayRemove(appointmentRef),
            })
            .update(doctorsRefu.doc("completedAppointments"), {
              appointments:
                firebase.firestore.FieldValue.arrayUnion(appointmentRef),
            })
            .update(appointmentRef, {
              completed: true,
              completedTime: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .update(tillNowRecordsRef, {
              consultationCompleted: newBookingNumbers,
            });
        }
      })
      .then(() => {
        let newappoint = [];
        this.state.appointments.forEach((appointment) => {
          if (appointment.appointmentId !== id) newappoint.push(appointment);
        });
        this.setState({ appointments: newappoint, loading: false });
      })
      .catch((err) =>
        this.setState({ error: "Please try again", loading: false })
      );
  };
  render() {
    const { loading, appointments, error } = this.state;
    return !loading ? (
      appointments.length > 0 ? (
        <div>
          {error && <ErrorComponent error={error} />}
          <Header>Pending Appointments </Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>SNo.</Table.HeaderCell>
                <Table.HeaderCell>Patient Name</Table.HeaderCell>
                <Table.HeaderCell>created</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {appointments.map((app, _) => (
                <Table.Row key={app.appointmentId}>
                  <Table.Cell>{_ + 1}</Table.Cell>
                  <Table.Cell>{app.patientName}</Table.Cell>
                  <Table.Cell>
                    {app.created.toDate().toLocaleString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Input
                      onChange={() =>
                        this.makeAppointmentDone(app.appointmentId)
                      }
                      type="checkbox"
                    />{" "}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      ) : (
        <Header>No appointment Yet</Header>
      )
    ) : (
      <LoadingComponent loading={loading} />
    );
  }
}
export default PendingAppointments;
