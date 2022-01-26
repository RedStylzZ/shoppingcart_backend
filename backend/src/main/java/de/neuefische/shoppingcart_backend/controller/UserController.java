package de.neuefische.shoppingcart_backend.controller;

import de.neuefische.shoppingcart_backend.model.MongoUser;
import de.neuefische.shoppingcart_backend.model.dto.MongoUserDTO;
import de.neuefische.shoppingcart_backend.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PutMapping()
    public String addUser(Principal principal, @RequestBody MongoUserDTO user) {
        MongoUser mongoUser = MongoUser.builder()
                .id(user.getId())
                .username(user.getUsername())
                .password(user.getPassword())
                .build();
        return service.addUser(principal, mongoUser);
    }

}
