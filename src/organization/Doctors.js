import { Fragment, useState, useEffect } from "react";
import { isAuthenticated } from "../actions/auth";
import LoadingComponent from "../utilities/LoadingComponent"
import { getDoctors } from "../actions/firebaseapi";
import DoctorList from "./DoctorList";
const Doctors = () => {
  const [values, setValues] = useState({
    error: "",
    loading: "",
  });
  const [show, setShow] = useState("");
  const { loading, error } = values;
  const [doctors,setDoctors] = useState("")
  useEffect(() => {
    loadDoctors();
  }, []);
  const loadDoctors = async() => {
    try {
      setValues({ ...values, error: "", loading: true });
      await getDoctors(isAuthenticated()).then((data) => {
       setDoctors(data)
          
      });
      setTimeout(()=>{
        setValues({
          error:"",
          loading:false
        })
      },500)
    } catch {
      setValues({ ...values, error: "Error while connecting", loading: false });
    }
  };
  return (
    !loading ? 
      <div style={{ height: "100vh" }}>
        {error && <p style={{ margin: "32px", color: "red" }}>{error}</p>}
        <ul>
          {doctors.length > 0
            ? doctors.map((doc, i) => {
                return (
                  <div
                    key={doc.id}
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
                        Name- {doc.name}
                      </div>
                      <div style={{ fontSize: "1.3rem", fontWeight: "500" }}>
                        Contact No.- {doc.mobileNumber}
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <button
                          style={{
                            fontSize: "1.2rem",
                            padding: "8px 16px",
                            color: "white",
                            background: "rgb(0,53,128)",
                            border: "none",
                            borderRadius: "4px",
                          }}
                          onClick={() => {
                            if (show !== doc.id) {
                              setShow(doc.id);
                            } else {
                              setShow("");
                            }
                          }}
                        >
                          Patients
                        </button>
                      </div>
                      {show === doc.id && (
                        <DoctorList
                          doctorId={doc.id}
                        />
                      )}
                    </div>
                  </div>
                );
              })
            : <h1>No Doctor Found</h1>}
        </ul>
      </div>
    : <LoadingComponent loading={loading} />
  );
};
export default Doctors;
