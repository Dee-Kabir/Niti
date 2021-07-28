import { Fragment } from "react"
import { Link } from "react-router-dom"
import classes from "./Footer.module.css"
const Footer = () => {
    return (
        <Fragment>
        <div className={classes.Footer_block}>
        <div className={classes.Footer_menus}>
        <div className={classes.Footer_menu}>
        <div className={classes.Menu_heading}>Nitimed</div>
        <div className={classes.Menu_Item}><Link to="/" >About</Link></div>
        <div className={classes.Menu_Item}><Link to="/" >Careers</Link></div>
        <div className={classes.Menu_Item}><Link to="/" >contact Us</Link></div>
        </div>
        <div className={classes.Footer_menu}>
        <div className={classes.Menu_heading}>For users</div>
        <div className={classes.Menu_Item}><Link to="/" >Doctors</Link></div>
        <div className={classes.Menu_Item}><Link to="/" >Pharmacy</Link></div>
        <div className={classes.Menu_Item}><Link to="/" >Complaints</Link></div>
        </div>
        <div className={classes.Footer_menu}>
        <div className={classes.Menu_heading}>More</div>
        <div className={classes.Menu_Item}><Link to="/" >Help</Link></div>
        <div className={classes.Menu_Item}><Link to="/" >Terms & Conditions</Link></div>
        </div>
        <div className={classes.Footer_menu}>
        <div className={classes.Menu_heading}>Social</div>
        <div className={classes.Menu_Item}><Link to="/" >Twitter</Link></div>
        <div className={classes.Menu_Item}><Link to="/" >LinkedIn</Link></div>
        <div className={classes.Menu_Item}><Link to="/" >Github</Link></div>
        </div>
        </div>
        <div className={classes.Footer_logo}>
        Nitimed
        </div>
        <div className={classes.Footer_copyright}>
        Copyright © 2017, Nitimed. All rights reserved.
        </div>
        </div>
        </Fragment>
    )
}
export default Footer