import {IItems, IItemSetter, IListController, IListSetter} from "../models/ShoppingItems";
import axios from "axios";

export default function ListController(): IListController {
    const apiURL: string = "http://localhost:5000/api"

    const apiGET = (setter: IListSetter | IItemSetter, url: string) => {
        axios.get(url).then(response => setter(response.data))
    }

    return {
        getLists: (setter ) => {
            // axios.get(`${apiURL}/lists`).then(response => setter(response.data))
            apiGET(setter, `${apiURL}/lists`)
        },

        getListItems: (setter, listName: string) => {
            // axios.get(`${apiURL}/items/${listName}`).then(response => setter(response.data))
            apiGET(setter, `${apiURL}/items/${listName}`)
        },

        setListItems: (setter, listName: string, items: IItems) => {
            axios.post(`${apiURL}/items/${listName}`, items).then(response => setter(response.data))
        },

        addList: (setter,listName: string) => {
            console.log(listName)
            axios.put(`${apiURL}/lists/`, {listName: listName, items: []}).then(response => setter(response.data))
        },

        removeList: (setter, listName: string) => {
            axios.delete(`${apiURL}/lists/${listName}`).then(response => setter(response.data))
        }
    }
}