import {ILoginController} from "../models/ShoppingItems";
import axios from "axios";

export default function LoginService(): ILoginController {
    return {
        login: (username, password) => {
            return axios.post("/auth/login",
                {username: username, password: password})
                .then(response => response.data);
        }
    }
}