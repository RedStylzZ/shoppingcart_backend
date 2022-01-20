package de.neuefische.shoppingcart_backend.controller;

import de.neuefische.shoppingcart_backend.model.MongoUser;
import de.neuefische.shoppingcart_backend.service.LoginService;
import de.neuefische.shoppingcart_backend.service.MongoUserDetailsService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Collection;

@RestController
@RequestMapping("auth/login")
public class LoginController {

    private final LoginService service;

    public LoginController(LoginService service) {
        this.service = service;
    }

    @GetMapping
    public String helloWorld(Principal principal) {

        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        System.out.println("Authorities: " + authorities);

        if (authorities.stream()
                .anyMatch(g -> MongoUserDetailsService.ROLE_ADMIN.equals(g.getAuthority()))) {
            return "Hallo " + principal.getName();
        }
        return "Mach dich weg du Geringverdiener!";
    }

    @PostMapping
    public String login(@RequestBody MongoUser user) {
        return service.login(user);
    }


}
