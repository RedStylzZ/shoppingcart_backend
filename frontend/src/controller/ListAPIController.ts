import {IListController, ITokenConfig} from "../models/ShoppingItems";
import axios from "axios";

export default function ListAPIController(config: ITokenConfig): IListController {

    return {
        getLists: () => {
            return axios.get(`/api/lists`, config)
                .then(response => response.data).catch(console.error)
        },

        addList: (listName) => {
            return axios.put(`/api/lists/`, {listName: listName, items: []}, config)
                .then(response => response.data).catch(console.error)
        },

        removeList: (listName) => {
            return axios.delete(`/api/lists/${listName}`, config)
                .then(response => response.data).catch(console.error)
        }
    }
}