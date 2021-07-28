import { Redirect, Route } from "react-router-dom"
import { isAuthenticated } from "../actions/auth"

const MobileAuthRoutes = (props) =>{
    return(
        (isAuthenticated() || !localStorage.getItem("mobileRegister")) ? <Redirect to="/" /> : <Route {...props} />
    )
}
export default MobileAuthRoutes;