import {
    IItemSetter,
    IItemController
} from "../models/ShoppingItems";

export default function ItemController(apiController: IItemController, setter: IItemSetter): IItemController {

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