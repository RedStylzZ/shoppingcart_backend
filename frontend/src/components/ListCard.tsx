import {Link} from "react-router-dom";
import {IItems, IList, IListSetter, removeListFunc} from "../models/ShoppingItems";
import './ListCard.scss'

// type IList = [string, IItems]

interface IListCard {
    list: IList
    remove: removeListFunc
}

export default function ListCard(props: IListCard) {
    const {list, remove} = props
    const name: string = list.listName
    const id: string = list.id
    return (
        <div className={"listCard"} id={id}>
            <Link to={`/lists/${name}`}>
                <div>
                    <h1>{name}</h1>
                </div>
            </Link>
            <i className="fas fa-trash-alt" onClick={() => {
                remove(name)
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