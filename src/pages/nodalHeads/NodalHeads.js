import firebase from "../../firebase"
import { useEffect, useState } from "react";
import LoadingComponent from "../../utilities/LoadingComponent";
import { Form, Grid, Header, Table } from "semantic-ui-react";
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
    return data && <Table celled>
    {data.length > 0 && (
      <Table.Header>
        <Table.Row>
        <Table.HeaderCell>State</Table.HeaderCell>
          <Table.HeaderCell>Name of Nodal Officer</Table.HeaderCell>
          <Table.HeaderCell>Mobile No</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    )}
    <Table.Body>
      {data.length > 0  ? (
        data.map((d,_) => (
          <Table.Row key={`${d["Mobile No"]}${_}`}>
            <Table.Cell>{d["State "]}</Table.Cell>
            <Table.Cell>{d["Name of Nodal Officer"]}</Table.Cell>
            <Table.Cell>{d["Mobile No"]}</Table.Cell>
          </Table.Row>
        ))
      ) : (
        <Table.Row
          style={{ fontSize: "1.4rem", fontWeight: "600", padding: "16px" }}
        >
          <Table.Cell>No NodalHead Present</Table.Cell>
        </Table.Row>
      )}
    </Table.Body>
  </Table>
  }
  return (!loading ? data &&
    <Grid className="m-4">
    <Grid.Row>
    <Form.Input style={{width: '50%',marginLeft:"16px"}} label="State Name" name="searchTerm" value={searchterm} onChange={handleSearchChange} type="text" placeholder="Enter State" />
    </Grid.Row>
    <Grid.Row>
    <Header>List of Nodal Heads</Header>
    </Grid.Row>
   <Grid.Row>
      {
        searchterm ? displaySearchResults() : displayList()
      }
      </Grid.Row>
      </Grid> : <LoadingComponent loading={loading} />
  );
};
export default NodalHeads;