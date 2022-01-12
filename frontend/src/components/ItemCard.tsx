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
                {/*<input type={"button"}
                       value={"Add"}
                       id={"add"}
                       onClick={() => {
                           add(item)
                       }}/>*/}
                {/*Remove Button*/}
                <i className="fas fa-minus" onClick={() => {
                    remove(item, false)
                }}/>
                {/*<input type={"button"}
                       value={"Remove"}
                       id={"remove"}
                       onClick={() => {
                           remove(item, false)
                       }}/>*/}
                {/*Remove All Button*/}
                <i className="fas fa-trash-alt" onClick={() => {
                    remove(item, true)
                }}/>
                {/*<input type={"button"}
                       value={"Remove All"}
                       id={"removeAll"}
                       onClick={() => {
                           remove(item, true)
                       }}/>*/}
                {/*Change Button*/}
                <i className="fas fa-exchange-alt" onClick={() => {
                    change(item.itemName)
                }}/>
                {/*<input type={"button"}
                       value={"ChangeItem"}
                       id={"changeItem"}
                       onClick={() => {
                           change(item[0])
                       }}/>*/}
            </div>
        </div>
    );
}