import {IItem, IItemController, IListController, apiURL} from "../models/ShoppingItems";
import axios from "axios";

export default function ItemController(listController: IListController): IItemController {
    const re: RegExp = new RegExp(/\s/g)

    const isValidName = (value: string): boolean => {
        return !!(value && !re.test(value))
    }

    return {
        getItems: (setter, listName) => (listController.getListItems(setter, listName)),
        addItem: (setter, listName, newItem, quantity) => {
            const item: IItem = {itemName: newItem, itemCount: quantity}
            axios.post(`${apiURL}/items/${listName}`, item).then(response => setter(response.data))
        },
        removeItem: (setter,listName, item, wholeItem) => {
            console.log("Meep:", item)
            axios.delete(`${apiURL}/items/${listName}?itemName=${item}&wholeItem=${wholeItem}`)
                .then((response) => setter(response.data))
        },
        changeItem: (setter,listName, oldName, newName) => {
            axios.post(`${apiURL}/items/${listName}?oldName=${oldName}&newName=${newName}`)
                .then((response) => setter(response.data))
            /*if (isValidName(newName) && !(newName === oldName)) {
                const temp: IItems = {...listController.getListItems(listName)}
                temp[newName] = temp[oldName]
                delete temp[oldName]
                setItems(temp, listName)
            }*/
        }
    };
}