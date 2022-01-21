import {ILoginController, ITokenSetter} from "../models/ShoppingItems";
import React, {FormEvent} from "react";
import {useNavigate} from "react-router-dom";

export default function LoginPage(props: {controller: ILoginController, setter: ITokenSetter}) {
    const {controller, setter} = props
    const navigate = useNavigate()

    interface ITextInput {
        username: { value: string }
        password: { value: string }
    }

    const login: React.FormEventHandler<HTMLFormElement> = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        const formElements = form.elements as typeof form.elements & ITextInput
        const username: string = formElements.username.value.trim()
        const password: string = formElements.password.value.trim()

        if ((username && username.length > 0) && (password && password.length > 0)) {
            controller.login(username, password).then(token => {
                setter(token)
                navigate("/lists")
            })
        }
    }

    return (
        <div className={"ChangePage"}>
            <h1>{"Login"}</h1>
            <form onSubmit={login}>
                <input type="text" id={"username"}/>
                <input type="password" id={"password"}/>
                <input type="submit" value={"Submit"}/>
            </form>
        </div>
    )
}