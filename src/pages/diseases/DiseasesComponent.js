import firebase from "../../firebase"
import { Fragment, useEffect, useState } from "react";
import LoadingComponent from "../../utilities/LoadingComponent";

const DiseasesComponent = () => {
  const [data, setdata] = useState("");
  const [loading,setLoading] = useState(false);
  const [from,setFrom] = useState(0);
  const [result,setResult] = useState("")
  const [searchterm,setSearchterm] = useState("");
  useEffect(() => {
    //fetch diseases from firebase
    loadDiseases();
  }, []);
  const loadDiseases = () =>{
    setLoading(true)
    try{
        firebase.database().ref("jsonfiles").child("diseases_data").orderByKey().once("value",(snap)=>{
            setdata(snap.val())
            setLoading(false)
          })
    }catch{
        setLoading(false)
        setdata("")
    }
  }
  useEffect(()=>{
    if(searchterm){
      handleSearchMessages();
    }
  },[searchterm])
  const handleSearchChange = (event) => {
    setSearchterm(event.target.value)
  };
  const handleSearchMessages = () => {
    const nodal_heads_list = [...data];
    const regex = new RegExp(searchterm, "gi");
    const searchResults = nodal_heads_list.reduce((acc, message) => {
      if (
        (message["Disease_Name"] && message["Disease_Name"].match(regex) || message["Species_Name"] && message["Species_Name"].match(regex))
      ) {
        acc.push(message);
      }
      return acc;
    }, []);
    setResult(searchResults)
   
  };
  const displaySearchResults = () => {
    return( result &&  <table className="table">
    {result.slice(from,from+99).length > 0 ?(
      <Fragment>
      <thead>
        <tr className="row">
        <th className="col">Species Name</th>
          
          <th className="col">Disease_Name</th>
          <th className="col">DiseaseSymptoms</th>
        </tr>
      </thead>
      <tbody>
        {result.slice(from,from+99).map((d,_) => (
            <tr className="row" key={`${d["Disease_Name"]}${_}`}>
              <td className="col">{d["Species_Name"]}</td>
              <td className="col">{d["Disease_Name"]}</td>
              <td className="col">{d["DiseaseSymptoms"]}</td>
            </tr>
          ))}
      </tbody>
      </Fragment>
      ) : (
        <tbody>
        <tr
          style={{ fontSize: "1.4rem", fontWeight: "600", padding: "16px" }}
        >
          <td>No data Present</td>
        </tr>
        </tbody>
      )}
  </table>
    )
  }
  const displayList = () => {
    return( data &&  <table className="table">
    {data.slice(from,from+99).length > 0 ?(
      <Fragment>
      <thead>
        <tr className="row">
        <th className="col">Species Name</th>
          
          <th className="col">Disease_Name</th>
          <th className="col">DiseaseSymptoms</th>
        </tr>
      </thead>
      <tbody>
        {data.slice(from,from+99).map((d,_) => (
            <tr className="row" key={`${d["Disease_Name"]}${_}`}>
              <td className="col">{d["Species_Name"]}</td>
              <td className="col">{d["Disease_Name"]}</td>
              <td className="col">{d["DiseaseSymptoms"]}</td>
            </tr>
          ))}
      </tbody>
      </Fragment>
      ) : (
        <tbody>
        <tr
          style={{ fontSize: "1.4rem", fontWeight: "600", padding: "16px" }}
        >
          <td>No data Present</td>
        </tr>
        </tbody>
      )}
  </table>
    )
  }
  return (!loading ? data &&
    <div style={{ padding: "2px", margin: "32px" }}>
    <div style={{display:'flex',width:'100%'}}>
    <label style={{width:'30%',fontSize:'1.2rem',fontWeight:'500'}}>Breed Name or Disease Name</label>
    <input name="searchTerm" value={searchterm} onChange={handleSearchChange} type="text" style={{width:'70%'}} placeholder="Enter Breed name or disease name" />
    </div>
    <div style={{fontSize:'2rem',fontWeight:'600',textAlign:'center',margin:'16px'}}>List of Diseases with Symptoms</div>
      
      {searchterm.length > 0 ? displaySearchResults() : displayList()}
      <div>
      <button onClick={() => {from >= 100 ? setFrom(from - 100) : setFrom(0)
        
      }} >Previous</button>
      <button onClick={() => {from < (data.length-99)? setFrom(from + 100):setFrom(0)
      }} >Next</button>
    </div>
    </div> : <div style={{width:'100%',height:'100vh'}}><LoadingComponent loading={loading} /></div>
  );
};
export default DiseasesComponent;
{/*
<div>
      <button onClick={() => {from >= 100 ? setFrom(from - 100) : setFrom(0)
      }} >Previous</button>
      <button onClick={() => {from < (data.length - 50) ? setFrom(from + 100) : setFrom(0)
      }} >Next</button>
    </div>*/}