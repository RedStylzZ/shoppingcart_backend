import React, {FormEvent} from "react";

// export const STORAGE_KEY: string = "process.env.NODE_ENV"
// export const apiURL: string = process.env.NODE_ENV === "development" ? "http://localhost:8080/api" : "/api"

// export type IItem = [string, number]
export interface IItem {
    id?: string,
    itemName: string,
    itemCount: number
}

export type addItemsFunc = (event: FormEvent<HTMLFormElement> | IItem) => void
export type removeItemsFunc = (itemID: string, wholeItem: boolean) => void
export type changeItemFunc = (itemName: string) => void
export type removeListFunc = (listName: string) => void

export interface ItemsProps {
    items: IItem[],
    add: addItemsFunc,
    remove: removeItemsFunc,
    change: changeItemFunc
}

/*export interface IItemAPIController {
    getItems: (listName: string) => Promise<IItem[]>,
    addItem: (listName: string, newItem: string, quantity: number) => Promise<IItem[]>,
    removeItem: (listName: string, itemID: string, wholeItem: boolean) => Promise<IItem[]>,
    changeItem: (listName: string, itemID: string, newName: string) => Promise<IItem[]>
}*/

export interface IItemController {
    getItems: (listName: string) => Promise<IItem[]> | void,
    addItem: (listName: string, newItem: string, quantity: number) => Promise<IItem[]> | void,
    removeItem: (listName: string, itemID: string, wholeItem: boolean) => Promise<IItem[]> | void,
    changeItem: (listName: string, itemID: string, newName: string) => Promise<IItem[]> | void
}

export interface ILoginController {
    login: (username: string, password: string) => Promise<string>
}

export interface IList {
    id: string,
    listName: string,
    items: IItem[]
}

export type IListSetter = React.Dispatch<React.SetStateAction<IList[]>>
export type IItemSetter = React.Dispatch<React.SetStateAction<IItem[]>>
export type ITokenSetter = React.Dispatch<React.SetStateAction<string>>
export interface IListController {
    getLists: () => Promise<IList[]> | void
    addList: (listName: string) => Promise<IList[]> | void
    removeList: (listName: string) => Promise<IList[]> | void
}

/*export interface IListAPIController {
    // getListItems: (listName: string) => Promise<IList[]>,
    // setListItems: (setter: IItemSetter, listName: string, items: IItems) => void,
    getLists: () => Promise<IList[]>,
    addList: (listName: string) => Promise<IList[]>
    removeList: (listName: string) => Promise<IList[]>
}*/
