import {Link} from "react-router-dom";

export default function NavBar() {

    return (
        <div>
            <Link to={"/"}>
                <input type="button" value={"Lists"}/>
            </Link>
        </div>
    )
}