import {ILoginController} from "../models/ShoppingItems";
import LoginService from "../services/LoginService";

export default function LoginController(): ILoginController {

    const apiController = LoginService()

    return {
        login: (username, password) => {
            return apiController.login(username, password).then(response => response)
        }

    }
}