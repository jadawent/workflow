package com.workflow.services;

import com.workflow.dtos.LoginResponse;
import com.workflow.models.*;
import com.workflow.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleService roleService;


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

        if(!passwordEncoder.matches(password, user.getPassword()))
            throw new BadCredentialsException("The password is incorrect.");

        return true;
    }

    public boolean existsByUsername(String username){
        return userRepository.existsByUsername(username);
    }

    public long getUserID(String username){
        User user = userRepository.findByUsername(username);
        return user.getId();
    }

    public User getUserByID(long id){
        return userRepository.getById(id);
    }

    public List<String> getUserRoles(String username) {
        User user = userRepository.findByUsername(username);
        List<String> roles = new ArrayList<>();
        for(Role role : user.getUserRoles()) {
            roles.add(role.getRoleName());
        }
        return roles;
    }

    public LoginResponse generateLoginResponse(String username) {
        return new LoginResponse(getUserID(username), getUserRoles(username));
    }

    public void createUser(User user){
        user.setUsername(user.getUsername().trim());
        if (existsByUsername(user.getUsername())) {
            throw new IllegalArgumentException("Username is already taken.");
        }

        if(!user.getPassword().equals(user.getConfirmPassword())){
            throw new IllegalArgumentException("Passwords do not match.");
        }

        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);

        Role role = determineRole(user.getUserRoles().get(0).getRoleName());
        user.setUserRoles(List.of(role));

        userRepository.save(user);
    }

    private Role determineRole(String roleName){
        switch(roleName){
            case "Manager":
                return roleService.ensureManagerRole();
            case "Employee":
                return roleService.ensureEmployeeRole();
            default:
                throw new IllegalArgumentException("Invalid role passed.");
        }
    }

    public Iterable<User> listUsers(){
        return userRepository.findAll();
    }
}
