package de.neuefische.shoppingcart_backend.service;

import de.neuefische.shoppingcart_backend.model.Item;
import de.neuefische.shoppingcart_backend.model.MongoUser;
import de.neuefische.shoppingcart_backend.model.ShoppingList;
import de.neuefische.shoppingcart_backend.model.dto.ShoppingListDTO;
import de.neuefische.shoppingcart_backend.repository.IShoppingListRepository;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.*;

@Service
public class ListService {
    private static final Log LOG = LogFactory.getLog(ListService.class);

    private final IShoppingListRepository repository;
    private final Map<String, ShoppingList> shoppingList = new HashMap<>();
    private final MongoUserDetailsService mongoService;

    public ListService(IShoppingListRepository repository, MongoUserDetailsService mongoService) {
        this.repository = repository;
        this.mongoService = mongoService;
    }

    private boolean isListInMap(String userID, ShoppingList shoppingList) {
        return repository.findByUserIDAndListName(userID, shoppingList.getListName()) != null;
    }

    private List<ShoppingList> mapToList(Map<String, ShoppingList> shoppingList) {
        return shoppingList.values().stream().toList();
    }

    private String getUserID(Principal principal) {
        return mongoService.loadUserByUsername(principal.getName()).getId();
    }

    public List<ShoppingList> getShoppingLists(Principal principal) {
        if (principal != null) {
            LOG.info("Get Shopping Lists");
            MongoUser user = mongoService.loadUserByUsername(principal.getName());
            return repository.findAllByUserID(user.getId());
        }
        return List.of();
    }

    public List<ShoppingList> addShoppingList(Principal principal, ShoppingListDTO shoppingListDTO) {
        if (principal == null) return List.of();
        ShoppingList localShoppingList = ShoppingList.builder()
                .id(shoppingListDTO.getId())
                .listName(shoppingListDTO.getListName())
                .items(shoppingListDTO.getItems())
                .userID(shoppingListDTO.getUserID())
                .build();

        MongoUser user = mongoService.loadUserByUsername(principal.getName());
        if (!localShoppingList.getListName().isBlank() && !isListInMap(user.getId(), localShoppingList)) {
                localShoppingList.setUserID(user.getId());
                localShoppingList.setId(UUID.randomUUID().toString());
                repository.save(localShoppingList);
                LOG.info("Added List: " + localShoppingList);
                this.shoppingList.put(localShoppingList.getId(), localShoppingList);
            }
        return repository.findAllByUserID(user.getId());
    }

    public List<ShoppingList> deleteShoppingList(String shoppingList) {
        ShoppingList tempList = repository.findByListName(shoppingList);
        if (tempList != null) {
            repository.delete(tempList);
            this.shoppingList.remove(tempList.getId());
        }
        return mapToList(this.shoppingList);
    }


    public List<Item> changeItem(Principal principal, String listName, String itemID, String newItemName) {
        if (principal == null) return List.of();
        if (!(itemID.isBlank() || newItemName.isBlank())) {
            ShoppingList list = repository.findByUserIDAndListName(getUserID(principal), listName);
            List<Item> items = list.getItems();
            if (!items.isEmpty()) {
                items.stream()
                        .filter(item ->
                                item.getId().equals(itemID))
                        .findFirst()
                        .ifPresentOrElse(item ->
                                item.setItemName(newItemName), null);

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

        return temp.map(ShoppingList::getItems).orElse(List.of());

    }


    public List<Item> getItems(Principal principal, String list) {
        if (principal == null) return List.of();
        return repository.findByUserIDAndListName(getUserID(principal), list).getItems();
    }

    public List<Item> addItem(Principal principal, String list, Item newItem) {
        if (principal == null) return List.of();
        ShoppingList tempList = repository.findByUserIDAndListName(getUserID(principal), list);
        LOG.info("New Item:" + newItem);
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

    public List<Item> deleteItem(Principal principal, String list, String itemID, boolean wholeItem) {
        if (principal == null) return List.of();
        ShoppingList tempList = repository.findByUserIDAndListName(getUserID(principal), list);
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
