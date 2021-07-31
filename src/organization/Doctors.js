import { Fragment, useState, useEffect, Component } from "react";
import { isAuthenticated } from "../actions/auth";
import LoadingComponent from "../utilities/LoadingComponent"
import firebase from "../firebase"
import DoctorList from "./DoctorList";
class Doctors extends Component{
  state = {
    error: "",
    loading: "",
    show: "",
    doctors: []
  }
  componentDidMount() {
    this.loadDoctors();
  };
  loadDoctors = async() => {
    try {
      this.setState({ error: "", loading: true });
      this.props.doctors.map((doc) => {
        doc.get().then(data => this.setState((prevState)=>({doctors : [...prevState.doctors,{ ...data.data(),id: data.id}]})))
      })
        this.setState({
          error:"",
          loading:false
        })
    } catch {
      this.setState({ error: "Error while connecting", loading: false });
    }
  };
  render(){
    const {loading,error,doctors,show} = this.state
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
                              this.setState({show : doc.id});
                            } else {
                              this.setState({show:""});
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
            }
};
export default Doctors;
