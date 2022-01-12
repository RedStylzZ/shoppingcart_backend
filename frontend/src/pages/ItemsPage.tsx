import React, {ChangeEvent, FormEvent, useState} from "react";
import Items from "../components/Items";
import './ItemsPage.scss';
import {IItemController, IItem, IItems} from "../models/ShoppingItems";
import {useNavigate, useParams} from "react-router-dom";

interface ITextInput {
    quantityInput: { value: string }
    textInput: { value: string }
}


export default function ItemsPage(props: { controller: IItemController }) {
    const {controller} = props
    const params = useParams()
    const listName: string = params.name!
    const navigate = useNavigate()
    const [items, setItems] = useState<IItems>(controller.getItems(listName))
    const [quantityState, setQuantityState] = useState<number>(1)

    function instanceOfIItem(object: any): object is IItem {
        return 'itemName' in object
    }

    // : React.FormEventHandler<HTMLFormElement>
    const addItem = (event: FormEvent<HTMLFormElement> | IItem) => {
        // Jump in when button "Add" is being pressed
        if (instanceOfIItem(event)) {
            setItems(controller.addItem(listName, event.itemName, 1))
            // Jump in when Item is being added via form
        } else {
            event.preventDefault()
            const form = event.currentTarget
            const formElements = form.elements as typeof form.elements & ITextInput
            const textInputValue: string = formElements.textInput.value
            // const quantityInputValue: number = formElements.quantityInput.value as unknown as number
            textInputValue.length > 100 ? alert("Maximum 100 characters allowed") : setItems(controller.addItem(listName, textInputValue, quantityState))
            // @ts-ignore
            event.currentTarget.elements.textInput.value = ""
        }
    }

    const removeItem = (item: IItem, wholeItem: boolean) => {
        setItems(controller.removeItem(listName, item.itemName, wholeItem))
    }

    const quantityHandler = (event: ChangeEvent) => {
        event.preventDefault()
        const re = /^[0-9]+$/g
        // @ts-ignore
        setQuantityState(re.test(event.target.value) ? event.target.value : quantityState)
    }

    const changeItem = (itemName: string) => {
        navigate(`/changeItem/${listName}/${itemName}`)
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
                {/*<div className={"Inner"}>*/}
                <Items items={items} add={addItem} remove={removeItem} change={changeItem}/>
                {/*</div>*/}
            </div>
        </div>
    )
}