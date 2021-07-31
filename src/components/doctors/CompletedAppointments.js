import { Component } from "react";
import {isAuthenticated} from "../../actions/auth"
import firebase from "../../firebase";
import LoadingComponent from "../../utilities/LoadingComponent";
const doctorsRef = firebase.firestore().collection("doctors");
class CompletedAppointments extends Component {
    state = {appointments: [],
        loading: false,
    error: ""}
    componentDidMount(){
        this.loadAppointments()
    }
    loadAppointments = async () => {
        this.setState({loading:true})
        const appointmentRef = await (await doctorsRef.doc(`${isAuthenticated()}`).get()).data().completedAppointments
        appointmentRef && appointmentRef.map(async(element) => 
         element.get().then((data)=> data.data().doctor.get().then(docData => this.setState((prevAppointmnets)=>({appointments: [...prevAppointmnets.appointments,{doctorName : docData.data().name,token: data.data().token,completed: data.data().completed,appointmentId: data.id,doctorId: docData.id}]}))))
        )
        this.setState({loading:false})
    }
    render(){
        const {loading,appointments} = this.state
    return(!loading ? (appointments.length > 0 ?
        <div>
        <table className="table">
        <thead>
        <tr>
        <th>SNo.</th>
        <th>Doctor Name</th>
        <th>Token Number</th>
        <th>Completed</th>
        </tr>
        </thead>
        <tbody>
        {
            appointments.map((app,_)=>(
                <tr className="d-table-row" key={app.appointmentId} >
                <td className="d-table-cell">{_+1}</td>
                <td className="d-table-cell">{app.doctorName}</td>
                <td className="d-table-cell">{app.token}</td>
                <td className="d-table-cell">{app.completed && "Yes"}</td>
                </tr>
            ))
        }
        </tbody>
        </table>
        </div> :<h2>No appointment Completed Yet</h2>) : <LoadingComponent loading={loading} />
    )
    }
}
export default CompletedAppointments;