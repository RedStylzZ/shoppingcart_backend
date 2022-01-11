package de.neuefische.shoppingcart_backend.model;

import lombok.Data;
import lombok.NonNull;

import java.util.ArrayList;

@Data
public class ShoppingList {
    @NonNull String listName;
    @NonNull ArrayList<Items> items;
}
