package de.neuefische.shoppingcart_backend.model.dto;

import de.neuefische.shoppingcart_backend.model.Item;

import java.util.List;


public record ShoppingListDTO (String listName, List<Item> items){
}
