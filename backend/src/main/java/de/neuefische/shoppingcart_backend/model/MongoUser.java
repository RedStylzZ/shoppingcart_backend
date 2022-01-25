package de.neuefische.shoppingcart_backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.Transient;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document("shopUser")
public class MongoUser implements UserDetails {

    @Id
    String id;

    String username;
    String password;
    private List<String> rights;
    boolean accountNonExpired;
    boolean accountNonLocked;
    boolean credentialsNonExpired;
    boolean enabled;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.rights.stream()
                .map(SimpleGrantedAuthority::new)
                .toList();
    }

}

