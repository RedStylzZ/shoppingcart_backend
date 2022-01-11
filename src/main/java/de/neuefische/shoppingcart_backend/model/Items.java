package de.neuefische.shoppingcart_backend.model;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;
import lombok.NonNull;

@Data
public class Items {
    @NonNull String name;
    @NonNull int count;
}
