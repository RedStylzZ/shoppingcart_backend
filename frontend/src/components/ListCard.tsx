import {Link} from "react-router-dom";
import {IItems, removeListFunc} from "../models/ShoppingItems";
import './ListCard.scss'

type IList = [string, IItems]

interface IListCard {
    list: IList
    remove: removeListFunc
}

export default function ListCard(props: IListCard) {
    const {list, remove} = props
    return (
        <div className={"listCard"}>
            <Link to={`/lists/${list[0]}`}>
                <div>
                    <h1>{list[0]}</h1>
                </div>
            </Link>
            <i className="fas fa-trash-alt" onClick={() => {
                remove(list[0])
            }}/>
            {/*<div className={"listCard"}>
                <input type={"button"}
                       value={"Remove"}
                       id={"removeList"}
                       onClick={() => remove(list[0])}/>
            </div>*/}
        </div>
    )
}