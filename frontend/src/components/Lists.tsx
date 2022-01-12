import {ILists, removeListFunc} from "../models/ShoppingItems";
import ListCard from "./ListCard";

export default function Lists(props: { lists: Promise<ILists[]>, removeList: removeListFunc }) {
    console.log("Meep")
    return (
        <>
            {
                Object.entries(props.lists)
                    .map((list, index) => {
                            console.log("Lists: ", list)
                            return <ListCard list={list[1]} remove={props.removeList} key={index}/>
                        }
                    )
            }
        </>
    )
}