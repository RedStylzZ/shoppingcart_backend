import {IItemController, ITokenConfig} from "../models/ShoppingItems";
import ItemAPIController from "./ItemAPIController";

export default function ItemController(config?: ITokenConfig,): IItemController {

    const apiController = ItemAPIController(config!);

    return {
        getItems: (listName) => {
            return apiController.getItems(listName)
        },
        addItem(listName, newItem, quantity) {
            return apiController.addItem(listName, newItem, quantity)
        },
        changeItem(listName, itemID, newName) {
            return apiController.changeItem(listName, itemID, newName)
        },
        removeItem(listName, itemID, wholeItem) {
            return apiController.removeItem(listName, itemID, wholeItem)
        }
    }

}