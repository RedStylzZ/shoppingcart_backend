package de.neuefische.shoppingcart_backend.model;

import lombok.Data;
import lombok.NonNull;

import java.util.HashMap;

@Data
public class Items {
    @NonNull String itemName;
    @NonNull int itemCount;
}
