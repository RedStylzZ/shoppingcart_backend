import {IList, removeListFunc} from "../models/ShoppingItems";
import ListCard from "./ListCard";


export default function Lists(props: { lists: IList[], removeList: removeListFunc}) {
    if (props.lists == null && !Array.isArray(props.lists)) return null;
    return (
        <>
            {
                props.lists.map((list, index) =>
                    <ListCard list={list} remove={props.removeList} key={index}/>)
            }
        </>
    )
}