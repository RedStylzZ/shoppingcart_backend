package de.neuefische.shoppingcart_backend.service;

import de.neuefische.shoppingcart_backend.model.MongoUser;
import de.neuefische.shoppingcart_backend.repository.IShoppingListRepository;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

class ListServiceTest {

    private final IShoppingListRepository shoppingListRepository = mock(IShoppingListRepository.class);
    private final MongoUserDetailsService mongoService = mock(MongoUserDetailsService.class);
    @Test
    void testTest() {
        ListService service = new ListService(shoppingListRepository, mongoService);
        assertNull(service.getItems(null, "Meep"));
    }

}