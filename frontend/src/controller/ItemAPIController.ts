import axios from "axios";
import {IItemController, ITokenConfig} from "../models/ShoppingItems";

export default function ItemAPIController(config: ITokenConfig): IItemController {

    return {
        getItems: (listName) => {
            return axios.get(`/api/items/${listName}`, config)
                .then(response => response.data).catch(console.error)
        },
        addItem: (listName, newItem, quantity) => {
            return axios.put(`/api/items/${listName}`, {itemName: newItem, itemCount: quantity}, config)
                .then(response => response.data).catch(console.error)
        },
        removeItem: (listName, itemID, wholeItem) => {
            console.log("ID:", itemID)
            return axios.delete(`/api/items/${listName}?itemID=${itemID}&wholeItem=${wholeItem}`, config)
                .then(response => response.data).catch(console.error)
        },
        changeItem: (listName, itemID, newName) => {
            return axios.post(`/api/items/${listName}?itemID=${itemID}&newName=${newName}`, null, config)
                .then(response => response.data).catch(console.error)
        }
    };
}