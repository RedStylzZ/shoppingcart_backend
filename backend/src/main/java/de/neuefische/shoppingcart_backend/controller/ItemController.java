package de.neuefische.shoppingcart_backend.controller;

import de.neuefische.shoppingcart_backend.model.Item;
import de.neuefische.shoppingcart_backend.service.ListService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("${shopping.apiURL}/items")
public class ItemController {

    private final ListService service;

    public ItemController(ListService service) {
        this.service = service;
    }


    @GetMapping("/{list}")
    public List<Item> getItems(Principal principal, @PathVariable String list) {
        return service.getItems(principal, list);
    }

    @PutMapping("/{list}")
    public List<Item> addItem(Principal principal, @PathVariable String list, @RequestBody Item item) {
        return service.addItem(principal, list, item);
    }

    @DeleteMapping("/{list}")
    public List<Item> deleteItem(Principal principal, @PathVariable String list,
                                 @RequestParam String itemID,
                                 @RequestParam boolean wholeItem) {
        return service.deleteItem(principal, list, itemID, wholeItem);
    }

    @PostMapping("/{list}")
    public List<Item> changeItem(Principal principal, @PathVariable String list,
                                 @RequestParam String itemID,
                                 @RequestParam String newName) {
        return service.changeItem(principal, list, itemID, newName);
    }


}
