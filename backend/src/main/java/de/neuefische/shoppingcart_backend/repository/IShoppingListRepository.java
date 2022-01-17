package de.neuefische.shoppingcart_backend.repository;

import de.neuefische.shoppingcart_backend.model.ShoppingList;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface IShoppingListRepository extends MongoRepository<ShoppingList, String> {
    ShoppingList findByListName(String listName);
    ShoppingList findShoppingListById(String id);
    List<ShoppingList> findAllByListNameContains(String listName);
}
