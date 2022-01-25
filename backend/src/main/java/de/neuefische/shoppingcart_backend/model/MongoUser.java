package de.neuefische.shoppingcart_backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

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
    @Transient
    public Collection<SimpleGrantedAuthority> getAuthorities() {
        if (this.rights == null) return List.of();
        return this.rights.stream()
                .map(SimpleGrantedAuthority::new)
                .toList();
    }

}

