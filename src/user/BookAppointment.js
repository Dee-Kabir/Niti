import { useState } from "react"
import firebase from "../firebase"
import { isAuthenticated } from "../actions/auth"
const BookAppointment = (props) => {
    const [text,setText] = useState("")
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        if(text == "Book"){
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
                        tranction.update(doctorsRef, { token: newToken,appointments: firebase.firestore.FieldValue.arrayUnion(appointmentRef) })
                    .set(appointmentRef,{user : userRef,doctor: doctorsRef,token: newToken+1,completed: false})
                    .update(userRef,{appointments: firebase.firestore.FieldValue.arrayUnion(appointmentRef)})
                    }else{
                        setError("No token available for today")
                    }
                }
            }).then(() => {
                console.log("done")
            }).catch(err => console.log(err.message))
        }else{
            setError("Enter the text correctly")
        }
    }
    return (
        <div>
        <div>
        <form onSubmit={handleSubmit}>
        <div>write Book in the below box</div>
        <input type="text" value={text} onChange={(e)=> setText(e.target.value)} />
        <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
        </div>
        </div>
    )
}
export default BookAppointment