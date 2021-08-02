import { Component, useEffect, useRef, useState } from "react";
import {isAuthenticated} from "../actions/auth"
import LoadingComponent from "../utilities/LoadingComponent"
import firebase from "../firebase";
import { Link } from "react-router-dom";
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
        <table>
        <thead>
        <tr>
        <td>SNo.</td>
        <td>Doctor Name</td>
        <td>Token Number</td>
        <td>Completed</td>
        </tr>
        </thead>
        <tbody>
        {
            appointments.map((app,_)=>(
                <tr key={app.doctorId+5+_} >
                <td>{_+1}</td>
                <td>{app.doctorName}</td>
                <td>{app.token}</td>
                <td>{app.completed ? "Yes" : "No"}</td>
                <td>{app.completed ? <Link to="#">Raise issue</Link> : <Link to={`/chat/${app.doctorId}/${isAuthenticated()}`}>Chat</Link>}</td>
                </tr>
            ))
        }
        </tbody>
        </table>
        </div> :<div>No appointment Yet</div>) : <LoadingComponent loading={loading} />
    )
    }
}
export default AppointmentHistory;