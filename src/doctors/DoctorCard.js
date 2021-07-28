import { Fragment } from "react";
import { Link } from "react-router-dom";
const DoctorCard = ({ doctor }) => {
  return (
    <Fragment>
      <div
        style={{
          width: "80%",
          height: "80px",
          border: "1px solid #888",
          boxShadow: "4px 4px 4px 1px #888",
          background: "#eef",
          overflow: "hidden",
          margin: "32px auto",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: 'center',
            justifyContent: 'space-around'
          }}
        >
          <div
            style={{ fontWeight: "500", fontSize: "1.2rem" }}
          >
            {" "}
            Name: <span>Dr. {doctor.name && doctor.name.substr(0, 15)}</span>
          </div>
          <div style={{ fontWeight: "500", fontSize: "1.2rem" }}>
            {" "}
            Mobile Number : {doctor.mobileNumber}
          </div>
          <Link to="/">
          <button
            style={{
              padding: "8px",
              background: "rgb(0,53,128)",
              cursor: "pointer",
              border: "none",
              color: "white",
              marginTop: "8px",
            }}
          >
            Contact Now
          </button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};
export default DoctorCard;
