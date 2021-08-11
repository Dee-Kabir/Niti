import { useState,useEffect } from "react"
import firebase from "../firebase"
import { isAuthenticated } from "../actions/auth"
import ErrorComponent from "../utilities/ErrorComponent"
const BookAppointment = (props) => {
    const [text,setText] = useState("")
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        window.onbeforeunload = handleBeforeUnload
        return function clear(){
            localStorage.removeItem("selectedDoctor")
        }
      }, []);
      
      const handleBeforeUnload = (e) => {
        e.preventDefault();
        const message =
          "Are you sure you want to leave? All provided data will be lost.";
        e.returnValue = message;
        return message;
      };
      const bookAppointmentWithDoctor = () =>{
        setLoading(true)
        const doctorId = props.match.params.doctorId
        const doctorsRef = firebase.firestore().collection('doctors').doc(`${doctorId}`)
        const userRef = firebase.firestore().collection('users').doc(`${isAuthenticated()}`)
        const appointmentRef = firebase.firestore().collection('appointment').doc()
        const trans = firebase.firestore().runTransaction(async (tranction) => {
            const docTransaction = await tranction.get(doctorsRef)
            if (!docTransaction) {
                setError("Sorry an error occured")
            } else {
                var newToken = docTransaction.data().token - 1
                if(newToken >= 1){
                tranction.update(doctorsRef.collection("appointments").doc("pendingAppointments"), { appointments: firebase.firestore.FieldValue.arrayUnion(appointmentRef)})
                .update(doctorsRef,{token: newToken})
                .set(appointmentRef,{user : userRef,doctor: doctorsRef,token: newToken+1,completed: false,created : firebase.firestore.FieldValue.serverTimestamp() })
                .update(userRef,{appointments: firebase.firestore.FieldValue.arrayUnion(appointmentRef)})
                }else{
                    setError("No token available for today")
                }
            }
        }).then(() => {
            alert("Your Appointment booked")
            window.location.href = "/"
        }).catch(err => setError(err.message))
      }
    const handleSubmit = (e) => {
        e.preventDefault()
        try{
            if(text == "Book"){
                if(JSON.parse(localStorage.getItem("selectedDoctor")).jobType === "public"){
                    bookAppointmentWithDoctor()
                }else{
                    alert("You will be redirected to payment gateway")
                    bookAppointmentWithDoctor()
                }
                
            }else{
                setError("Enter the text correctly")
            }
        }catch(err){
            setError("Please select the doctor Again")
        }
    }
    return (
        <div>
        {error && <ErrorComponent error={error} />}
        <form onSubmit={handleSubmit}>
        <div>write Book in the below box</div>
        <input type="text" value={text} onChange={(e)=> {setText(e.target.value)
        setError("")
        }} />
        <button disabled={loading} type="submit" onClick={handleSubmit}>Submit</button>
        </form>
        </div>
    )
}
export default BookAppointment