import Footer from "./components/footer/Footer";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import MobileLogin from "./pages/Auth/MobileLogin";
import Register from "./pages/Auth/Register";
import Doctors from "./pages/doctors/Doctors";
import MainHeader from "./components/header/MainHeader";
import Home from "./pages/home/Home";
import NodalHeads from "./pages/nodalHeads/NodalHeads";
import RegisterHospital from "./pages/organization/RegisterHospital";
import Diagonstics from "./pages/diagonstics/Diagonstics";
import DiseasesComponent from "./pages/diseases/DiseasesComponent";
import OrganizationDashboard from "./pages/organization/OrganizationDashboard";
import HospitalRoutes from "./secureRoutes/HospitalRoutes";
import LoginRoutes from "./secureRoutes/LoginRoutes";
import MobileAuthRoutes from "./secureRoutes/MobileAuthRoutes";
import DoctorRoutes from "./secureRoutes/DoctorRoutes";
import UserRoutes from "./secureRoutes/UserRoutes";
import UserDashboard from "./pages/user/UserDashboard";
import NotAuthorised from "./utilities/NotAuthorised";
import HealthServices from "./pages/healthServices/HealthServices";
import RegisterDoctor from "./pages/doctors/RegisterDoctor";
import DoctorDashboard from "./pages/doctors/DoctorDashboard";
import HospitalDoctorDashboard from "./pages/doctors/HospitalDoctorDashboard";
import BookAppointment from "./pages/user/BookAppointment";
import DispensaryComponent from "./pages/dispensary/DispensaryComponent";
import JoinRoomPage from "./JoinRoomPage/JoinRoomPage";
import RoomPage from "./RoomPage/RoomPage";
import IntroductionPage from "./IntroductionPage/IntroductionPage";
const App = () => {
  return (
    <BrowserRouter>
      <MainHeader />
      <Switch>
        <Route path="/" exact component={Home} />
        <LoginRoutes path="/login/:userType" exact component={MobileLogin} />
        <MobileAuthRoutes
          path="/registration-after-mobile/user/:userId"
          exact
          component={Register}
        />
        <MobileAuthRoutes
          path="/registration-after-mobile/doctor/:userId"
          exact
          component={RegisterDoctor}
        />
        <LoginRoutes path="/hospital-auth" exact component={RegisterHospital} />
        <Route path="/nodal-heads" exact component={NodalHeads} />
        <Route path="/diagonstic-laboratories" exact component={Diagonstics} />
        <Route path="/diseases" exact component={DiseasesComponent} />
        <Route path="/doctors" exact component={Doctors} />
        <Route path="/health-services" exact component={HealthServices} />
        <Route path="/pharmacy" exact component={DispensaryComponent} />
        <HospitalRoutes
          path="/hospital-dashboard/:hospitalId"
          exact
          component={OrganizationDashboard}
        />
        <UserRoutes path="/dashboard/:userId" exact component={UserDashboard} />
        <UserRoutes
          path="/appointment/:doctorId"
          exact
          component={BookAppointment}
        />
        <DoctorRoutes
          path="/doctor-dashboard/:doctorId"
          exact
          component={DoctorDashboard}
        />
        <HospitalRoutes
          path="/hospital/doctor-dashboard/:doctorId"
          exact
          component={HospitalDoctorDashboard}
        />
        <Route path="/join-room">
          <JoinRoomPage />
        </Route>
        <Route path="/room">
          <RoomPage />
        </Route>
        <Route path="/video-page">
          <IntroductionPage />
        </Route>
        <Route path="/:" component={NotAuthorised} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
