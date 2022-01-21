import axios from "axios";
import {IItemController} from "../models/ShoppingItems";

export default function ItemAPIController(): IItemController {
    return {
        getItems: (listName) => {
            return axios.get(`/api/items/${listName}`)
                .then(response => response.data).catch(console.error)
        },
        addItem: (listName, newItem, quantity) => {
            return axios.put(`/api/items/${listName}`, {itemName: newItem, itemCount: quantity})
                .then(response => response.data).catch(console.error)
        },
        removeItem: (listName, itemID, wholeItem) => {
            console.log("ID:", itemID)
            return axios.delete(`/api/items/${listName}?itemID=${itemID}&wholeItem=${wholeItem}`)
                .then(response => response.data).catch(console.error)
        },
        changeItem: (listName, itemID, newName) => {
            return axios.post(`/api/items/${listName}?itemID=${itemID}&newName=${newName}`)
                .then(response => response.data).catch(console.error)
        }
    };
}