import TillNowCard from "../cards/TillNowCard";
import classes from "./ImageContainer.module.css"
const TillNow = ({workDone}) => {
    return(
        <div className={classes.TillNow}>
        <div className={classes.TillNow_Heading}>Achievements Till Now</div>
        <div className={classes.TillNow_items}>
        {
            workDone.map((work,_)=>(
                <TillNowCard key={work.title} service={work} />
            ))
        }
        </div>
        </div>
    )
}
export default TillNow;