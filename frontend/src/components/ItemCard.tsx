import {addItemsFunc, changeItemFunc, IItem, removeItemsFunc} from "../models/ShoppingItems";
import './ItemCard.scss'

interface ItemCardProps {
    item: IItem
    add: addItemsFunc
    remove: removeItemsFunc
    change: changeItemFunc
}

export default function ItemCard(props: ItemCardProps) {
    const {item, add, remove, change} = props
    const name = `${item.itemCount}x ${item.itemName}`
    return (
        <div className={"Item"}>
            <h2>{name}</h2>
            <div className={"ItemActions"}>
                {/*Add Button*/}
                <i className="fas fa-plus" onClick={() => {
                    add(item)
                }}/>
                {/*Remove Button*/}
                <i className="fas fa-minus" onClick={() => {
                    remove(item.id!, false)
                }}/>
                {/*Remove All Button*/}
                <i className="fas fa-trash-alt" onClick={() => {
                    remove(item.id!, true)
                }}/>
                {/*Change Button*/}
                <i className="fas fa-exchange-alt" onClick={() => {
                    change(item.id!)
                }}/>
            </div>
        </div>
    );
}