import firebase from "../../firebase"
import { useEffect, useState } from "react";
import LoadingComponent from "../../utilities/LoadingComponent";

const NodalHeads = () => {
  const [data, setdata] = useState("");
  const [loading,setLoading] = useState(false);
  const [result,setResult] = useState("")
  const [searchterm,setSearchterm] = useState("");
  useEffect(() => {
    //fetch nodal heads
    //setNodalHeads
    loadNodalHeads();
  }, []);
  const loadNodalHeads = () =>{
    setLoading(true)
    firebase.database().ref("jsonfiles").child("nodal_Heads").orderByChild("State").once("value",(snap)=>{
      setdata(snap.val())
      setLoading(false)
    })
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
        (message["State "] && message["State "].match(regex))
      ) {
        acc.push(message);
      }
      return acc;
    }, []);
    setResult(searchResults)
   
  };
  const displaySearchResults = () => {
    return result && <table className="table">
    {result.length > 0 && (
      <thead>
        <tr className="row">
        <th className="col">State</th>
          
          <th className="col">Name of Nodal Officer</th>
          <th className="col">Mobile No</th>
        </tr>
      </thead>
    )}
    <tbody>
      {result.length > 0  ? (
        result.map((d,_) => (
          <tr className="row" key={`${d["Mobile No"]}${_}`}>
            <td className="col">{d["State "]}</td>
            <td className="col">{d["Name of Nodal Officer"]}</td>
            <td className="col">{d["Mobile No"]}</td>
          </tr>
        ))
      ) : (
        <tr
          style={{ fontSize: "1.4rem", fontWeight: "600", padding: "16px" }}
        >
          <td>No NodalHead Present</td>
        </tr>
      )}
    </tbody>
  </table>
  }
  const displayList = () => {
    return data && <table className="table">
    {data.length > 0 && (
      <thead>
        <tr className="row">
        <th className="col">State</th>
          
          <th className="col">Name of Nodal Officer</th>
          <th className="col">Mobile No</th>
        </tr>
      </thead>
    )}
    <tbody>
      {data.length > 0  ? (
        data.map((d,_) => (
          <tr className="row" key={`${d["Mobile No"]}${_}`}>
            <td className="col">{d["State "]}</td>
            <td className="col">{d["Name of Nodal Officer"]}</td>
            <td className="col">{d["Mobile No"]}</td>
          </tr>
        ))
      ) : (
        <tr
          style={{ fontSize: "1.4rem", fontWeight: "600", padding: "16px" }}
        >
          <td>No NodalHead Present</td>
        </tr>
      )}
    </tbody>
  </table>
  }
  return (!loading ? data &&
    <div style={{ padding: "2px", margin: "32px" }}>
    <div style={{display:'flex',width:'100%'}}>
    <label style={{width:'30%',fontSize:'1.2rem',fontWeight:'500'}}>State</label>
    <input name="searchTerm" value={searchterm} onChange={handleSearchChange} type="text" style={{width:'70%'}} placeholder="Enter state name" />
    </div>
    <div style={{fontSize:'2rem',fontWeight:'600',textAlign:'center',margin:'16px'}}>List of Nodal Head</div>
      {
        searchterm ? displaySearchResults() : displayList()
      }
    </div> : <div style={{width:'100%',height:'100vh'}}><LoadingComponent loading={loading} /></div>
  );
};
export default NodalHeads;