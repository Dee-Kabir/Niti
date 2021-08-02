import classes from "./ImageContainer.module.css";
import { Link } from "react-router-dom";
import { Carousel } from "antd";
import { Image } from "semantic-ui-react";
import { isAuthenticated } from "../../actions/auth";
const ImageContainer = ({ imageName1,imageName2,imageName3, mainHeading, desc }) => {
  return (
    <div className={classes.imageContainer}>
      <Carousel className={classes.imageContainer_bg} autoplay>
        <Image
        className={classes.Carousel_Image}
          src={imageName1}
        />
        <Image
        className={classes.Carousel_Image}
          src={imageName2}
        />
        <Image
        className={classes.Carousel_Image}
          src={imageName3}
        />
      </Carousel>
      <div className={classes.imageContainer_bg_mask}></div>
      <div className={classes.ImageContainer_main_heading}>
        <span>{mainHeading}</span>
      </div>
      <div className={classes.ImageContainer_desc}>{desc}</div>
      {!isAuthenticated() && <div className={classes.ImageContainer_btns}>
      <Link to="/login/user" className={classes.ImageContainer_btn}>
          For Users 
      </Link>
      <Link
          to="/hospital-auth"
          className={classes.ImageContainer_btn}
      >
          For Organization
      </Link>
    </div>}
    </div>
  );
};
export default ImageContainer;
