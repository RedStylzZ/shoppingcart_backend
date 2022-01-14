package de.neuefische.shoppingcart_backend.service;

import de.neuefische.shoppingcart_backend.model.Item;
import de.neuefische.shoppingcart_backend.model.ShoppingList;
import de.neuefische.shoppingcart_backend.repository.IShoppingListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class ListService {

    @Autowired
    IShoppingListRepository repository;

    private Map<String, ShoppingList> shoppingList = new HashMap<>();
//    private List<ShoppingList> shoppingList = new ArrayList<>();

    private Map<String, ShoppingList> getListsAsMap() {
        return repository.findAll()
                .stream()
                .collect(Collectors.toMap(ShoppingList::getId, Function.identity()));
    }

    private boolean isListInMap(ShoppingList shoppingList) {
        return repository.findByListName(shoppingList.getListName()) != null;
    }

    private List<ShoppingList> mapToList(Map<String, ShoppingList> shoppingList) {
        return shoppingList.values().stream().toList();
    }

    public List<ShoppingList> getShoppingLists() {
        this.shoppingList = getListsAsMap();
        return mapToList(this.shoppingList);
    }

    public List<ShoppingList> addShoppingList(ShoppingList shoppingList) {
        if (!isListInMap(shoppingList)) {
            repository.save(shoppingList);
            System.out.println("Added List");
            shoppingList.setId(repository.findByListName(shoppingList.getListName()).getId());
            this.shoppingList.put(shoppingList.getId(), shoppingList);
        }
        return mapToList(this.shoppingList);
    }

    public List<ShoppingList> deleteShoppingList(String shoppingList) {
        ShoppingList tempList = repository.findByListName(shoppingList);
        if (tempList != null) {
            repository.delete(tempList);
            this.shoppingList.remove(tempList.getId());
        }
        return mapToList(this.shoppingList);
    }

    public List<ShoppingList> updateShoppingList(ShoppingList shoppingList) {
        repository.save(shoppingList);
        this.shoppingList.replace(shoppingList.getId(), shoppingList);
        return mapToList(this.shoppingList);
    }


    public List<Item> getItems(String list) {
        List<Item> items = repository.findByListName(list).getItems();
        return items;
    }

    public List<Item> addItem(String list, Item newItem) {
        ShoppingList tempList = repository.findByListName(list);
        List<Item> tempItems = tempList.getItems();
        if (tempItems.contains(newItem)) {
            tempItems.stream()
                    .filter(item -> item.equals(newItem))
                    .forEach(item -> item.setItemCount(item.getItemCount()+1));
            tempList.setItems(tempItems);
        } else {
            tempList.getItems().add(newItem);
        }
        repository.save(tempList);
        this.shoppingList.replace(tempList.getId(), tempList);
        return tempItems;
    }

    public List<Item> deleteItem(String list, String itemName, boolean wholeItem) {
        ShoppingList tempList = repository.findByListName(list);
        List<Item> tempListItems = tempList.getItems();

        for (Item item : tempListItems) {
            if (item.getItemName().equals(itemName)) {
                if (wholeItem) {
                    tempListItems.remove(item);
                } else {
                    item.setItemCount(item.getItemCount()+1);
                }
            }
        }

        tempList.setItems(tempListItems);
        repository.save(tempList);
        this.shoppingList.replace(tempList.getId(), tempList);

        return tempListItems;
    }


}
