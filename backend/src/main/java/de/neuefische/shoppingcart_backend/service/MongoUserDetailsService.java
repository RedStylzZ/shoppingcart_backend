package de.neuefische.shoppingcart_backend.service;

import de.neuefische.shoppingcart_backend.model.MongoUser;
import de.neuefische.shoppingcart_backend.repository.IMongoUserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class MongoUserDetailsService implements UserDetailsService {

    public static final String AUTHORITY_API_READWRITE = "API_READWRITE";
    public static final String ROLE_ADMIN = "ADMIN";

    private final IMongoUserRepository repository;

    public MongoUserDetailsService(IMongoUserRepository repository) {
        this.repository = repository;
    }

    @Override
    public MongoUser loadUserByUsername(String username) throws UsernameNotFoundException {
        MongoUser user = repository.findMongoUserByUsername(username);
        System.out.println("MongoUserDetailsService: " + user);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return user;
    }
}
