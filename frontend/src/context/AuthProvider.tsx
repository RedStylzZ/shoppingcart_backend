import React, {createContext, ReactElement, useEffect, useState} from "react";
import jwt_decode from 'jwt-decode'
import {TOKEN_KEY} from "../models/ShoppingItems";

export interface IAuthContext {
    token?: string,
    jwtDecoded?: { sub?: string },
    setJwt: (jwt: string) => void
}

export const AuthContext = createContext<IAuthContext>({
    setJwt: () => {
        throw new Error("Login not initialized")
    }
})

export default function AuthProvider({children}: { children: ReactElement<any, any> }) {

    const [token, setToken] = useState<string>(localStorage.getItem(TOKEN_KEY) || "")
    const [jwtDecoded, setJwtDecoded] = useState({})

    useEffect(() => {
        if (token !== "") {
            localStorage.setItem(TOKEN_KEY, token)
        }
    }, [token])

    const setJwt = (jwt: string) => {
        console.log(jwt)
        setToken(jwt)
        setJwtDecoded(jwt_decode(jwt.toString()))
    }

    return (
        <AuthContext.Provider value={{token, jwtDecoded, setJwt}}>
            {children}
        </AuthContext.Provider>
    )
}