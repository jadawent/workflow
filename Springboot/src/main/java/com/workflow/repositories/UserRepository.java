package com.workflow.repositories;

import com.workflow.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User,Long> {

    User findByUsername(String username);

    boolean existsByUsername(String username);

    User getById(long id);

}
