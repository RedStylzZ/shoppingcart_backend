package de.neuefische.shoppingcart_backend.controller;

import de.neuefische.shoppingcart_backend.model.MongoUser;
import de.neuefische.shoppingcart_backend.service.MongoUserDetailsService;
import de.neuefische.shoppingcart_backend.service.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PutMapping()
    public String addUser(Principal principal, @RequestBody MongoUser user) {
        return service.addUser(principal, user);
    }

}
