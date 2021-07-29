import { isAuthenticated, typeOfUser } from "../actions/auth"
import {Route,Redirect} from "react-router-dom"
const UserRoutes = (rest) => {
    return (isAuthenticated() && typeOfUser()=="user") ? <Route {...rest} /> : <Redirect to="/login/user" />
}
export default UserRoutes