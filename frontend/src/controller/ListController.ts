import {ILists, IItems, STORAGE_KEY, IListController} from "../models/ShoppingItems";

export default function ListController(): IListController {
    let listItems: ILists = JSON.parse(localStorage.getItem(STORAGE_KEY)!) || {}

    const setList = (value: ILists) => {
        listItems = value
        localStorage.setItem(STORAGE_KEY, JSON.stringify(listItems))
    }

    return {
        getLists: () => ({...listItems}),
        getListItems: (listName: string) => ({...listItems[listName]}),
        setListItems: (listName: string, items: IItems) => {
            const temp = {...listItems}
            temp[listName] = items
            setList(temp)
            return {...listItems[listName]}
        },
        addList: (listName: string): ILists => {
            const temp = {...listItems}
            temp[listName] = {}
            setList(temp)
            return {...listItems}
        },
        removeList(listName: string): ILists {
            const temp: ILists = {...listItems}
            delete temp[listName]
            setList(temp)
            return {...listItems}
        }
    }
}