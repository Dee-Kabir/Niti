import { Link } from "react-router-dom";
import classes from "./cards.module.css"
const TillNowCard = ({service}) => {
    return(
        <Link to={service.link} className={classes.TillNowCard}>
        <div className={classes.TillNow_title}>{service.title}</div>
        <div className={classes.TillNow_desc}>{service.desc}</div>
        </Link>
    )
}
export default TillNowCard;