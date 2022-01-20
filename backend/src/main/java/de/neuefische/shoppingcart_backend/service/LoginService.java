package de.neuefische.shoppingcart_backend.service;

import de.neuefische.shoppingcart_backend.model.MongoUser;
import de.neuefische.shoppingcart_backend.repository.IMongoUserRepository;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class LoginService {
    private final Log LOG = LogFactory.getLog(LoginService.class);


    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;
    private final IMongoUserRepository repository;

    public LoginService(AuthenticationManager authenticationManager, JWTService jwtService, IMongoUserRepository repository) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.repository = repository;
    }

    public String login(MongoUser user) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );
            return jwtService.createToken(user);
        } catch (AuthenticationException e) {
            LOG.warn("Login Exception:", e);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid credentials");
        }
    }
}
