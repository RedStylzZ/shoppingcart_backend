import {
    IItemSetter,
    IItemController, ITokenConfig
} from "../models/ShoppingItems";
import ItemAPIController from "./ItemAPIController";

export default function ItemController(setter: IItemSetter, config?: ITokenConfig, ): IItemController {

    const apiController = ItemAPIController(config!);

    return {
        getItems: (listName) => {
            apiController.getItems(listName)!.then(setter)
        },
        addItem(listName, newItem, quantity) {
            apiController.addItem(listName, newItem, quantity)!.then(setter)
        },
        changeItem(listName, itemID, newName) {
            apiController.changeItem(listName, itemID, newName)!.then(setter)
        },
        removeItem(listName, itemID, wholeItem) {
            apiController.removeItem(listName, itemID, wholeItem)!.then(setter)
        }
    }

}