package de.neuefische.shoppingcart_backend.controller;

import de.neuefische.shoppingcart_backend.model.MongoUser;
import de.neuefische.shoppingcart_backend.model.MongoUserDTO;
import de.neuefische.shoppingcart_backend.service.LoginService;
import de.neuefische.shoppingcart_backend.service.MongoUserDetailsService;
import de.neuefische.shoppingcart_backend.service.UserService;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Collection;

@RestController
@RequestMapping("auth/login")
public class LoginController {
    private static final Log LOG = LogFactory.getLog(UserService.class);
    private final LoginService service;

    public LoginController(LoginService service) {
        this.service = service;
    }

    @GetMapping
    public String helloWorld(Principal principal) {

        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        LOG.info("Authorities: " + authorities);

        if (authorities.stream()
                .anyMatch(g -> MongoUserDetailsService.ROLE_ADMIN.equals(g.getAuthority()))) {
            return "Hallo " + principal.getName();
        }
        return "Mach dich weg du Geringverdiener!";
    }

    @PostMapping
    public String login(@RequestBody MongoUserDTO user) {
        return service.login(user);
    }


}
