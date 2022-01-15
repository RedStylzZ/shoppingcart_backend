import {IItems, IItemSetter, IListController, IListSetter, apiURL} from "../models/ShoppingItems";
import axios from "axios";

export default function ListController(): IListController {

    const apiGET = (setter: IListSetter | IItemSetter, url: string) => {
        axios.get(url).then(response => setter(response.data))
    }

    return {
        getLists: (setter ) => {
            apiGET(setter, `${apiURL}/lists`)
        },

        getListItems: (setter, listName: string) => {
            apiGET(setter, `${apiURL}/items/${listName}`)
        },

        setListItems: (setter, listName: string, items: IItems) => {
            axios.post(`${apiURL}/items/${listName}`, items)
                .then(response => setter(response.data))
        },

        addList: (setter,listName: string) => {
            axios.put(`${apiURL}/lists/`, {listName: listName, items: []})
                .then(response => setter(response.data))
        },

        removeList: (setter, listName: string) => {
            axios.delete(`${apiURL}/lists/${listName}`)
                .then(response => setter(response.data))
        }
    }
}