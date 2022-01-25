package de.neuefische.shoppingcart_backend.model;

import de.neuefische.shoppingcart_backend.model.dto.ShoppingListDTO;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document("shopLists")
public class ShoppingList {

    @Id
    String id;

    String userID;
    String listName;
    List<Item> items;

    @Transient
    public static ShoppingList convertDTOtoShoppingList(ShoppingListDTO dto) {
        return ShoppingList.builder()
                .listName(dto.getListName())
                .items(dto.getItems())
                .build();
    }
}
