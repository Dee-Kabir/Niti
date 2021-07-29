import {Fragment} from "react"
import HeaderItem from "./HeaderItem";
import classes from "./MainHeader.module.css"
import AuthButton from "../buttons/AuthButton";
import { Link } from "react-router-dom";
import { isAuthenticated,signout, typeOfUser} from "../../actions/auth";
const MainHeader = () => {
    
    return(
        <Fragment>
            <div className={classes.Header}>
            <div className={classes.Header_Logo_Block}>
            <Link to="/">
            <div className={classes.Logo_niti}>Nitimed<span className={classes.Logo_com}>.com</span></div>
            </Link>
            </div>
            <div className={classes.Header_Items_Block}>
            <HeaderItem itemHeading="Nodal Heads" itemDesc="Find Nodal Heads" to="/nodal-heads" active="nodal-heads"/>
            <HeaderItem itemHeading="Doctors" itemDesc="Book an appointment" to="/doctors" active="doctors"/>
            <HeaderItem itemHeading="Pharmacy" itemDesc="Medicines & health products" to="/pharmacy" active="pharmacy"/>
            <HeaderItem itemHeading="Diagonstics" itemDesc="Get Lab test done" to="/diagonstic-laboratories" active="diagonsis" />
            
            <HeaderItem itemHeading="Diseases" itemDesc="Diseases and Symptoms" to="/diseases" active="diseases" />
            </div>
            <div className={classes.Header_Auth_Block}>
            {!isAuthenticated() && <Fragment>
                <AuthButton text="Farmer Login" to="/login/user"/>
                <AuthButton text = "Hospital Login" to="/hospital-auth" />
                <AuthButton text="Doctor Login" to="/login/doctor" />
                </Fragment>}
            {isAuthenticated() && <Link className={classes.User_Avatar} to={typeOfUser()==="user"?`/dashboard/${isAuthenticated()}`:(typeOfUser() === "hospital" ? `/hospital-dashboard/${isAuthenticated()}`: `/doctor-dashboard/${isAuthenticated()}`)}>{JSON.parse(localStorage.getItem("userInfo")).name[0].toUpperCase()}</Link> }
            {isAuthenticated() && <Fragment>
                <div onClick={()=> signout()}><AuthButton text="Logout" to="/"/></div>
                </Fragment>}
            </div>
            </div>
        </Fragment>
    )
}
export default MainHeader;