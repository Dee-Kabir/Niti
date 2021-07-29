import health from "../../assets/Images/home.png"
import ImageContainer from "../imageContainer/ImageContainer"
import { Fragment } from "react"
import ServicesComponent from "../services/ServicesComponent"
import { Services } from "../../FAQ_sample"
import { Divider } from "antd"
import SelectLiveStocks from "../livestocksForm/SelectLiveStocks"
const HealthServices = () => {
    return(
        <Fragment>
        <ImageContainer imageName={health} mainHeading="Health services for your livestocks" desc="Get most of the health services at just one platform"/>
        <ServicesComponent services={Services} />
        <Divider />
        <SelectLiveStocks />
        </Fragment>
    )
}
export default HealthServices;