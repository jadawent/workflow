package com.workflow.services;

import com.workflow.models.Role;
import com.workflow.models.User;
import com.workflow.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;


    public User createUser(User user, List<Role> roles){
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        user.setUserRoles(roles);
        return userRepository.save(user);
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }

    public boolean authenticate(String username, String password) {
        User user = userRepository.findByUsername(username);

        if(!user.getUsername().equals(username))
            throw new UsernameNotFoundException("User does not exist.");

        if(!bCryptPasswordEncoder.matches(password, user.getPassword()))
            throw new BadCredentialsException("The password is incorrect.");

        return true;
    }

    public boolean existsByUsername(String username){
        return userRepository.existsByUsername(username);
    }
}
