package de.neuefische.shoppingcart_backend.controller;

import de.neuefische.shoppingcart_backend.model.ShoppingList;
import de.neuefische.shoppingcart_backend.service.ListService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api")
public class ListController {

    private final ListService service;

    public ListController(ListService service) {
        this.service = service;
    }

    @GetMapping("lists")
    public ArrayList<ShoppingList> getLists() {
        return service.getShoppingList();
    }

    @PutMapping("lists")
    public ArrayList<ShoppingList> addShoppingList(@RequestBody ArrayList<ShoppingList> shoppingList) {
        return service.addShoppingList(shoppingList);
    }

//    @GetMapping("items/{list}")
//    public Items getItems(@PathVariable String list) {
//        return service.getItems(list);
//    }

}
