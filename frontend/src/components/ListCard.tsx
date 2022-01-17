import {Link} from "react-router-dom";
import {IList, removeListFunc} from "../models/ShoppingItems";
import './ListCard.scss'

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
            <Link to={`/lists/${name}`} className={"listCardLink"}>
                <h1>{name}</h1>
            </Link>
            <i className="fas fa-trash-alt" onClick={() => {
                remove(name)
            }}/>
        </div>
    )
}