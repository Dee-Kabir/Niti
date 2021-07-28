import { Redirect, Route } from "react-router-dom"
import { isAuthenticated } from "../actions/auth"

const LoginRoutes = (props) => {
    return(
        isAuthenticated() ? <Redirect to="/" /> : <Route {...props} />
    )
} 
export default LoginRoutes;