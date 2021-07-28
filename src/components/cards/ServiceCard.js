import { Link } from "react-router-dom";
import classes from "./cards.module.css"
const ServiceCard = ({service}) => {
    return(
        <Link to={service.link} className={classes.ServiceCard}>
        <div className={classes.Service_title}>{service.title}</div>
        <div className={classes.Service_desc}>{service.desc}</div>
        </Link>
    )
}
export default ServiceCard;