import { useEffect, useState } from "react";
import {Dropdown} from "semantic-ui-react"
import { getdata } from "../../actions/searchapi";
const SearchInput = ({category,name,handlePlaces,placeholder,value}) => {
    const [data,setData] = useState([])
    useEffect(()=>{
        loadData()
    },[category])
    const loadData = () => {
        var text;
        if(name ==="state"){
            text = "stateName"
        }else{
            text = "districtName"
        }
        var list = [];
        if(category){
            getdata(category).then(data => {
                list = data && data.val().map((state,i)=> ({ 
                    key : i,
                    text: state[text],
                    value: state[text] 
                }))
                setData(list)
            }).catch(err =>setData([]) )
        }
        
    }
    return (
        <Dropdown
    placeholder={placeholder}
    fluid
    search
    selection
    value={value}
    options={data}
    name={name}
    onChange = {(value,text) => {
    handlePlaces({
        category: name,
        text : text.value
    })
    }}
  />
    )
}
export default SearchInput;