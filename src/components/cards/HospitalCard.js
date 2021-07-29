import { Fragment, useState } from "react"
import { fectchDoctors } from "../../actions/firebaseapi"
import DoctorCard from "../../doctors/DoctorCard"

const HospitalCard = ({hospital}) => {
    const [show,setShow] = useState(false)
    const [doctorsList,setDoctors] = useState("")
    const [loading,setLoading] = useState(false)
    const showHospitalData = async() => {
        setLoading(true)
        if(doctorsList.length === 0){
            await fectchDoctors(hospital.doctors).then((data) => {
                setDoctors(data)
                setShow(!show)
                setTimeout(()=>{
                    setLoading(false)
                  },1000)
            })
        }else{
            setShow(!show)
        }
    }
    const doctors = () => {
        return(doctorsList && doctorsList.map((doc,_)=>(
            <DoctorCard doctor={doc} key={doc.id} />
        ))
        )
    }
    return(
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
            Name: <span>{hospital.name && hospital.name}</span>
          </div>
          <div style={{ fontWeight: "500", fontSize: "1.2rem" }}>
            {" "}
            Mobile Number : {hospital.mobileNumber}
          </div>
          <button
          onClick={showHospitalData}
            style={{
              padding: "8px",
              background: "rgb(0,53,128)",
              cursor: "pointer",
              border: "none",
              color: "white",
              marginTop: "8px",
            }}
          >
            select Doctor
          </button>
        </div>
        
      </div>
      {
          show && <div style={{border:'2px solid #888',width:'95%',margin:'auto'}}>
          <h2 style={{fontWeight:'700'}}>Doctors in hospital {hospital.name}</h2>
          {show && hospital && doctors()}
          </div>
      }
    </Fragment>
    )
}
export default HospitalCard