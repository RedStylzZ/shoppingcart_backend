import {ILoginController, ITokenSetter} from "../models/ShoppingItems";

export default function LoginController(apiController: ILoginController): ILoginController {
    return <ILoginController>{
        login: (username, password) => {
            apiController.login(username, password).then(response => response)
        }

    }
}