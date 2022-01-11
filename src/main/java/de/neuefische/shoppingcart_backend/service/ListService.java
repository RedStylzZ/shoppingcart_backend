package de.neuefische.shoppingcart_backend.service;

import de.neuefische.shoppingcart_backend.model.ShoppingList;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ListService {

    private final ArrayList<ShoppingList> shoppingList = new ArrayList<>();

    public ArrayList<ShoppingList> getShoppingList() {
        return shoppingList;
    }

    public ArrayList<ShoppingList> addShoppingList(ArrayList<ShoppingList> shoppingList) {
        System.out.println(shoppingList);
        this.shoppingList.addAll(0, shoppingList);
        return this.shoppingList;
    }

//    public Items getItems(String shoppingList) {
//        return this.shoppingList
//                .stream()
//                .filter((list) -> list.getListName().equals(shoppingList))
//                .findFirst()
//                .map(ShoppingList::getItems)
//                .orElse(null);
//    }
}
