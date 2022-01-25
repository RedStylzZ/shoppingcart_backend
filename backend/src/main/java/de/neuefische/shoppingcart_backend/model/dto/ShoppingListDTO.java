package de.neuefische.shoppingcart_backend.model.dto;

import de.neuefische.shoppingcart_backend.model.Item;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShoppingListDTO {
    String listName;
    List<Item> items;
}
