import {IList, removeListFunc} from "../models/ShoppingItems";
import ListCard from "./ListCard";


/*const mapToCard = (listsPromise: IList[], removeList: removeListFunc) => {
    const lists: IList[] = listsPromise
    console.log("mapToCard:", lists)
    return (
        lists.map((list, index) => <ListCard list={list} remove={removeList} key={index}/>)
        /!*Object.entries(lists)
            .map((list, index) => {
                    // console.log("Lists: ", list[1])
                    return <ListCard list={list[1]} remove={removeList} key={index}/>
                }
            )*!/
    );
}*/

export default function Lists(props: { lists: IList[], removeList: removeListFunc}) {
    if (props.lists == null) return null;
    return (
        <>
            {
                props.lists.map((list, index) =>
                    <ListCard list={list} remove={props.removeList} key={index}/>)
            }
        </>
    )
}