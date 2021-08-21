import classes from "./HeaderItem.module.css";
import { Link } from "react-router-dom";
const HeaderItem = (props) => {
  const { itemHeading, itemDesc, to, active } = props;
  return (
    <div className={classes.HeaderItem_block}>
      <div className={classes.HeaderItem_Link}>
        <Link to={to} >
          <div className={classes.HeaderItem_heading}>{itemHeading}</div>
          <div className={classes.HeaderItem_dec}>{itemDesc}</div>
        </Link>
      </div>
    </div>
  );
};
export default HeaderItem;
