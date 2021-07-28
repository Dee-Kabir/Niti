import { useState } from "react"
import DropdownInput from "./DropdownInput"
import classes from "./SelectLiveStock.module.css"
const SelectLiveStocks = () => {
    const [values, setValues] = useState({
        livestock_category: "",
        breed: "",
        disease: "",
        error: "",
        loading: false,
        data: []
    })
    const {livestock_category,breed,disease,error,loading,data} = values
    const handleSelect = (data) => {
        setValues({...values,[data.category]: data.text})
    }
    const fetchRelatedData = () => {
        // fetch related Data
        if(livestock_category && breed){
            // fetch data
        }else{
            setValues({...values,error: "Select livestock and breed"})
        }
    }
    return(
        <div className={classes.Select_Livestock}>
        <div className={classes.Select_Livestock_heading}>Select Livestocks</div>
        <div className={classes.Select_Livestock_item}>
        <label>Livestock category</label>
        <DropdownInput name="livestock_category" placeholder="Livestock category" value={livestock_category} handleSelect={handleSelect} category="livestock_category"/>
        </div>
        <div className={classes.Select_Livestock_item}>
        <label>Breed</label>
        <DropdownInput name="breed" placeholder="Livestock breed" value={breed} handleSelect={handleSelect} category={`${livestock_category}_${breed}`}/>
        </div>
        <div className={classes.Select_Livestock_item}>
        <label>Diseases</label>
        <DropdownInput name="disease" placeholder="Disease" value={disease} handleSelect={handleSelect} category={`${livestock_category}_${breed}_${disease}`}/>
        </div>
        <div className={classes.Submit_btn_livestock}>
        <button onClick={fetchRelatedData}>Submit</button>
        </div>
        {
            data && data.length > 0 && data.map((da,_) => (
                <div>Show Data</div>
            ))
        }
        </div>
    )
}
export default SelectLiveStocks;