package de.neuefische.shoppingcart_backend.service;

import de.neuefische.shoppingcart_backend.model.MongoUser;
import de.neuefische.shoppingcart_backend.model.MongoUserDTO;
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
    private static final Log LOG = LogFactory.getLog(LoginService.class);


    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    public LoginService(AuthenticationManager authenticationManager, JWTService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public String login(MongoUserDTO user) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );
            return jwtService.createToken(MongoUser.builder()
                    .id(user.getId())
                    .username(user.getUsername())
                    .password(user.getPassword())
                    .build()
            );
        } catch (AuthenticationException e) {
            LOG.warn("Login Exception:", e);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid credentials");
        }
    }
}
