import {FAQs} from "../../FAQ_sample"
import Question from "./Question"
import classes from "./Questions.module.css"
const FaqContainer = () => {
    const Questions = [...FAQs]
    return(
        <div className={classes.Faq}>
        <h1 className={classes.Faq_Heading}>Frequently Asked Questions?</h1>
            {
                Questions.map((ques,i)=>(
                    <Question ques={ques} key={i} />
                ))
            }
        </div>
    )
}
export default FaqContainer