// import { Card,Image } from "semantic-ui-react";
import { Alert } from "antd";
import { Fragment } from "react";
import { Table,Header } from "semantic-ui-react";
const week = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const DoctorCard = ({ doctors,heading }) => {
  const checkAvailability = (doctor) => {
    if(doctor.available){
      if(doctor.jobType == "private"){
        if(doctor.weekDays.includes(week[new Date().getDay()])){
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
  return (doctors && 
    doctors.length > 0 ? (
      <Fragment>
        <Header>{heading}</Header>
        <div style={{display:'flex',flexWrap:'wrap'}}>
        <Table celled>
        <Table.Header>
        <Table.Row>
        <Table.HeaderCell>Sr No.</Table.HeaderCell>
        <Table.HeaderCell>Doctor Name</Table.HeaderCell>
        <Table.HeaderCell>Mobile Number</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Fee</Table.HeaderCell>
        <Table.HeaderCell>Appointment</Table.HeaderCell>
        </Table.Row>
        </Table.Header>
        <Table.Body>
        {doctors.map((doc, _) => (
          <Table.Row key={doc.mobileNumber}>
          <Table.Cell>{_+1}</Table.Cell>
          <Table.Cell>{doc.name}</Table.Cell>
          <Table.Cell>{doc.mobileNumber}</Table.Cell>
          <Table.Cell>{doc.email}</Table.Cell>
          <Table.Cell>{doc.fee}</Table.Cell>
          <Table.Cell ><button onClick={()=>checkAvailability(doc)}>Book Appointment</button></Table.Cell>
          </Table.Row>
          
        ))}
        </Table.Body>
        </Table>
        </div>
      </Fragment>
    ) : (
       (
        <Alert
          className="mt-4"
          type="info"
          message={`No ${heading} Found`}
        />
      )
    )
  );
};
export default DoctorCard;
// <Card style={{margin: '16px'}}>
//     <Card.Content>
//     <Image floated="right" size="medium" src={doctor.photo? doctor.photo : "https://images.theconversation.com/files/304957/original/file-20191203-66986-im7o5.jpg?ixlib=rb-1.1.0&q=45"}/>
//     <Card.Header>{doctor.name}</Card.Header>
//     <Card.Meta>{`${doctor.speciality}${doctor.experience ? doctor.experience + "yr" : ""}`}</Card.Meta>
//     <Card.Description>Fee Rs-{doctor.fee ? doctor.fee : 0}</Card.Description>
//     <Card.Meta>Location {doctor.address}</Card.Meta>
//     </Card.Content>
//     <Card.Content>
//     <div className="w3-padding w3-xsmall" style={{fontSize:"10px" ,color:"green"}}>
//       <i className="material-icons" style={{fontSize:"15px"}}>today</i><b>{doctor.weekDays.length>0 ? doctor.weekDays:"All working Days"}</b>
//       </div><br></br>
//       <button onClick={checkAvailability} className="w3-button w3-blue w3-round-xlarge">Book Appointment</button>
//     </Card.Content>
//     </Card>