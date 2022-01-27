package de.neuefische.shoppingcart_backend.service;

import de.neuefische.shoppingcart_backend.model.MongoUser;
import de.neuefische.shoppingcart_backend.repository.IMongoUserRepository;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MongoUserDetailsService implements UserDetailsService {

    private static final Log LOG = LogFactory.getLog(MongoUserDetailsService.class);
    public static final String ROLE_ADMIN = "ADMIN";

    private final IMongoUserRepository repository;

    public MongoUserDetailsService(IMongoUserRepository repository) {
        this.repository = repository;
    }

    @Override
    public MongoUser loadUserByUsername(String username) throws UsernameNotFoundException {
        MongoUser user = repository.findMongoUserByUsername(username);
        LOG.debug("Fetching user: " + username);
        if (user == null) {
            LOG.warn("Could not find user: " + username);
            throw new UsernameNotFoundException("User not found");
        }
        LOG.debug("Found user: " + user);
        return user;
    }
}
