package de.neuefische.shoppingcart_backend.service;

import de.neuefische.shoppingcart_backend.model.Item;
import de.neuefische.shoppingcart_backend.model.MongoUser;
import de.neuefische.shoppingcart_backend.model.ShoppingList;
import de.neuefische.shoppingcart_backend.repository.IShoppingListRepository;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class ListService {
    private final Log LOG = LogFactory.getLog(ListService.class);

    private final IShoppingListRepository repository;
    private final Map<String, ShoppingList> shoppingList = new HashMap<>();
    private final MongoUserDetailsService mongoService;

    public ListService(IShoppingListRepository repository, MongoUserDetailsService mongoService) {
        this.repository = repository;
        this.mongoService = mongoService;
    }

//    private List<ShoppingList> shoppingList = new ArrayList<>();

    private Map<String, ShoppingList> getListsAsMap(String id) {
        return repository.findAllByUserID(id)
                .stream()
                .collect(Collectors.toMap(ShoppingList::getId, Function.identity()));
    }

    private boolean isListInMap(ShoppingList shoppingList) {
        return repository.findByListName(shoppingList.getListName()) != null;
    }

    private List<ShoppingList> mapToList(Map<String, ShoppingList> shoppingList) {
        return shoppingList.values().stream().toList();
    }

    public List<ShoppingList> getShoppingLists(Principal principal) {
        if (principal != null) {
            LOG.info("Get Shopping Lists");
            MongoUser user = mongoService.loadUserByUsername(principal.getName());
            this.shoppingList.putAll(getListsAsMap(user.getId()));
            return mapToList(this.shoppingList);
        }
        return null;
    }

    public List<ShoppingList> addShoppingList(ShoppingList shoppingList) {
        if (!shoppingList.getListName().isBlank()) {
            if (!isListInMap(shoppingList)) {
                repository.save(shoppingList);
                System.out.println("Added List");
                shoppingList.setId(repository.findByListName(shoppingList.getListName()).getId());
                this.shoppingList.put(shoppingList.getId(), shoppingList);
            }
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

    public List<Item> changeItem(String listName, String itemID, String newItemName) {
        if (!(itemID.isBlank() || newItemName.isBlank())) {
            ShoppingList list = repository.findByListName(listName);
            List<Item> items = list.getItems();
            if (!items.isEmpty()) {
                items.stream()
                        .filter(item ->
                                item.getId().equals(itemID))
                        .findFirst()
                        .ifPresentOrElse(item ->
                                item.setItemName(newItemName), null);

//                tempItem.ifPresent(item -> item.setItemName(newItemName));

                list.setItems(items);
                repository.save(list);
                this.shoppingList.replace(list.getId(), list);
            }
            return list.getItems();
        }

        Optional<ShoppingList> temp = this.shoppingList
                .values()
                .stream()
                .filter(sList -> sList.getListName().equals(listName))
                .findFirst();

        return temp.map(ShoppingList::getItems).orElse(null);

    }


    public List<Item> getItems(String list) {
        return repository.findByListName(list).getItems();
    }

    public List<Item> addItem(String list, Item newItem) {
        ShoppingList tempList = repository.findByListName(list);
        System.out.println("New Item:" + newItem);
        List<Item> tempItems = tempList.getItems();

        if (tempItems.contains(newItem)) {
            tempItems.stream()
                    .filter(item -> item.equals(newItem))
                    .forEach(item ->
                            item.setItemCount(item.getItemCount() + newItem.getItemCount()));
            tempList.setItems(tempItems);
        } else {
            tempList.getItems().add(newItem);
        }
        repository.save(tempList);
        this.shoppingList.replace(tempList.getId(), tempList);
        return tempItems;
    }

    public List<Item> deleteItem(String list, String itemID, boolean wholeItem) {
        ShoppingList tempList = repository.findByListName(list);
        List<Item> tempListItems = tempList.getItems();

        for (Item tItem : tempListItems) {
            if (tItem.getId().equals(itemID)) {
                if (wholeItem || tItem.getItemCount() <= 1) {
                    tempListItems.remove(tItem);
                    break;
                } else {
                    tItem.setItemCount(tItem.getItemCount()-1);
                }
            }
        }

        tempList.setItems(tempListItems);
        repository.save(tempList);
        this.shoppingList.replace(tempList.getId(), tempList);

        return tempListItems;
    }


}
