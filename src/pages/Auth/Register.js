import { useEffect, useState } from "react";
import { Fragment } from "react";
import RegisterForm from "./RegisterForm";
import firebase from "../../firebase";
import { authenticateUser, register } from "../../actions/auth";
import ErrorComponent from "../../utilities/ErrorComponent";
import LoadingComponent from "../../utilities/LoadingComponent";
const Register = (props) => {
  const [values, setValues] = useState({
    name: "",
    mobileNumber: "",
    address: "",
    state: "",
    city: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { name, mobileNumber, address, state, city } = values;
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setError("");
  };
  useEffect(() => {
    checkmobileNUmber();
    return function clean() {
      localStorage.removeItem("mobileRegister");
    };
  }, []);
  const checkmobileNUmber = () => {
    let number_mo = localStorage.getItem("mobileRegister");
    if (number_mo) {
      setValues({
        ...values,
        mobileNumber: localStorage.getItem("mobileRegister").substr(3, 10),
      });
    } else {
      props.location.replace = "/login/user";
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formIsValid()) {
      setLoading(true);
      var id = props.match.params.userId;
      try {
        firebase.auth().onAuthStateChanged((user) => {
          if (user.uid === id)
            register({ name, mobileNumber, address, state, city, id: id }).then(
              () => {
                try {
                  authenticateUser(id, "user").then(() => {
                    localStorage.removeItem("mobileRegister");
                    setLoading(false);
                    setError("");
                    window.location.href = "/";
                  });
                } catch (err) {
                  setLoading(false);
                  setError("Connectivity Problem!!" && err.message);
                }
              }
            );
          else {
            props.history.replace("/dnjdfdf");
          }
        });
      } catch (err) {
        setLoading(false);
        setError("Connectivity Problem!!" && err.message);
      }
    }
  };
  const formIsValid = () => {
    if (!name) {
      setError("name is required");
      return false;
    } else if (mobileNumber.toString().length != 10) {
      setError("Valid mobileNumber is required");
      return false;
    } else if (address.length < 20) {
      setError("Enter at least 20 character long address");
    } else if (!state || !city) {
      setError("state and Name required");
    } else {
      return true;
    }
  };
  const handlePlaces = (data) => {
    setValues({ ...values, [data.category]: data.text });
  };
  return !loading ? (
    <Fragment>
      <ErrorComponent error={error} />
      <RegisterForm
        values={values}
        heading="Register for NitiMed"
        handlePlaces={handlePlaces}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Fragment>
  ) : (
    <LoadingComponent loading={loading} />
  );
};
export default Register;
