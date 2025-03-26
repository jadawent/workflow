package com.workflow.services;

import com.workflow.models.Role;
import com.workflow.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;

    public Role saveRole(Role role){
        return roleRepository.save(role);
    }

    public Role findByRoleName(String roleName){
        return roleRepository.findByRoleName(roleName);
    }

    // This will check if "Manager" is in the Role table, if not, it will create it.
    // Returns the role in both cases.
    public Role ensureManagerRole(){
        Role role = findByRoleName("Manager");
        if (role == null){
            role = new Role();
            role.setRoleName("Manager");
            saveRole(role);
        }
        return role;
    }

    public Role ensureEmployeeRole(){
        Role role = findByRoleName("Employee");
        if (role == null){
            role = new Role();
            role.setRoleName("Employee");
            saveRole(role);
        }
        return role;
    }

}
