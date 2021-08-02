import { Component } from "react";
import {isAuthenticated} from "../../actions/auth"
import firebase from "../../firebase";
import LoadingComponent from "../../utilities/LoadingComponent";
const doctorsRef = firebase.firestore().collection("doctors");
const appointmentsRef = firebase.firestore().collection("appointment");
class PendingAppointments extends Component {
    state = {appointments: [],
        loading: false,
    error: ""}
    componentDidMount(){
        this.loadAppointments()
    }
    loadAppointments = async () => {
        this.setState({loading:true})
        const appointmentRef = await (await doctorsRef.doc(`${isAuthenticated()}`).get()).data().appointments
        appointmentRef && appointmentRef.map(async(element) => 
         element.get().then((data)=> data.data().doctor.get().then(docData => this.setState((prevAppointmnets)=>({appointments: [...prevAppointmnets.appointments,{doctorName : docData.data().name,token: data.data().token,completed: data.data().completed,appointmentId: data.id,doctorId: docData.id}]}))))
        )
        this.setState({loading:false})
    }
    makeAppointmentDone = (id) => {
        this.setState({loading:true})
        const doctorsRef = firebase.firestore().collection('doctors').doc(`${isAuthenticated()}`)
        const appointmentRef = firebase.firestore().collection('appointment').doc(`${id}`)
        const tillNowRecordsRef = firebase.firestore().collection('tillNowRecords').doc('records')
        firebase.firestore().runTransaction(async(transaction) =>{
            const docTransaction = await transaction.get(doctorsRef)
            if(!docTransaction){
                this.setState({error: "Sorry error occurred"})
            }else{
                const tillNowtransaction = await transaction.get(tillNowRecordsRef)
                var newBookingNumbers = tillNowtransaction.data().consultationCompleted +1
                transaction.update(doctorsRef,
                    {appointments : firebase.firestore.FieldValue.arrayRemove(appointmentRef),
                    completedAppointments: firebase.firestore.FieldValue.arrayUnion(appointmentRef)})
                    .update(appointmentRef,{
                        completed: true,
                        completedTime : firebase.firestore.FieldValue.serverTimestamp()
                    })
                    .update(tillNowRecordsRef,{
                        consultationCompleted : newBookingNumbers
                    })
            }
        }).then(()=>{
            let newappoint = []
            this.state.appointments.forEach((appointment)=>{ 
                console.log(appointment.appointmentId,"appointmentId  ", id )
                if(appointment.appointmentId !== id) newappoint.push(appointment)} )
            this.setState({appointments:newappoint,loading:false})
        }).catch(err => console.log(err))
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
                <td className="d-table-cell"><input onChange={() => this.makeAppointmentDone(app.appointmentId)} type="checkbox" /> </td>
                </tr>
            ))
        }
        </tbody>
        </table>
        </div> :<h2>No appointment Yet</h2>) : <LoadingComponent loading={loading} />
    )
    }
}
export default PendingAppointments;