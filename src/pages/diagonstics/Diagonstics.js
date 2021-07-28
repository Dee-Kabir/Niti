import firebase from "../../firebase"
import { Fragment, useEffect, useState } from "react";
import LoadingComponent from "../../utilities/LoadingComponent";

const Diagonstics = () => {
  const [data, setdata] = useState("");
  const [loading,setLoading] = useState(false);
  const [result,setResult] = useState("")
  const [searchterm,setSearchterm] = useState("");
  useEffect(() => {
    //fetch nodal heads
    //setNodalHeads
    loadDiagonstics();
  }, []);
  const loadDiagonstics = () =>{
    setLoading(true)
    try{
        firebase.database().ref("jsonfiles").child("diagonstic_laboratory").orderByChild("/State Name").once("value",(snap)=>{
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
        (message["State Name"] && message["State Name"].match(regex))
      ) {
        acc.push(message);
      }
      return acc;
    }, []);
    setResult(searchResults)
   
  };
  const displaySearchResults = () => {
    return( result && <table className="table">
        {result.length > 0 ? (
          <Fragment>
      <thead>
        <tr className="row">
        <th className="col">SNo</th>
        <th className="col">ADDL</th>
        <th className="col">State Name</th>
        <th className="col">District Name</th>
        <th className="col">Person Name</th>
        <th className="col">Mobile</th>
        <th className="col">Fax No</th>
        <th className="col">EMail</th>
        <th className="col">Contact No</th>
        </tr>
      </thead>
    <tbody>
      {
        result.map((d,_) => (
          <tr className="row" key={`${d["ADDL"]}${_}`}>
          <td className="col">{d["SNo"]}</td>
          <td className="col">{d["ADDL"]}</td>
          <td className="col">{d["State Name"]}</td>
          <td className="col">{d["District Name"]}</td>
          <td className="col">{d["Person Name"]}</td>
          <td className="col">{d["Mobile"]}</td>
        <td className="col">{d["Fax No"]}</td>
        <td className="col">{d["EMail"]}</td>
        <td className="col">{d["Contact No"]}</td>
          </tr>
        ))}
        </tbody>
      </Fragment>
          ) : (
            <tbody>
        <tr
          style={{ fontSize: "1.4rem", fontWeight: "600", padding: "16px" }}
        >
          <td>No Diagonstic Laboratory Present</td>
        </tr>
        </tbody>)}
      </table>
    )
  }
  const displayList = () => {
    return ( data && <table className="table">
    {data.length > 0 ? (
      <Fragment>
      <thead>
        <tr className="row">
        <th className="col">SNo</th>
        <th className="col">ADDL</th>
        <th className="col">State Name</th>
        <th className="col">District Name</th>
        <th className="col">Person Name</th>
        <th className="col">Mobile</th>
        <th className="col">Fax No</th>
        <th className="col">EMail</th>
        <th className="col">Contact No</th>
        </tr>
      </thead>
    <tbody>
      {
        data.map((d,_) => (
          <tr className="row" key={`${d["ADDL"]}${_}`}>
          <td className="col">{d["SNo"]}</td>
          <td className="col">{d["ADDL"]}</td>
          <td className="col">{d["State Name"]}</td>
          <td className="col">{d["District Name"]}</td>
          <td className="col">{d["Person Name"]}</td>
          <td className="col">{d["Mobile"]}</td>
        <td className="col">{d["Fax No"]}</td>
        <td className="col">{d["EMail"]}</td>
        <td className="col">{d["Contact No"]}</td>
          </tr>
        ))}
        </tbody>
      </Fragment>
      ) : (
        <tbody>
        <tr
          style={{ fontSize: "1.4rem", fontWeight: "600", padding: "16px" }}
        >
          <td>No Diagonstic Laboratory Present</td>
        </tr>
        </tbody>
      )}
    
  </table>

    )
  }
  return (!loading ? data && 
    <div style={{ padding: "2px", margin: "32px" }}>
    <div style={{display:'flex',width:'100%'}}>
    <label style={{width:'30%',fontSize:'1.2rem',fontWeight:'500'}}>State</label>
    <input name="searchTerm" value={searchterm} onChange={handleSearchChange} type="text" style={{width:'70%'}} placeholder="Enter state name" />
    </div>
    <div style={{fontSize:'2rem',fontWeight:'600',textAlign:'center',margin:'16px'}}>List of Diagonstics Laboratory</div>
      
      {
        searchterm ? displaySearchResults() : displayList()
      }
      
    </div> : <div style={{width:'100%',height:'100vh'}}><LoadingComponent loading={loading} /></div>
  );
};
export default Diagonstics;