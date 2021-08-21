import { Fragment } from "react";
import { Link } from "react-router-dom";
import classes from "./button.module.css";
const AuthButton = ({ text, to }) => {
  return (
    <Fragment>
      <Link to={to}>
        <button className={classes.signin_registerbtn}>{text}</button>
      </Link>
    </Fragment>
  );
};
export default AuthButton;
