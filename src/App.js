import Footer from "./components/footer/Footer"
import { BrowserRouter, Route,Switch } from 'react-router-dom';
import './App.css';
import MobileLogin from './pages/Auth/MobileLogin';
import Register from './pages/Auth/Register';
import Doctors from './doctors/Doctors';
import MainHeader from './components/header/MainHeader';
import Home from './Home';
import NodalHeads from './pages/nodalHeads/NodalHeads';
import RegisterHospital from "./organization/RegisterHospital";
import Diagonstics from "./pages/diagonstics/Diagonstics";
import DiseasesComponent from "./pages/diseases/DiseasesComponent";
import OrganizationDashboard from"./organization/OrganizationDashboard";
import HospitalRoutes from "./secureRoutes/HospitalRoutes";
import LoginRoutes from "./secureRoutes/LoginRoutes";
import MobileAuthRoutes from "./secureRoutes/MobileAuthRoutes";
import UserRoutes from "./secureRoutes/UserRoutes";
import UserDashboard from "./user/UserDashboard";
import NotAuthorised from "./utilities/NotAuthorised";
import HealthServices from "./components/healthServices/HealthServices";
import RegisterDoctor from "./doctors/RegisterDoctor";
const App = () => {
  return (
    <BrowserRouter>
    <MainHeader />
    <Switch>
    <Route path="/" exact component={Home} />
    <LoginRoutes path="/login/:userType" exact component={MobileLogin} />
    <MobileAuthRoutes path="/registration-after-mobile/user/:userId" exact component={Register} />
    <MobileAuthRoutes path="/registration-after-mobile/doctor/:userId" exact component={RegisterDoctor} /> 
    <LoginRoutes path="/hospital-auth" exact component={RegisterHospital} />
    <Route path="/nodal-heads" exact component={NodalHeads} />
    <Route path="/diagonstic-laboratories" exact component={Diagonstics} />
    <Route path="/diseases" exact component={DiseasesComponent} />
    <Route path="/doctors" exact component={Doctors} />
    <Route path="/health-services" exact component={HealthServices}/>
    <HospitalRoutes path="/hospital-dashboard/:hospitalId" exact component={OrganizationDashboard} />
    <UserRoutes path="/dashboard/:userId" exact component={UserDashboard} />
    <Route path="/:" exact component={NotAuthorised} />
    </Switch>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
