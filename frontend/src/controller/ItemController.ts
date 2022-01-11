import {IItemController, IItems, IListController} from "../models/ShoppingItems";

export default function ItemController(listController: IListController): IItemController {
    const re: RegExp = new RegExp(/\s/g)

    const setItems = (value: IItems, listName: string) => {
        listController.setListItems(listName, value)
    }

    const isValidName = (value: string): boolean => {
        return !!(value && !re.test(value))
    }

    return {
        getItems: (listName): IItems => ({...listController.getListItems(listName)}),
        addItem: (listName, newItem, quantity): IItems => {
            if (isValidName(newItem)) {
                const temp: IItems = {...listController.getListItems(listName)}
                temp[newItem] = ((temp[newItem] ? temp[newItem] : 0) + parseInt(String(quantity)))
                setItems(temp, listName)
            }
            return {...listController.getListItems(listName)}
        },
        removeItem: (listName, item, wholeItem): IItems => {
            const temp: IItems = {...listController.getListItems(listName)}
            temp[item] <= 1 || wholeItem ? delete temp[item] : temp[item]--
            setItems(temp, listName)
            return {...listController.getListItems(listName)}
        },
        changeItem: (listName, oldName, newName): IItems => {
            if (isValidName(newName) && !(newName === oldName)) {
                const temp: IItems = {...listController.getListItems(listName)}
                temp[newName] = temp[oldName]
                delete temp[oldName]
                setItems(temp, listName)
            }
            return {...listController.getListItems(listName)}
        }
    };
}