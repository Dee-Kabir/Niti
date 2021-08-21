import firebase from "../../firebase"
import { Fragment, useEffect, useState } from "react";
import LoadingComponent from "../../utilities/LoadingComponent";
import { Form, Table, Grid, GridRow,Header} from "semantic-ui-react";
const DispensaryComponent = () => {
  const [data, setdata] = useState("");
  const [loading,setLoading] = useState(false);
  const [result,setResult] = useState("")
  const [searchterm,setSearchterm] = useState("");
  useEffect(() => {
    //fetch nodal heads
    //setNodalHeads
    loadDispensaries();
  }, []);
  const loadDispensaries = () =>{
    setLoading(true)
    try{
        firebase.firestore().collection("dispensary").get().then(data => {
          let dilist=[];
          data.forEach(di => dilist.push({...di.data(),id: di.id}));
          setdata(dilist);
          console.log(dilist)
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
        (message["districtName "] && message["districtName "].match(regex))
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
        <Table.HeaderCell >District Name</Table.HeaderCell>
        <Table.HeaderCell >State Name</Table.HeaderCell>
        <Table.HeaderCell>Dispensary Name</Table.HeaderCell>
        <Table.HeaderCell >Contact Number</Table.HeaderCell>
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
          tableDataRow(d,_)
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
    return <Table.Row key={d.id}>
    <Table.Cell >{_+1}</Table.Cell>
    <Table.Cell >{d["districtName "]}</Table.Cell>
    <Table.Cell >GUJARAT</Table.Cell>
    <Table.Cell>{d["dispensaryName"]}</Table.Cell>
  <Table.Cell >{d["contactNumber"]}</Table.Cell>
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
          <Table.Cell>No Dispensary Present</Table.Cell>
        </Table.Row>
        </Table.Body>
      )}
    
  </Table>

    )
  }
  return (!loading ? data && 
    <Grid className="m-4">
    <GridRow stretched>
    <Form.Input style={{width: '50%',marginLeft:"16px"}} label="District Name" name="searchTerm" value={searchterm} onChange={handleSearchChange} type="text" placeholder="Enter state name" />
    </GridRow>
    <Grid.Row>
    <Header>List of Dispensaries</Header>
      {
        searchterm ? displaySearchResults() : displayList()
      }
      </Grid.Row>
      </Grid> : <LoadingComponent loading={loading} />
  );
};
export default DispensaryComponent;