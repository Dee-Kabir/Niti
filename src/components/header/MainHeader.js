import {Fragment, useState} from "react"
import HeaderItem from "./HeaderItem";
import classes from "./MainHeader.module.css"
import AuthButton from "../buttons/AuthButton";
import { Link } from "react-router-dom";
import { isAuthenticated,signout, typeOfUser} from "../../actions/auth";
import {
    Checkbox,
    Grid,
    Header,
    Icon,
    Image,
    Menu,
    Segment,
    Sidebar,
  } from 'semantic-ui-react'
const MainHeader = () => {
    const [visible, setVisible] = useState(false)
    const mobileHeader = () => {
        return (
            <Fragment>
              <Menu className={classes.mobileHeader}>
              <Menu.Item position="left">
              <Link to="/">
              <div className={classes.Logo_niti}>Nitimed<span className={classes.Logo_com}>.com</span></div>
              </Link>
                </Menu.Item>
                <Menu.Item position="right">
                {isAuthenticated() && <Link className={classes.User_Avatar} to={typeOfUser()==="user"?`/dashboard/${isAuthenticated()}`:(typeOfUser() === "hospital" ? `/hospital-dashboard/${isAuthenticated()}`: `/doctor-dashboard/${isAuthenticated()}`)}>{JSON.parse(localStorage.getItem("userInfo")).name[0].toUpperCase()}</Link> }
                {isAuthenticated() && <div style={{paddingLeft: '16px'}} onClick={()=> signout()}><AuthButton text="Logout" to="/"/></div>}
                <Icon name="sidebar" size="big" onClick={() => setVisible(!visible)} />
            </Menu.Item>
              </Menu>
              <Grid columns={1}>
              <Grid.Column>
                <Sidebar.Pushable as={Segment} style={{position:"absolute",top:'0px',height: "100vh",zIndex : "16",width:'50vw',display : visible ? "block" : "none"}} >
                  <Sidebar
                    as={Menu}
                    animation='overlay'
                    icon='labeled'
                    inverted
                    onHide={() => setVisible(false)}
                    vertical
                    visible={visible}
                    width='thin'
                    style={{backgroundColor : 'rgb(85,26,139)',width:'50vw'}}
                  >
                    <Menu.Item>
                    <HeaderItem itemHeading="Nodal Heads" itemDesc="Find Nodal Heads" to="/nodal-heads" active="nodal-heads"/>
                    </Menu.Item>
                    <Menu.Item>
                    <HeaderItem itemHeading="Doctors" itemDesc="Book an appointment" to="/doctors" active="doctors"/>
                    </Menu.Item>
                    <Menu.Item>
                    <HeaderItem itemHeading="Diagonstics" itemDesc="Get Lab test done" to="/diagonstic-laboratories" active="diagonsis" />
                    </Menu.Item>
                    <Menu.Item>
                    <HeaderItem itemHeading="Diseases" itemDesc="Diseases and Symptoms" to="/diseases" active="diseases" />
                    </Menu.Item>
                    {!isAuthenticated() && <Fragment>
                        <Menu.Item><AuthButton text="Farmer Login" to="/login/user"/></Menu.Item>
                        <Menu.Item><AuthButton text = "Hospital Login" to="/hospital-auth" /></Menu.Item>
                        <Menu.Item><AuthButton text="Doctor Login" to="/login/doctor" /></Menu.Item>
                        </Fragment>}
                  </Sidebar>
                </Sidebar.Pushable>
              </Grid.Column>
              </Grid>
              </Fragment>
          )
    }
    return(
        <Fragment>
        {mobileHeader()}
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
            {isAuthenticated() && <div onClick={()=> signout()}><AuthButton text="Logout" to="/"/></div>}
            </div>
            </div>
        </Fragment>
    )
}
export default MainHeader;