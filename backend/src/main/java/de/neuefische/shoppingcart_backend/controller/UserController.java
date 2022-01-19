package de.neuefische.shoppingcart_backend.controller;

import de.neuefische.shoppingcart_backend.model.MongoUser;
import de.neuefische.shoppingcart_backend.service.MongoUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/admin")
public class UserController {

    final MongoUserDetailsService mongoService;

    public UserController(MongoUserDetailsService mongoService) {
        this.mongoService = mongoService;
    }

    @GetMapping
    public String helloWorld(Principal principal) {
        if (principal != null) {
            final MongoUser mongoUser = mongoService.loadUserByUsername(principal.getName());
            final boolean isAllowed =
                    mongoUser.getAuthorities().stream().anyMatch(u -> "ADMIN".equals(u.getAuthority()));
            if (isAllowed)
                return "Hallo " + mongoUser.getUsername();
        }
        return "Mach dich weg du Geringverdiener!";
    }

}
