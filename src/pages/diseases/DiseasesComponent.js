import firebase from "../../firebase"
import { Fragment, useEffect, useState } from "react";
import LoadingComponent from "../../utilities/LoadingComponent";
import { Input, Label, Table, TableBody,Grid, Header, GridColumn,Button, Form } from "semantic-ui-react";
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
    return( result &&  <Table celled>
    {result.length > 0 ?(
      <Fragment>
      <Table.Header>
      <Table.Row>
          <Table.HeaderCell>Species Name</Table.HeaderCell>    
          <Table.HeaderCell>Disease_Name</Table.HeaderCell>
          <Table.HeaderCell>DiseaseSymptoms</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {result.map((d,_) => (
            <Table.Row className="row" key={`${d["Disease_Name"]}${_}`}>
              <Table.Cell >{d["Species_Name"]}</Table.Cell>
              <Table.Cell >{d["Disease_Name"]}</Table.Cell>
              <Table.Cell >{d["DiseaseSymptoms"]}</Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
      </Fragment>
      ) : (
        <Table.Body>
        <Table.Row>
          <Table.Cell>No data Present</Table.Cell>
        </Table.Row>
        </Table.Body>
      )}
  </Table>
    )
  }
  const displayList = () => {
    return( data &&  <Table celled>
    {data.slice(from,from+99).length > 0 ?(
      <Fragment>
      <Table.Header>
        <Table.Row>
        <Table.HeaderCell >Species Name</Table.HeaderCell>
          <Table.HeaderCell >Disease_Name</Table.HeaderCell>
          <Table.HeaderCell >DiseaseSymptoms</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <TableBody>
        {data.slice(from,from+99).map((d,_) => (
            <Table.Row  key={`${d["Disease_Name"]}${_}`}>
              <Table.Cell >{d["Species_Name"]}</Table.Cell>
              <Table.Cell >{d["Disease_Name"]}</Table.Cell>
              <Table.Cell >{d["DiseaseSymptoms"]}</Table.Cell>
            </Table.Row>
          ))}
      </TableBody>
      </Fragment>
      ) : (
        <TableBody>
        <Table.Row>
          <Table.Cell>No data Present</Table.Cell>
        </Table.Row>
        </TableBody>
      )}
  </Table>
    )
  }
  const controlButtons = () => (
    <Grid.Row columns={2} stretched className="m-4">
<Grid.Column ><Button secondary onClick={() => {from >= 100 ? setFrom(from - 100) : setFrom(0)}} >Previous</Button></Grid.Column>
<Grid.Column ><Button positive onClick={() => {from < (data.length-99)? setFrom(from + 100):setFrom(0)}} >Next</Button></Grid.Column>
</Grid.Row>
  )
  return (!loading ? data &&
    <Grid className="m-4">
    <Grid.Row stretched>
    <Form.Input style={{width: '50%',marginLeft:"16px"}} label="Disease or Breed Name" name="searchTerm" value={searchterm} onChange={handleSearchChange} type="text" placeholder="Enter breed or disease name" />
    </Grid.Row>
    <Grid.Row><Header>List of Diseases with Symptoms</Header>

    {searchterm.length > 0 ? displaySearchResults() : displayList()}
    </Grid.Row>
      {controlButtons()}
    </Grid> : <LoadingComponent loading={loading} />
  )
};
export default DiseasesComponent;