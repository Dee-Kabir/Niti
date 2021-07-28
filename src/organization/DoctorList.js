import { useEffect, useState,Fragment } from "react";
// import { getPatients } from "../../actions/hospital";

const DoctorList = ({doctorId,token}) => {
    const [values,setValues] = useState({
        patients_: "",
        error: ""
    })
    const {patients_,error} = values;
    useEffect(()=>{
        loadPatient()
    },[])
    function loadPatient (){
        try {
            setValues({ ...values, error: "", loading: true });
            // getPatients(doctorId,token).then((data) => {
            //   if (data.error) {
            //     setValues({
            //       ...values,
            //       error: "Try again after some time",
            //     });
            //   } else {
            //     setValues({
            //       ...values,
            //       patients_: data.patients,
            //       error: "",
            //     });
            //   }
            // });
          } catch {
            setValues({ ...values, error: "Error while connecting" });
          }
    }
    return (
        <Fragment>
        <div>
        <ul>
          {patients_.length > 0
            ? patients_.map((pat, i) => {
                return (
                  <div key={pat._id}
                    style={{
                      width: "100%",
                      display: "flex",
                      margin: "16px 4px",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "500",
                        marginRight: "16px",
                      }}
                    >
                      {i + 1}.
                    </label>
                    <div
                      style={{
                        border: "1px solid #888",
                        boxShadow: "4px 4px 5px 1px #888",
                        width: "80%",
                        padding: "8px",
                      }}
                    >
                      <div style={{ fontSize: "1.3rem", fontWeight: "500" }}>
                        Name- {pat.patientName}
                      </div>
                      <div style={{ fontSize: "1.3rem", fontWeight: "500" }}>
                        Contact No.- {pat.attendeNumber}
                      </div>
                      <div style={{textAlign:'right'}}>
                    <button style={{fontSize:'1rem',padding:'4px 8px',color:'white',background:'rgb(0,53,128)',border:'none',borderRadius:'4px'}}>Show</button>
                    </div>
                    </div>
                    
                  </div>
                );
              })
            : "No Patient Found"}
        </ul>
        </div>
        </Fragment>
    )
}
export default DoctorList;