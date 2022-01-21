import {ILoginController} from "../models/ShoppingItems";

export default function LoginController(apiController: ILoginController): ILoginController {
    return {
        login: (username, password) => {
            return apiController.login(username, password).then(response => response)
        }

    }
}