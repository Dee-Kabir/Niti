import ServiceCard from "../cards/ServiceCard";
import classes from "./services.module.css"
const ServicesComponent = ({services}) => {
    return(<div className={classes.services_box}>
        <h1 className={classes.Services_heading}>Our Services</h1>
        <div className={classes.Services}>
        {services.map((service,_)=>
            <ServiceCard key={service.title} service={service} />
        )}
        </div>
        </div>
    )
}
export default ServicesComponent;