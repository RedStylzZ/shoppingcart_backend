import {IList, IListController, IToken} from "../models/ShoppingItems";
import {FormEventHandler, useEffect} from "react";
import Lists from "../components/Lists";
import './ListsPage.scss'
import {useNavigate} from "react-router-dom";

export default function ListsPage(props: { controller: IListController, lists: IList[], token: IToken }) {
    const {controller, lists, token} = props
    const navigate = useNavigate()
    if (!token) navigate("/login")

    useEffect(() => {
        controller.getLists()
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