import { Fragment, useRef } from "react";
import { Button, Image } from "semantic-ui-react";
import SearchInput from "../components/search/SearchInput";
import classes from "./RegisterHospital.module.css";
const AddDoctorForm = (props) => {
  const {
    preview,
    handleChange,
    setPreview,
    values,
    handleSubmit,
    handlePlaces
  } = props;
  const { name, email, mobileNumber, loading, speciality,address,state,city } = values;
  const fileInputRef = useRef(null);
  return (
      
      <div className={classes.RegisterForm_Block}> 
      <form
          onSubmit={handleSubmit}
        >
          <div className={classes.Heading_Add_doctor}>
            Add doctor to NitiMed
          </div>
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
              onChange={handleChange}
            />
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
        <div style={{width: '70%'}}>
        <SearchInput category="states/India" value={state}  name="state" handlePlaces={handlePlaces} placeholder="select State" />
        </div>
        </div>
        <div className={classes.RegisterForm_HInput}>
        <label>City</label>
        <div style={{width: '70%'}}>
        <SearchInput category={state ? `cities/${state}` : false} value={city}  name="city" handlePlaces={handlePlaces} placeholder="select City" />
        </div>
        </div>
            <div className={classes.RegisterForm_HInput}>
              <label>
                Profile Image
              </label>
              <Image
                width="200px"
                height="200px"
                src={preview}
                className={classes.Image_form_add_doctor}
              />
              <Button
                inverted
                primary
                type="button"
                content="Image"
                icon="file"
                onClick={() => fileInputRef.current.click()}
                className={classes.add_doctor_img_btn}
              />
              <input
                type="file"
                name="photo"
                accept="image/jpeg"
                hidden={true}
                onChange={setPreview}
                ref={fileInputRef}
                required
              />
            </div>
          <div className={classes.Submit_btn_}>
            <button disabled={loading} loading={loading ? 'true':'false'} type="submit">
              Submit
            </button>
          </div>
        </form>
        </div> 
      
  );
};
export default AddDoctorForm;
