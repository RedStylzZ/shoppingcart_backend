package de.neuefische.shoppingcart_backend.repository;

import de.neuefische.shoppingcart_backend.model.MongoUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

@Repository
public interface IMongoUserRepository extends MongoRepository<MongoUser, String> {

    MongoUser findMongoUserByUsername(String username) throws UsernameNotFoundException;

}
