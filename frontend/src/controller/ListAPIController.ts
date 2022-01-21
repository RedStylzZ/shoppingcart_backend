import {IListController} from "../models/ShoppingItems";
import axios from "axios";

export default function ListAPIController(): IListController {

    return {
        getLists: () => {
            return axios.get(`/api/lists`)
                .then(response => response.data).catch(console.error)
        },

        addList: (listName) => {
            return axios.put(`/api/lists/`, {listName: listName, items: []})
                .then(response => response.data).catch(console.error)
        },

        removeList: (listName) => {
            return axios.delete(`/api/lists/${listName}`)
                .then(response => response.data).catch(console.error)
        }
    }
}