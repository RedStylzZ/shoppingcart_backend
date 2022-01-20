package de.neuefische.shoppingcart_backend.controller;

import de.neuefische.shoppingcart_backend.model.Item;
import de.neuefische.shoppingcart_backend.model.ShoppingList;
import de.neuefische.shoppingcart_backend.service.ListService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("${shopping.apiURL}/lists")
public class ListController {

    private final ListService service;

    public ListController(ListService service) {
        this.service = service;
    }

//    @CrossOrigin
    @GetMapping()
    public List<ShoppingList> getLists(Principal principal) {
        return service.getShoppingLists(principal);
    }

    @PutMapping()
    public List<ShoppingList> addShoppingList(@RequestBody ShoppingList shoppingList) {
        return service.addShoppingList(shoppingList);
    }

    @DeleteMapping("/{list}")
    public List<ShoppingList> deleteShoppingList(@PathVariable String list) {
        return service.deleteShoppingList(list);
    }


}
