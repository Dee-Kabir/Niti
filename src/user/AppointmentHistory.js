import { useEffect, useState } from "react";
import {isAuthenticated} from "../actions/auth"
import LoadingComponent from "../utilities/LoadingComponent"
import firebase from "../firebase";
const usersRef = firebase.firestore().collection("users");
const AppointmentHistory = () => {
    const  [values,setValues] = useState({appointments: [],loading: false})
    const {appointments,loading} = values
    useEffect(()=> {
        loadAppointments()
    },[])
    const loadAppointments = async () => {
        setValues({loading: true})
        let appoint = [];
        await (await usersRef.doc(`${isAuthenticated()}`).get()).data().appointments.forEach((element,_) => 
            element.get().then(async(data) => 
                data.data().doctor && data.data().doctor.get().then(docData => (appoint.push({doctorName: docData.data().name,doctorId: docData.id,token: data.data().token,completed: data.data().completed})))
            )
        )
        setValues({appointments: appoint,loading:false})
    }
    return(!loading ? 
        <div>
        
            {JSON.stringify(appointments)}
        
        </div> : <LoadingComponent loading={loading} />
    )
}
export default AppointmentHistory;