import { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
const week = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const DoctorCard = ({ doctor }) => {
  const checkAvailability = () => {
    if(doctor.available){
      if(doctor.jobType == "private"){
        if(doctor.weekDays.includes(week(new Date().getDay()))){
          localStorage.setItem("selectedDoctor",JSON.stringify(doctor))
          window.location.href = `/appointment/${doctor.id}`
          
        }else{
          alert("Doctor Not Available")
        }
      }else{
        localStorage.setItem("selectedDoctor",JSON.stringify(doctor))
        window.location.href = `/appointment/${doctor.id}`
      }
    }else{
      alert("Doctor Not Available")
    }
  }
  return (doctor && 
    <Fragment>
      <div className="w3-container" style={{fontSize:"1vw",boxShadow:"0px 5px 8px 1px #888"}}>
     <div className="w3-row-padding w3-panel w3-border-top w3-border">
         <div className="w3-col l3 m6 s4 w3-white w3-center">          
          <img src={doctor.photo? doctor.photo : "https://images.theconversation.com/files/304957/original/file-20191203-66986-im7o5.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop"} className="w3-round w3-margin-bottom" alt="Random Name" alt="New York" style={{width:"100%"}} className="w3-hover-opacity"/>
        </div>      
          <div className="w3-col l7 m3 s4 w3-white w3-left" >
            <h3 style={{color: "darkblue"}}><b>{doctor.name}</b></h3>
            <p className="w3-opacity" >{doctor.speciality}</p>
            <p className="w3-opacity" >{doctor.experience}1 yr Experience</p>
            <b>Location</b>
            <p className="w3-opacity">{doctor.address}</p>
            <p className="w3-container">Fee: Rs. {doctor.private ? doctor.fee : 0}</p>
            <div className="w3-padding w3-xsmall">
              <i className="material-icons" style={{color:"green"}}>thumb_up</i>
              <Link to="#" style={{color:"green"}}>Patient Stories</Link>
            </div>
          </div>
          <div className="w3-col l2 m3 s4 w3-white w3-center"><br />                 
            <div className="w3-padding w3-xsmall" style={{fontSize:"10px" ,color:"green"}}>
              <i className="material-icons" style={{fontSize:"15px"}}>today</i><b>{doctor.weekDays ? doctor.weekDays:"All working Days"}</b>
            </div><br></br>
            <button onClick={checkAvailability} className="w3-button w3-blue w3-round-xlarge">Book Appointment</button>
            
          </div>
        </div>
      </div>
    
      </Fragment>
  );
};
export default DoctorCard;
