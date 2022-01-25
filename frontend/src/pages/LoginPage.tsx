import {ILoginController,} from "../models/ShoppingItems";
import React, {ChangeEvent, FormEvent, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthProvider";

interface ITextInput {
    username: { value: string }
    password: { value: string }
}

export default function LoginPage(props: { controller: ILoginController }) {
    const {controller} = props
    const navigate = useNavigate()

    const [name, setName] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const {setJwt} = useContext(AuthContext)

    const login = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        const formElements = form.elements as typeof form.elements & ITextInput
        const formUsername: string = formElements.username.value.trim()
        const formPassword: string = formElements.password.value.trim()

        if ((formUsername && formUsername.length > 0) && (formPassword && formPassword.length > 0)) {
            controller.login(formUsername, formPassword)
                .then(token => {
                    setJwt(token)
                    navigate("/lists")
                })
                .catch(console.error)
        }
    }

    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)
    const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)


    return (
        <div className={"ChangePage"}>
            <h1>{"Login"}</h1>
            <form onSubmit={login}>
                <input type="text" id={"username"} onChange={onNameChange} value={name}/>
                <input type="password" id={"password"} onChange={onPasswordChange} value={password}/>
                <input type="submit" value={"Submit"}/>
            </form>
        </div>
    )
}