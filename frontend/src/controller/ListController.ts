import {ILists, IItems, STORAGE_KEY, IListController} from "../models/ShoppingItems";
import axios from "axios";

export default function ListController(): IListController {
    let listItems: ILists[] = []

    const setList = (value: ILists[]) => {
        listItems = value
        localStorage.setItem(STORAGE_KEY, JSON.stringify(listItems))
    }

    async function apiGET(url: string): Promise<any> {
        return await (await axios.get(url)).data
    }

    return {
        // getLists: () => ({...listItems}),
        getLists: async () => {
            const response = await axios.get('http://localhost:5000/api/lists')
            listItems = response.data
            console.log("Get-Lists-Response: ", listItems)
            return [...listItems]
        },
        getListItems: (listName: string) => {
            let items: IItems
            axios.get(`/api/items/${listName}`).then((response) => items = response.data)
            // turtle = await apiGET(`/api/items/${listName}`)
            return items!
        },

        setListItems: (listName: string, items: IItems) => {
            let temp: IItems
            axios.post(`/api/items/${listName}`).then((response) => temp = response.data)
            return temp!
        },
        addList: async (listName: string) => {
            let temp: ILists[]
            const response = await axios.put(`/api/lists/${listName}`)
            return [...response.data]
        },
        removeList: async (listName: string) => {
            let temp: ILists[]
            const response = await axios.delete(`/api/lists/${listName}`)
            return [...response.data]
        }
    }
}