import {IList, IListController, TOKEN_KEY} from "../models/ShoppingItems";
import {FormEventHandler, useEffect, useState} from "react";
import Lists from "../components/Lists";
import './ListsPage.scss'
import ListController from "../controller/ListController";

export default function ListsPage() {
    const [lists, setLists] = useState<IList[]>([])
    const config = {headers: {Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`}}
    const controller: IListController = ListController(setLists, config)

    useEffect(() => {
        controller.getLists()
        //eslint-disable-next-line
    }, [])

    const addList: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        console.log(event)
        // @ts-ignore
        controller.addList(event.currentTarget.elements[0].value);
        // @ts-ignore
        event.currentTarget.elements[0].value = ""
        console.log("Add-List: ", lists)
    }

    const removeList = (listName: string) => {
        controller.removeList(listName)
    }

    return (
        <div className={"lists"}>
            <form onSubmit={addList}>
                <input type={"text"} id={"textInput"}/>
                <input type={"submit"} value={"Submit"}/>
            </form>
            <div className={"Outer"}>
                <Lists lists={lists} removeList={removeList}/>
            </div>
        </div>
    )
}