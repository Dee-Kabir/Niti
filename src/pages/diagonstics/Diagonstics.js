import firebase from "../../firebase"
import { Fragment, useEffect, useState } from "react";
import LoadingComponent from "../../utilities/LoadingComponent";
import { Form, Table, Grid, GridRow,Header} from "semantic-ui-react";
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
  const tableHeader = () => {
    return<Table.Header>
        <Table.Row >
        <Table.HeaderCell >SNo</Table.HeaderCell>
        <Table.HeaderCell >ADDL</Table.HeaderCell>
        <Table.HeaderCell >State Name</Table.HeaderCell>
        <Table.HeaderCell >District Name</Table.HeaderCell>
        <Table.HeaderCell >Person Name</Table.HeaderCell>
        <Table.HeaderCell >Mobile</Table.HeaderCell>
        <Table.HeaderCell >Fax No</Table.HeaderCell>
        <Table.HeaderCell >EMail</Table.HeaderCell>
        <Table.HeaderCell >Contact No</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    
  }
  const displaySearchResults = () => {
    return( result && <Table celled>
        {result.length > 0 ? (
          <Fragment>
      {tableHeader()}
    <Table.Body>
      {
        result.map((d,_) => (
          tableDataRow(d)
        ))}
        </Table.Body>
      </Fragment>
          ) : (
            <Table.Body>
        <Table.Row>
          <Table.Cell>No Diagonstic Laboratory Present</Table.Cell>
        </Table.Row>
        </Table.Body>)}
      </Table>
    )
  }
  const tableDataRow = (d,_) =>{
    return <Table.Row key={`${d["ADDL"]}${_}`}>
    <Table.Cell >{d["SNo"]}</Table.Cell>
    <Table.Cell >{d["ADDL"]}</Table.Cell>
    <Table.Cell >{d["State Name"]}</Table.Cell>
    <Table.Cell >{d["District Name"]}</Table.Cell>
    <Table.Cell >{d["Person Name"]}</Table.Cell>
    <Table.Cell >{d["Mobile"]}</Table.Cell>
  <Table.Cell >{d["Fax No"]}</Table.Cell>
  <Table.Cell >{d["EMail"]}</Table.Cell>
  <Table.Cell >{d["Contact No"]}</Table.Cell>
    </Table.Row>
  }
  const displayList = () => {
    return ( data && <Table celled>
    {data.length > 0 ? (
      <Fragment>
      {tableHeader()}
    <Table.Body>
      {
        data.map((d,_) => (
          tableDataRow(d,_)
        ))}
        </Table.Body>
      </Fragment>
      ) : (
        <Table.Body>
        <Table.Row>
          <Table.Cell>No Diagonstic Laboratory Present</Table.Cell>
        </Table.Row>
        </Table.Body>
      )}
    
  </Table>

    )
  }
  return (!loading ? data && 
    <Grid className="m-4">
    <GridRow stretched>
    <Form.Input style={{width: '50%',marginLeft:"16px"}} label="State Name" name="searchTerm" value={searchterm} onChange={handleSearchChange} type="text" placeholder="Enter state name" />
    </GridRow>
    <Grid.Row>
    <Header>List of Diagonstics Laboratory</Header>
      {
        searchterm ? displaySearchResults() : displayList()
      }
      </Grid.Row>
      </Grid> : <LoadingComponent loading={loading} />
  );
};
export default Diagonstics;