package de.neuefische.shoppingcart_backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Item {
    @NonNull String itemName;
    @NonNull int itemCount;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Item item = (Item) o;
        return itemName.equals(item.itemName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(itemName);
    }
}
