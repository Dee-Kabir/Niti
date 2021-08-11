import { Component } from "react";
import {isAuthenticated} from "../actions/auth"
import LoadingComponent from "../utilities/LoadingComponent"
import firebase from "../firebase";
import { Link } from "react-router-dom";
import { Header, Table } from "semantic-ui-react";
const usersRef = firebase.firestore().collection("users");
class AppointmentHistory extends Component {
    state = {appointments: [],
        loading: false,}
    componentDidMount(){
        
        this.loadAppointments()
    }
    loadAppointments = async () => {
        this.setState({loading:true})
        const appointmentRef = await (await usersRef.doc(`${isAuthenticated()}`).get()).data().appointments
        appointmentRef.map(async(element) => 
         element.get().then((data)=> data.data().doctor.get().then(docData => this.setState((prevAppointmnets)=>({appointments: [...prevAppointmnets.appointments,{doctorName : docData.data().name,token: data.data().token,completed: data.data().completed,doctorId: docData.id}]}))))
        )
        this.setState({loading:false})
    }
    
    render(){
        const {loading,appointments} = this.state
    return(!loading ? (appointments.length > 0 ?
        <div>
        <Header>Appointments</Header>
        <Table celled>
        <Table.Header>
        <Table.Row>
        <Table.HeaderCell>SNo.</Table.HeaderCell>
        <Table.HeaderCell>Doctor Name</Table.HeaderCell>
        <Table.HeaderCell>Token Number</Table.HeaderCell>
        <Table.HeaderCell>Completed</Table.HeaderCell>
        <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Row>
        </Table.Header>
        <Table.Body>
        {
            appointments.map((app,_)=>(
                <Table.Row key={app.doctorId+5+_} >
                <Table.Cell>{_+1}</Table.Cell>
                <Table.Cell>{app.doctorName}</Table.Cell>
                <Table.Cell>{app.token}</Table.Cell>
                <Table.Cell>{app.completed ? "Yes" : "No"}</Table.Cell>
                <Table.Cell>{app.completed ? <Link to="#">Raise issue</Link> : <Link to={`/chat/${app.doctorId}/${isAuthenticated()}`}>Video call</Link>}</Table.Cell>
                </Table.Row>
            ))
        }
        </Table.Body>
        </Table>
        </div> :<div>No appointment Yet</div>) : <LoadingComponent loading={loading} />
    )
    }
}
export default AppointmentHistory;