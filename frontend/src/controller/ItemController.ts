import {IItemController, IItems, IListController} from "../models/ShoppingItems";
import axios from "axios";

export default function ItemController(listController: IListController): IItemController {
    const re: RegExp = new RegExp(/\s/g)

    // const setItems = (value: IItems, listName: string) => {
    //     listController.setListItems(listName, value)
    // }

    const isValidName = (value: string): boolean => {
        return !!(value && !re.test(value))
    }

    return {
        getItems: (setter, listName) => (listController.getListItems(setter, listName)),
        addItem: (setter, listName, newItem, quantity) => {
            let temp: IItems
            axios.post(`/api/items/${listName}`).then((response) => temp = response.data)
            return temp!
            /*if (isValidName(newItem)) {
                const temp: IItems = {...listController.getListItems(listName)}
                temp[newItem] = ((temp[newItem] ? temp[newItem] : 0) + parseInt(String(quantity)))
                setItems(temp, listName)
            }*/
        },
        removeItem: (setter,listName, item, wholeItem) => {
            let temp: IItems
            axios.delete(`/api/items/${listName}`).then((response) => temp = response.data)
            return temp!
        },
        changeItem: (setter,listName, oldName, newName) => {
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