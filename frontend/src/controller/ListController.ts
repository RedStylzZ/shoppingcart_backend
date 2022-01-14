import {IList, IItems, STORAGE_KEY, IListController} from "../models/ShoppingItems";
import axios from "axios";
import React from "react";

export default function ListController(): IListController {
    let listItems: IList[] = []
    const apiURL: string = "http://localhost:5000/api"

    const setList = (value: IList[]) => {
        listItems = value
        localStorage.setItem(STORAGE_KEY, JSON.stringify(listItems))
    }

    async function apiGET(url: string): Promise<any> {
        return await (await axios.get(url)).data
    }

    return {
        // getLists: () => ({...listItems}),
        getLists: (setter ) => {
            // axios.get('http://localhost:5000/api/lists').then(response => listItems = response.data)
            axios.get(`${apiURL}/lists`).then(response => setter(response.data))
        },
        getListItems: (setter, listName: string) => {
            axios.get(`${apiURL}/items/${listName}`).then(response => setter(response.data))
        },

        setListItems: (setter, listName: string, items: IItems) => {
            axios.post(`${apiURL}/items/${listName}`).then(response => setter(response.data))
        },
        addList: (setter,listName: string) => {
            axios.put(`${apiURL}/lists/${listName}`).then(response => setter(response.data))
        },
        removeList: (setter, listName: string) => {
            axios.delete(`${apiURL}/lists/${listName}`).then(response => setter(response.data))
        }
    }
}