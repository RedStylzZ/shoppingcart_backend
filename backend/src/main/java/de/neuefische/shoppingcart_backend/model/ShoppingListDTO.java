package de.neuefische.shoppingcart_backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document("shopLists")
public class ShoppingListDTO {

    @Id
    String id;

    @NonNull String userID;
    @NonNull String listName;
    @NonNull List<Item> items;
}
