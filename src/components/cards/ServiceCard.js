import classes from "./cards.module.css";
const ServiceCard = ({ service }) => {
  return (
    <a href={service.link} className={classes.ServiceCard} target="_blank">
      <div className={classes.Service_title}>{service.title}</div>
      <div className={classes.Service_desc}>{service.desc}</div>
    </a>
  );
};
export default ServiceCard;
