import { useRef } from "react";
import { Button, Image } from "semantic-ui-react";
import SearchInput from "../components/search/SearchInput";
import classes from "./RegisterDoctor.module.css";
const week = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const RegisterDoctorForm = ({handleSubmit,handleChange,setValues,values,handlePlaces,doctorPhoto,handleImageChange,qualificationProof,loading}) => {
    const {name,email,mobileNumber,qualification,jobType,servingType,workTime,weekDays,address,state,city}=values
    const photoInputRef = useRef(null);
    const proofInputRef = useRef(null);
    return(
        <form  onSubmit={handleSubmit}>
        <div className={classes.RegisterForm_HInput}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={classes.RegisterForm_HInput}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={classes.RegisterForm_HInput}>
          <label>MobileNumber</label>
          <input
            type="number"
            name="mobileNumber"
            placeholder="Enter Your 10 digit Mobile Number"
            pattern="[1-9]{1}[0-9]{9}"
            value={mobileNumber}
            required
            readOnly
            onChange={handleChange}
          />
        </div>
        <div className={classes.RegisterForm_HInput}>
        <label>Qualification</label>
        <input type="text" name="qualification" placeholder="Enter your Qualification" value={qualification} required onChange={handleChange} />
        </div>
        <div className={classes.RegisterForm_HInput}>
        <label>Public or Private</label>
        <div className={classes.checkbox_field}>
        <div className={classes.Checkbox_label_input}>
        <input type="checkbox" checked={jobType=="public"} value={jobType=="public"}  onChange={()=>setValues({...values,jobType:"public"})} />
        <label>Public</label>
        </div>
        <div className={classes.Checkbox_label_input}>
        <input type="checkbox" checked={jobType=="private"} value={jobType=="private"} onChange={()=>setValues({...values,jobType:"private"})} />
        <label>Private</label>
        </div>
        </div>
        </div>
        <div className={classes.RegisterForm_HInput}>
        <label>Serving or Retired</label>
        <div className={classes.checkbox_field}>
        <div className={classes.Checkbox_label_input}>
        <input type="checkbox" checked={servingType=="serving"} value={servingType=="serving"} onChange={()=>setValues({...values,servingType:"serving"})} />
        <label>Serving</label>
        </div>
        <div className={classes.Checkbox_label_input}>
        <input type="checkbox" checked={servingType=="retired"} value={servingType=="retired"} onChange={()=>setValues({...values,servingType:"retired"})} />
        <label>Retired</label>
        </div>
        </div>
        </div>
        <div className={classes.RegisterForm_HInput}>
        <label>Full-time or Part-time</label>
        <div className={classes.checkbox_field}>
        <div className={classes.Checkbox_label_input}>
        <input type="checkbox" checked={workTime=="fulltime"} value={workTime=="fullTime"} onChange={()=>setValues({...values,workTime:"fulltime"})} />
        <label>Full time</label>
        </div>
        <div className={classes.Checkbox_label_input}>
        <input type="checkbox" checked={workTime=="parttime"} value={workTime=="partTime"} onChange={()=>setValues({...values,workTime:"partTime"})} />
        <label>Part time</label>
        </div>
        </div>
        </div>
        <div className={classes.RegisterForm_HInput}>
        <label>Available on days</label>
        {
          week && week.map((w,_)=>(
            <div key={w} className={classes.Checkbox_label_input}>
              <input type="checkbox" checked={weekDays.includes(w)} onChange={()=>{
                let days = [...weekDays]
                if(days.includes(w)){
                  days.splice(days.indexOf(w),1)
                }else{
                  days.push(w)
                }
                setValues({...values,weekDays:[...days]})
              }} />
              <label>{w}</label>
            </div>
          ))
        }
        </div>
        <div className={classes.RegisterForm_HInput}>
          <label>Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter doctor's Address"
            value={address}
            onChange={handleChange}
            required
          />
        </div>
        <div className={classes.RegisterForm_HInput}>
          <label>State</label>
          <div style={{ width: "70%" }}>
            <SearchInput
              category="states/India"
              value={state}
              name="state"
              handlePlaces={handlePlaces}
              placeholder="select State"
            />
          </div>
        </div>
        <div className={classes.RegisterForm_HInput}>
          <label>City</label>
          <div style={{ width: "70%" }}>
            <SearchInput
              category={state ? `cities/${state}` : false}
              value={city}
              name="city"
              handlePlaces={handlePlaces}
              placeholder="select City"
            />
          </div>
        </div>
        <div className={classes.RegisterForm_HInput}>
          <label>Photo</label>
          <Image
            width="100px"
            height="100px"
            src={doctorPhoto}
            className={classes.Image_form_add_doctor}
          />
          <Button
            inverted
            primary
            type="button"
            content="Image"
            icon="file"
            onClick={() => photoInputRef.current.click()}
            className={classes.add_doctor_img_btn}
          />
          <input
            type="file"
            name="photo"
            accept="image/jpeg"
            hidden={true}
            onChange={handleImageChange}
            ref={photoInputRef}
            required
          />
        </div>
        <div className={classes.RegisterForm_HInput}>
          <label>Qualification Proof</label>
          <Image
            width="100px"
            height="100px"
            src={qualificationProof}
            className={classes.Image_form_add_doctor}
          />
          <Button
            inverted
            primary
            type="button"
            content="Image"
            icon="file"
            onClick={() => proofInputRef.current.click()}
            className={classes.add_doctor_img_btn}
          />
          <input
            type="file"
            name="proof"
            accept="image/jpeg"
            hidden={true}
            onChange={handleImageChange}
            ref={proofInputRef}
            required
          />
        </div>
        <div style={{textAlign:"right"}}>
          <button
            disabled={loading}
            loading={loading ? "true" : "false"}
            type="submit"
            className={classes.Submit_btn_}
          >
            Submit
          </button>
        </div>
      </form>
    )
}
export default RegisterDoctorForm;