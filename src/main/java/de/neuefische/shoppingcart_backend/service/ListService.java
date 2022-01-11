package de.neuefische.shoppingcart_backend.service;

import de.neuefische.shoppingcart_backend.model.Items;
import de.neuefische.shoppingcart_backend.model.ShoppingList;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ListService {

    private final ArrayList<ShoppingList> shoppingList = new ArrayList<>();

    public ArrayList<ShoppingList> getShoppingList() {
        return shoppingList;
    }

    public ArrayList<ShoppingList> setShoppingList(ShoppingList shoppingList) {
        this.shoppingList.add(shoppingList);
        System.out.println(this.shoppingList);
        return this.shoppingList;
    }

    public ArrayList<Items> getItems(String shoppingList) {
        return this.shoppingList
                .stream()
                .filter((list) -> list.getListName().equals(shoppingList))
                .findFirst()
                .map(ShoppingList::getItems)
                .orElse(new ArrayList<>());
    }
}
