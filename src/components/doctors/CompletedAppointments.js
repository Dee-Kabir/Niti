import { Component } from "react";
import { isAuthenticated } from "../../actions/auth";
import { Header, Table } from "semantic-ui-react";
import firebase from "../../firebase";
import LoadingComponent from "../../utilities/LoadingComponent";
const doctorsRef = firebase.firestore().collection("doctors");
class CompletedAppointments extends Component {
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
        .doc("completedAppointments")
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
                    completedTime: data.data().completedTime,
                    created: data.data().created,
                    appointmentId: data.id,
                  },
                ],
              }))
            )
        )
      );
    this.setState({ loading: false });
  };
  render() {
    const { loading, appointments } = this.state;
    return !loading ? (
      appointments.length > 0 ? (
        <div>
          <Header>Completed Appointmets</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>SNo.</Table.HeaderCell>
                <Table.HeaderCell>Patient Name</Table.HeaderCell>
                <Table.HeaderCell>Created</Table.HeaderCell>
                <Table.HeaderCell>Completed Date</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {appointments.map((app, _) => (
                <Table.Row key={app.appointmentId}>
                  <Table.Cell>{_ + 1}</Table.Cell>
                  <Table.Cell>{app.patientName}</Table.Cell>
                  <Table.Cell>
                    {app.created && app.created.toDate().toLocaleString()}
                  </Table.Cell>
                  <Table.Cell>
                    {app.completedTime &&
                      app.completedTime.toDate().toLocaleString()}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      ) : (
        <Header>No appointment Completed Yet</Header>
      )
    ) : (
      <LoadingComponent loading={loading} />
    );
  }
}
export default CompletedAppointments;
