import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import Items from "../components/Items";
import './ItemsPage.scss';
import {IItem, IItemController} from "../models/ShoppingItems";
import {useNavigate, useParams} from "react-router-dom";

interface ITextInput {
    quantityInput: { value: string }
    textInput: { value: string }
}

export default function ItemsPage(props: { controller: IItemController, items: IItem[] }) {
    const {controller, items} = props
    const navigate = useNavigate()

    const params = useParams()
    const listName: string = params.name!
    const [quantityState, setQuantityState] = useState<number>(1)

    useEffect(() => {
        controller.getItems(listName)
    }, [listName])

    function instanceOfIItem(object: any): object is IItem {
        return 'itemName' in object
    }

    const addItem = (event: FormEvent<HTMLFormElement> | IItem) => {
        // Jump in when button "Add" is being pressed
        if (instanceOfIItem(event)) {
            controller.addItem(listName, event.itemName, 1)
            // Jump in when Item is being added via form
        } else {
            event.preventDefault()
            const form = event.currentTarget
            const formElements = form.elements as typeof form.elements & ITextInput
            const textInputValue: string = formElements.textInput.value
            textInputValue.length > 100 ?
                alert("Maximum 100 characters allowed") :
                controller.addItem(listName, textInputValue, quantityState)
            // @ts-ignore
            event.currentTarget.elements.textInput.value = ""
        }
    }

    const removeItem = (itemID: string, wholeItem: boolean) => {
        controller.removeItem(listName, itemID, wholeItem)
    }

    const changeItem = (itemName: string) => {
        console.log("Turtle")
        navigate(`/changeItem/${listName}/${itemName}`)
    }

    const quantityHandler = (event: ChangeEvent) => {
        event.preventDefault()
        const re = /^[0-9]+$/g
        // @ts-ignore
        setQuantityState(re.test(event.target.value) ? event.target.value : quantityState)
    }

    return (
        <div className={"ItemsPage"}>
            <h1>Einkaufsliste</h1>
            <h2>{listName}</h2>
            <form onSubmit={addItem}>
                <input type={"number"} placeholder={"1"} onChange={quantityHandler} value={quantityState}
                       id={"quantityInput"}/>
                <input type={"textarea"} id={"textInput"}/>
                <input type={"submit"} value={"Senden"}/>
            </form>
            <div className={"Outer"}>
                <Items items={items} add={addItem} remove={removeItem}
                       change={changeItem}/>
            </div>
        </div>
    )
}

