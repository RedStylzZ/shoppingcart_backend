import {IListController, IList, IListSetter} from "../models/ShoppingItems";
import {FormEventHandler, useEffect, useState} from "react";
import Lists from "../components/Lists";
import './ListsPage.scss'

export default function ListsPage(props: { controller: IListController }) {
    const {controller} = props
    const [lists, setLists] = useState<IList[]>([])

    useEffect(() => {
        controller.getLists(setLists)
    }, [])

    const addList: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        console.log(event)
        // @ts-ignore
        controller.addList(setLists, event.currentTarget.elements[0].value);
        // @ts-ignore
        event.currentTarget.elements[0].value = ""
        console.log("Add-List: ", lists)
    }

    const removeList = (setter: IListSetter) => (listName: string) => {
        controller.removeList(setter, listName)
    }

    return (
        <div className={"lists"}>
            <form onSubmit={addList}>
                <input type={"text"} id={"textInput"}/>
                <input type={"submit"} value={"Submit"}/>
            </form>
            <div className={"Outer"}>
                <Lists lists={lists} removeList={removeList(setLists)}/>
            </div>
        </div>
    )
}