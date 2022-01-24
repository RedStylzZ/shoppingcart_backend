import {useNavigate, useParams} from "react-router-dom";
import React, {FormEvent} from "react";
import {IItemController} from "../models/ShoppingItems";

export default function ChangeItem(props: {controller: IItemController}) {
    const {controller} = props
    const navigate = useNavigate()
    const params = useParams()
    const itemID: string = params.id!
    const listName: string = params.listName!

    interface ITextInput {
        textInput: { value: string }
    }

    const changeItem: React.FormEventHandler<HTMLFormElement> = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        const formElements = form.elements as typeof form.elements & ITextInput
        const textInput: string = formElements.textInput.value.trim()
        controller.changeItem(listName, itemID, textInput)
        navigate(`/lists/${listName}`)
    }

    return (
        <div className={"ChangePage"}>
            <h1>{itemID}</h1>
            <form onSubmit={changeItem}>
                <input type="text" id={"textInput"}/>
                <input type="submit" value={"Submit"}/>
            </form>
        </div>
    )
}