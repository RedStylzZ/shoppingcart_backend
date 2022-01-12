import {IItemController, IItems, IListController} from "../models/ShoppingItems";
import axios from "axios";

export default function ItemController(listController: IListController): IItemController {
    const re: RegExp = new RegExp(/\s/g)

    const setItems = (value: IItems, listName: string) => {
        listController.setListItems(listName, value)
    }

    const isValidName = (value: string): boolean => {
        return !!(value && !re.test(value))
    }

    return {
        getItems: (listName): IItems => (listController.getListItems(listName)),
        addItem: (listName, newItem, quantity): IItems => {
            let temp: IItems
            axios.post(`/api/items/${listName}`).then((response) => temp = response.data)
            return temp!
            /*if (isValidName(newItem)) {
                const temp: IItems = {...listController.getListItems(listName)}
                temp[newItem] = ((temp[newItem] ? temp[newItem] : 0) + parseInt(String(quantity)))
                setItems(temp, listName)
            }*/
        },
        removeItem: (listName, item, wholeItem): IItems => {
            let temp: IItems
            axios.delete(`/api/items/${listName}`).then((response) => temp = response.data)
            return temp!
        },
        changeItem: (listName, oldName, newName): IItems => {
            let temp: IItems
            axios.post(`/api/items/${listName}`).then((response) => temp = response.data)
            return temp!
            /*if (isValidName(newName) && !(newName === oldName)) {
                const temp: IItems = {...listController.getListItems(listName)}
                temp[newName] = temp[oldName]
                delete temp[oldName]
                setItems(temp, listName)
            }*/
        }
    };
}