package de.neuefische.shoppingcart_backend.service;

import de.neuefische.shoppingcart_backend.model.MongoUser;
import de.neuefische.shoppingcart_backend.repository.IMongoUserRepository;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {
    private final Log LOG = LogFactory.getLog(UserService.class);

    private final IMongoUserRepository repository;
    private final JWTService jwtService;
    private final MongoUserDetailsService mongoService;

    public UserService(IMongoUserRepository repository, JWTService jwtService, MongoUserDetailsService mongoService) {
        this.repository = repository;
        this.jwtService = jwtService;
        this.mongoService = mongoService;
    }

    private boolean hasRole(Collection<? extends GrantedAuthority> authorities, String authority) {
        return authorities.stream().anyMatch(a -> authority.equals(a.getAuthority()));
    }

    public String addUser(Principal principal, UserDetails user) {
        try {
            if (principal != null) {
                final UserDetails mongoUser = mongoService.loadUserByUsername(principal.getName());
                if (hasRole(mongoUser.getAuthorities(), MongoUserDetailsService.ROLE_ADMIN)) {
                    MongoUser newUser = MongoUser.builder()
                            .id(UUID.randomUUID().toString())
                            .username(user.getUsername())
                            .password(new Argon2PasswordEncoder().encode(user.getPassword()))
                            .authorities(List.of(new SimpleGrantedAuthority("USER")))
                            .accountNonLocked(true)
                            .accountNonExpired(true)
                            .credentialsNonExpired(true)
                            .enabled(true)
                            .build();

                    repository.save(newUser);
                    LOG.info("Added new User: " + newUser);
                    return jwtService.createToken(newUser);
                }
            }
        } catch (Exception e) {
            LOG.warn("Add Account Exception:", e);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong Input");
        }
        return null;
    }
}
