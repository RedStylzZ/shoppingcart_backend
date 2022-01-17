package de.neuefische.shoppingcart_backend;

import de.neuefische.shoppingcart_backend.repository.IShoppingListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class Main implements CommandLineRunner {

    @Autowired
    IShoppingListRepository repository;

    @Value("${shopping.apiURL}")
    String api;

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println(api);
//        ShoppingList test = ShoppingList.builder()
//                .listName("Lidl")
//                .items(List.of(new Item("Meep", 10))).build();
//        try {
//            repository.save(test);
//        } catch (Exception e) {
//            System.out.println(e);
//        }
    }
}
