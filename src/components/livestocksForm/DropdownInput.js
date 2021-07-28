import { useEffect, useState } from "react";
import {Dropdown} from "semantic-ui-react"
import { getDropdownList } from "../../actions/searchapi";
const DropdownInput = ({name,category,handleSelect,placeholder,value}) => {
    const [data,setData] = useState([])
    useEffect(()=>{
        loadData()
    },[category])
    const loadData = () => {
        category && getDropdownList(category).then(data => {
            var list = data && data.map((state,i)=> ({ 
                key : i,
                text: state,
                value: state 
            }))
            setData(list)
        })
    }
       
    return(
        <Dropdown
    placeholder={placeholder}
    fluid
    search
    selection
    value={value}
    options={data}
    name={name}
    onChange = {(value,text) => {
        handleSelect({
        category: name,
        text : text.value
    })
    }}
  />
    )
}
export default DropdownInput