import { Alert } from "antd";
import { Fragment } from "react";
import { Table, Header } from "semantic-ui-react";
const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DoctorCard = ({ doctors, heading, searched = true }) => {
  const checkAvailability = (doctor) => {
    if (doctor.available) {
      if (doctor.jobType == "private") {
        if (doctor.weekDays.includes(week[new Date().getDay()])) {
          localStorage.setItem("selectedDoctor", JSON.stringify(doctor));
          window.location.href = `/appointment/${doctor.id}`;
        } else {
          alert("Doctor Not Available");
        }
      } else {
        localStorage.setItem("selectedDoctor", JSON.stringify(doctor));
        window.location.href = `/appointment/${doctor.id}`;
      }
    } else {
      alert("Doctor Not Available");
    }
  };
  return doctors && doctors.length > 0 ? (
    <Fragment>
      <Header>{heading}</Header>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Sr No.</Table.HeaderCell>
              <Table.HeaderCell>Doctor Name</Table.HeaderCell>
              <Table.HeaderCell>Mobile Number</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Fee(Rs)</Table.HeaderCell>
              <Table.HeaderCell>Appointment</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {doctors.map((doc, _) => (
              <Table.Row key={doc.mobileNumber}>
                <Table.Cell>{_ + 1}</Table.Cell>
                <Table.Cell>{doc.name}</Table.Cell>
                <Table.Cell>{doc.mobileNumber}</Table.Cell>
                <Table.Cell>{doc.email}</Table.Cell>
                <Table.Cell>{doc.fee}</Table.Cell>
                <Table.Cell>
                  <button onClick={() => checkAvailability(doc)}>
                    Book Appointment
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </Fragment>
  ) : (
    searched && (
      <Alert className="mt-4" type="info" message={`No ${heading} Found`} />
    )
  );
};
export default DoctorCard;
