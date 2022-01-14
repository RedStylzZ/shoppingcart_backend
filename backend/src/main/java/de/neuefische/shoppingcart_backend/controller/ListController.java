package de.neuefische.shoppingcart_backend.controller;

import de.neuefische.shoppingcart_backend.model.Item;
import de.neuefische.shoppingcart_backend.model.ShoppingList;
import de.neuefische.shoppingcart_backend.service.ListService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("${shopping.apiURL}")
public class ListController {

    private final ListService service;

    public ListController(ListService service) {
        this.service = service;
    }

//    @CrossOrigin
    @GetMapping("lists")
    public List<ShoppingList> getLists() {
        return service.getShoppingLists();
    }

    @PutMapping("lists")
    public List<ShoppingList> addShoppingList(@RequestBody ShoppingList shoppingList) {
        return service.addShoppingList(shoppingList);
    }

    @PostMapping("lists")
    public List<ShoppingList> updateShoppingList(@RequestBody ShoppingList shoppingList) {
        return service.updateShoppingList(shoppingList);
    }

    @DeleteMapping("lists/{list}")
    public List<ShoppingList> deleteShoppingList(@PathVariable String list) {
        return service.deleteShoppingList(list);
    }


//    @CrossOrigin
    @GetMapping("items/{list}")
    public List<Item> getItems(@PathVariable String list) {
        return service.getItems(list);
    }

    @PostMapping("items/{list}")
    public List<Item> addItem(@PathVariable String list, @RequestBody Item item) {
        return service.addItem(list, item);
    }

    @DeleteMapping("items/{list}")
    public List<Item> deleteItem(@PathVariable String list,
                                 @RequestParam String itemName,
                                 @RequestParam String wholeItem) {
        System.out.println(itemName + wholeItem);
        boolean bWholeItem = wholeItem.equals("true") || wholeItem.equals("True");
        return service.deleteItem(list, itemName, bWholeItem);
    }

}
