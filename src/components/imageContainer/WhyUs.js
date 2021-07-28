import classes from "./Questions.module.css"
const WhyUs = () => {
    return(
        <div className={classes.WhyUs_Container} >
        <div className={classes.Faq_Heading}>Why Nitimed?</div>
        <div className={classes.WhyUs_block}>
        <div className={classes.WhyUs_point}>Round the clock doctor availability</div>
        <div className={classes.WhyUs_point}>Specialised Doctors</div>
        <div className={classes.WhyUs_point}>Order Medicine</div>
        <div className={classes.WhyUs_point}>Many Other</div>
        </div>
        </div>
    )
}
export default WhyUs;