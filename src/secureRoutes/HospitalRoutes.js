import { Redirect, Route } from "react-router-dom"
import { isAuthenticated, typeOfUser } from "../actions/auth"

const HospitalRoutes = (props) => {
    console.log(isAuthenticated(),typeOfUser())
    return (isAuthenticated() && typeOfUser()=="hospital") ? <Route {...props} /> : <Redirect to="/hospitalAuth" />
}
export default HospitalRoutes;