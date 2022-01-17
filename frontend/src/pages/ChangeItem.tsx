import {useNavigate, useParams} from "react-router-dom";
import React from "react";
import {IItemController, IItemSetter} from "../models/ShoppingItems";

export default function ChangeItem(props: { controller: IItemController}) {
    const {controller} = props
    const params = useParams()
    const navigate = useNavigate()
    const itemName: string = params.name!
    const listName: string = params.listName!

    const changeItem: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        // @ts-ignore
        controller.changeItem(listName, itemName, event.target.elements[0].value)
        navigate(`/lists/${listName}`)
    }

    return (
        <div className={"ChangePage"}>
            <h1>{itemName}</h1>
            <form onSubmit={changeItem}>
                <input type="text"/>
                <input type="submit" value={"Submit"}/>
            </form>
        </div>
    )
}