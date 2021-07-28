import classes from "./HeaderItem.module.css"
import {Link, useHistory} from "react-router-dom"
import { headercontext } from "../../context/headercontext";
import { useContext } from "react";
const HeaderItem = (props) => {
    const {itemHeading, itemDesc,to,active} = props;
    const history = useHistory()
    const headerContext = useContext(headercontext)
    const handleHeaderClick = (to) => () =>{
        headerContext.headerActive = history.location.pathname.substr(1)
    }
    return(
        
        <div className={classes.HeaderItem_block}>
        <div className={classes.HeaderItem_Link}>
        <Link to={to} onClick={handleHeaderClick(to)}>
        <div className={classes.HeaderItem_heading}>{itemHeading}</div>
        <div className={classes.HeaderItem_dec}>{itemDesc}</div>
        <div className={headerContext.headerActive === active ? classes.HeaderItem_active: ""}></div>
        </Link>
        </div>
        </div>
       
    )
}
export default HeaderItem