package de.neuefische.shoppingcart_backend;

import de.neuefische.shoppingcart_backend.repository.IMongoUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;


@SpringBootApplication
public class Main implements CommandLineRunner {

    @Autowired
    IMongoUserRepository repository;

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        /*PasswordEncoder encoder = new Argon2PasswordEncoder();
        String secure = encoder.encode("Turtle");
        String secure2 = encoder.encode("Meep");
        MongoUser user = MongoUser.builder()
                .username("Tizian")
                .password(secure)
                .authorities(List.of(new SimpleGrantedAuthority("ADMIN"), new SimpleGrantedAuthority("USER")))
                .enabled(true)
                .accountNonExpired(true)
                .accountNonLocked(true)
                .credentialsNonExpired(true)
                .build();
        MongoUser user2 = MongoUser.builder()
                .username("Turtle")
                .password(secure2)
                .authorities(List.of(new SimpleGrantedAuthority("USER")))
                .enabled(true)
                .accountNonExpired(true)
                .accountNonLocked(true)
                .credentialsNonExpired(true)
                .build();
        try {
            repository.saveAll(List.of(user, user2));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }*/
    }
}
