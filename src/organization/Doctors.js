import { Fragment, useState, useEffect } from "react";
import { isAuthenticated } from "../actions/auth";
import LoadingComponent from "../utilities/LoadingComponent"
import { getDoctors } from "../actions/firebaseapi";
import DoctorList from "./DoctorList";
const Doctors = () => {
  const [values, setValues] = useState({
    doctors: "",
    error: "",
    loading: "",
  });
  const [show, setShow] = useState("");
  const { doctors, loading, error } = values;
  useEffect(() => {
    loadDoctors();
  }, []);
  const loadDoctors = () => {
    try {
      setValues({ ...values, error: "", loading: true });
      getDoctors(isAuthenticated()).then((data) => {
        let result = [];
          data.forEach((key) => 
          result.push({[key.id]: key.data})
          )
          setValues({
            ...values,
            error:"",
            doctors: [...result],
            loading:false
          })
        
      });
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
              var doc_key = Object.keys(doc)[0]
                return (
                  <div
                    key={doc_key}
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
                        Name- {doc[doc_key].name}
                      </div>
                      <div style={{ fontSize: "1.3rem", fontWeight: "500" }}>
                        Contact No.- {doc[doc_key].mobileNumber}
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
                            if (show !== doc_key) {
                              setShow(doc_key);
                            } else {
                              setShow("");
                            }
                          }}
                        >
                          Patients
                        </button>
                      </div>
                      {show === doc_key && (
                        <DoctorList
                          doctorId={doc_key}
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
