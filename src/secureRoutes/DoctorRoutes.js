import { isAuthenticated, typeOfUser } from "../actions/auth"
import {Route,Redirect} from "react-router-dom"
const DoctorRoutes = (rest) => {
    return (isAuthenticated() && typeOfUser()=="doctor") ? <Route {...rest} /> : <Redirect to="/login/doctor" />
}
export default DoctorRoutes