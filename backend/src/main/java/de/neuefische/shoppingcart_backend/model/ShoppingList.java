package de.neuefische.shoppingcart_backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document("shopLists")
public class ShoppingList {

    @Id
    String id;

    @NonNull String listName;
    @NonNull List<Item> items;
}
