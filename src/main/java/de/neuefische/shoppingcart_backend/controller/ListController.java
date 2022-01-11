package de.neuefische.shoppingcart_backend.controller;

import de.neuefische.shoppingcart_backend.model.Items;
import de.neuefische.shoppingcart_backend.model.ShoppingList;
import de.neuefische.shoppingcart_backend.service.ListService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping()
public class ListController {

    private final ListService service;

    public ListController(ListService service) {
        this.service = service;
    }

    @GetMapping
    public String helloWorld() {
        return "Goodbye World";
    }

    @GetMapping("lists")
    public ArrayList<ShoppingList> getLists() {
        return service.getShoppingList();
    }

    @PutMapping("lists")
    public ArrayList<ShoppingList> setLists(@RequestBody ShoppingList shoppingList) {
        return service.setShoppingList(shoppingList);
    }

    @GetMapping("items/{list}")
    public ArrayList<Items> getItems(@PathVariable String list) {
        return service.getItems(list);
    }

}
