import {ILists, removeListFunc} from "../models/ShoppingItems";
import ListCard from "./ListCard";

export default function Lists(props: { lists: ILists, removeList: removeListFunc }) {
    return (
        <>
            {
                Object.entries(props.lists)
                    .map((list, index) =>
                        <ListCard list={list} remove={props.removeList} key={index}/>
                    )
            }
        </>
    )
}