import React, {FormEvent} from "react";

export const STORAGE_KEY: string = 'ts_shopping_cart'
// export type IItem = [string, number]
export interface IItem {
    itemName: string,
    itemCount: number
}

export interface IItems { items: IItem[] }

export type addItemsFunc = (event: FormEvent<HTMLFormElement> | IItem) => void
export type removeItemsFunc = (item: IItem, wholeItem: boolean) => void
export type changeItemFunc = (itemName: string) => void
export type removeListFunc = (listName: string) => void

export interface ItemsProps {
    items: IItem[],
    add: addItemsFunc,
    remove: removeItemsFunc,
    change: changeItemFunc
}

export interface IItemController {
    getItems: (setter: IItemSetter, listName: string) => void,
    addItem: (setter: IItemSetter, listName: string, newItem: string, quantity: number) => void,
    removeItem: (setter: IItemSetter, listName: string, item: string, count: boolean) => void,
    changeItem: (setter: IItemSetter, listName: string, oldName: string, newName: string) => void
}

export interface IList {
    id: string,
    listName: string,
    items: IItem[]
}

export type IListSetter = React.Dispatch<React.SetStateAction<IList[]>>
export type IItemSetter = React.Dispatch<React.SetStateAction<IItem[]>>


/*export interface IListController {
    getListItems: (list: string) => IItems,
    setListItems: (list: string, items: IItems) => IItems,
    getLists: (setter: ISetter) => IList[],
    addList: (name: string) => Promise<IList[]>
    removeList: (listName: string) => Promise<IList[]>
}*/

export interface IListController {
    getListItems: (setter: IItemSetter, listName: string) => void,
    setListItems: (setter: IItemSetter, listName: string, items: IItems) => void,
    getLists: (setter: IListSetter) => void,
    addList: (setter: IListSetter, listName: string) => void
    removeList: (setter: IListSetter, listName: string) => void
}