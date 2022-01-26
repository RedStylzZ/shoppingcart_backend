import {useNavigate, useParams} from "react-router-dom";
import React, {FormEvent} from "react";
import {IItemController, TOKEN_KEY} from "../models/ShoppingItems";
import ItemController from "../controller/ItemController";

export default function ChangeItem() {
    const config = {headers: {Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`}}
    const controller: IItemController = ItemController(config)
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
        controller.changeItem(listName, itemID, textInput).then(() => navigate(`/lists/${listName}`))
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