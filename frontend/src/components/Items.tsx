import ItemCard from "./ItemCard";
import {addItemsFunc, changeItemFunc, IItem, ItemsProps, removeItemsFunc} from "../models/ShoppingItems";

// interface IMapToCards {
//     item: IItem
//     index: number
//     add: addItemsFunc
//     remove: removeItemsFunc
//     change: changeItemFunc
// }

const mapItemToCards: (item: IItem,
                       index: number,
                       add: addItemsFunc,
                       remove: removeItemsFunc,
                       change: changeItemFunc) => JSX.Element =
    (item, index, add, remove, change) => {
        return <ItemCard item={item} key={index} add={add} remove={remove} change={change}/>
    }

export default function Items(props: ItemsProps) {
    return (
        <>
            {
                Object.entries(props.items.items!)
                    .map((item, index) => mapItemToCards(item[1], index, props.add, props.remove, props.change))
            }
        </>
    )
}