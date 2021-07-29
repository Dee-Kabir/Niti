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
        if(name==="country"){
            text = "country_name"
        }else if(name =="state"){
            text = "state_name"
        }else{
            text = "city_name"
        }
        category && getdata(category).then(data => {
            var list = data && data.map((state,i)=> ({ 
                key : i,
                text: state[text],
                value: state[text] 
            }))
            
            setData(list)
        }).catch(err => console.log(err))
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