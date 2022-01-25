package de.neuefische.shoppingcart_backend.controller;

import de.neuefische.shoppingcart_backend.model.ShoppingList;
import de.neuefische.shoppingcart_backend.model.dto.ShoppingListDTO;
import de.neuefische.shoppingcart_backend.service.ListService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("${shopping.apiURL}/lists")
public class ListController {

    private final ListService service;

    public ListController(ListService service) {
        this.service = service;
    }

    @GetMapping()
    public List<ShoppingList> getLists(Principal principal) {
        return service.getShoppingLists(principal);
    }

    @PutMapping()
    public List<ShoppingList> addShoppingList(@RequestBody ShoppingListDTO shoppingListDTO, Principal principal) {
        ShoppingList shoppingList = ShoppingList.convertDTOtoShoppingList(shoppingListDTO);
        return service.addShoppingList(principal, shoppingList);
    }

    @DeleteMapping("/{list}")
    public List<ShoppingList> deleteShoppingList(@PathVariable String list) {
        return service.deleteShoppingList(list);
    }


}
