import {ILoginController} from "../models/ShoppingItems";
import LoginAPIController from "./LoginAPIController";

export default function LoginController(): ILoginController {

    const apiController = LoginAPIController()

    return {
        login: (username, password) => {
            return apiController.login(username, password).then(response => response)
        }

    }
}