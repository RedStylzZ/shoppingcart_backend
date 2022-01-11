import {IListController, ILists} from "../models/ShoppingItems";
import {FormEventHandler, useState} from "react";
import Lists from "../components/Lists";
import './ListsPage.scss'

export default function ListsPage(props: { controller: IListController }) {
    const {controller} = props
    const [lists, setLists] = useState<ILists>(controller.getLists())

    const addList: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        // @ts-ignore
        setLists(controller.addList(event.currentTarget.elements[0].value));
        // @ts-ignore
        event.currentTarget.elements[0].value = ""
        console.log(lists)
    }

    const removeList = (listName: string) => {
        setLists(controller.removeList(listName))
    }

    return (
        <div className={"lists"}>
            <form onSubmit={addList}>
                <input type={"text"}/>
                <input type={"submit"} value={"Submit"}/>
            </form>
            <div className={"Outer"}>
                <Lists lists={lists} removeList={removeList}/>
            </div>
        </div>
    )
}