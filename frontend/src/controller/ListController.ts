import {IListController, IListSetter, ITokenConfig} from "../models/ShoppingItems";
import ListService from "../services/ListService";

export default function ListController(setter: IListSetter, config?: ITokenConfig): IListController {

    const apiController = ListService(config!)

    return {
        getLists: () => {
            apiController.getLists()!.then(setter).catch(() => console.error("Error"))
        },
        addList(listName) {
            apiController.addList(listName)!.then(setter)
        },
        removeList(listName) {
            apiController.removeList(listName)!.then(setter)
        }
    };
}