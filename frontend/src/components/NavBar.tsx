import {Link} from "react-router-dom";
import "./NavBar.scss"

export default function NavBar() {

    return (
        <div className={"navBar"}>
            <Link to={"/login"}>
                <input type="button" value={"Login"}/>
            </Link>
            <Link to={"/"}>
                <input type="button" value={"Lists"}/>
            </Link>
        </div>
    )
}