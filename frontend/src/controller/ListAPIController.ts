import {apiURL, IListController} from "../models/ShoppingItems";
import axios from "axios";

export default function ListAPIController(): IListController {

    return {
        getLists: () => {
            return axios.get(`${apiURL}/lists`)
                .then(response => response.data).catch(console.error)
        },

        addList: (listName) => {
            return axios.put(`${apiURL}/lists/`, {listName: listName, items: []})
                .then(response => response.data).catch(console.error)
        },

        removeList: (listName) => {
            return axios.delete(`${apiURL}/lists/${listName}`)
                .then(response => response.data).catch(console.error)
        }
    }
}