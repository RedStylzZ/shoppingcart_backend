import {IItem, IItemController, IListController, apiURL} from "../models/ShoppingItems";
import axios from "axios";

export default function ItemController(listController: IListController): IItemController {
    return {
        getItems: (setter, listName) => listController.getListItems(setter, listName),
        addItem: (setter, listName, newItem, quantity) => {
            axios.put(`${apiURL}/items/${listName}`, {itemName: newItem, itemCount: quantity})
                .then(response => setter(response.data))
        },
        removeItem: (setter,listName, item, wholeItem) => {
            console.log("ID:",item.id)
            axios.delete(`${apiURL}/items/${listName}?itemID=${item.id}&wholeItem=${wholeItem}`)
                .then((response) => setter(response.data))
        },
        changeItem: (setter,listName, item, newName) => {
            axios.post(`${apiURL}/items/${listName}?newName=${newName}`, item)
                .then(() => console.log())
        }
    };
}