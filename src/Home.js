import { Fragment } from "react"
import { Services,Till_Now_Items } from "./FAQ_sample"
import ImageContainer from "./components/imageContainer/ImageContainer"
import HomeBackground from "./assets/Images/Home_consult.jpg"
import WhyUs from "./components/imageContainer/WhyUs"
import FaqContainer from "./components/imageContainer/FaqContainer"
import ServicesComponent from "./components/services/ServicesComponent"
import {Divider} from "semantic-ui-react"
import TillNow from "./components/imageContainer/TillNow"
const Home = () => {
    return (
        <Fragment>
        <ImageContainer imageName={HomeBackground} mainHeading="Hello there!" desc="In your Service 24 X 7" />
        <WhyUs />
        <Divider />
        <ServicesComponent services={Services} />
        <Divider />
        <TillNow workDone={Till_Now_Items} />
        <Divider/>
        <FaqContainer />
        </Fragment>
    )
}
export default Home