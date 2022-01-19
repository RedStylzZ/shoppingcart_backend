package de.neuefische.shoppingcart_backend.controller;

import de.neuefische.shoppingcart_backend.model.Item;
import de.neuefische.shoppingcart_backend.service.ListService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("${shopping.apiURL}/items")
public class ItemController {

    private final ListService service;

    public ItemController(ListService service) {
        this.service = service;
    }


    @GetMapping("/{list}")
    public List<Item> getItems(@PathVariable String list) {
        return service.getItems(list);
    }

    @PutMapping("/{list}")
    public List<Item> addItem(@PathVariable String list, @RequestBody Item item) {
        return service.addItem(list, item);
    }

    @DeleteMapping("/{list}")
    public List<Item> deleteItem(@PathVariable String list,
                                 @RequestParam String itemID,
                                 @RequestParam boolean wholeItem) {
        System.out.println(itemID + " " + wholeItem);
//        boolean bWholeItem = wholeItem.equals("true") || wholeItem.equals("True");
        return service.deleteItem(list, itemID, wholeItem);
    }

    @PostMapping("/{list}")
    public List<Item> changeItem(@PathVariable String list,
                                 @RequestParam String itemID,
                                 @RequestParam String newName) {
        return service.changeItem(list, itemID, newName);
    }


}
