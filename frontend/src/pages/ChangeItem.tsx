import {useNavigate, useParams} from "react-router-dom";
import React, {FormEvent} from "react";
import {IItemController} from "../models/ShoppingItems";

export default function ChangeItem(props: {controller: IItemController}) {
    const {controller} = props
    const params = useParams()
    const navigate = useNavigate()
    const itemID: string = params.id!
    const listName: string = params.listName!

    const changeItem: React.FormEventHandler<HTMLFormElement> = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // @ts-ignore
        // controller.changeItem(listName, itemName, event.target.elements[0].value)
        // axios.post(`${apiURL}/items/${listName}?itemID=${itemID}&newName=${event.target.elements[0].value}`)
        //     .then((response) => console.log(response.data));
        // @ts-ignore
        controller.changeItem(listName, itemID, event.target.elements[0].value)

        navigate(`/lists/${listName}`)
    }

    return (
        <div className={"ChangePage"}>
            <h1>{itemID}</h1>
            <form onSubmit={changeItem}>
                <input type="text"/>
                <input type="submit" value={"Submit"}/>
            </form>
        </div>
    )
}