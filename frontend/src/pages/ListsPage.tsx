import {IListController, IList, IListSetter} from "../models/ShoppingItems";
import {FormEventHandler, useEffect, useState} from "react";
import Lists from "../components/Lists";
import './ListsPage.scss'
import axios from "axios";

interface ITextInput {
    textInput: { value: string }
}

export default function ListsPage(props: { controller: IListController }) {
    const {controller} = props

    // const [lists, setLists] = useState( ()  => {
    //     console.log("Lists")
    //     return controller.getLists()
    // })

    const [lists, setLists] = useState<IList[]>([])


    useEffect(() => {
        // axios.get('http://localhost:5000/api/lists').then(response => setLists(response.data));
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

    /*const removeList = (listName: string) => {
        controller.removeList(setLists, listName)
    }*/

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