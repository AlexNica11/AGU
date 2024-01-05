package com.agu.agu_backend.service;

import com.agu.agu_backend.model.Role;
import com.agu.agu_backend.model.User;
import com.agu.agu_backend.repo.RoleRepository;
import com.agu.agu_backend.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;

/**
 * Service class for different data inputs
 *
 */
@Service
public class DataService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder encoder;

    @Autowired
    public DataService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
    }

    public void setData(){
//        Role roleCsr = new Role();
//        roleCsr.setRoleName("ROLE_CSR");
//        Role roleAdmin = new Role();
//        roleAdmin.setRoleName("ROLE_ADMIN");
//        roleRepository.save(roleCsr);
//        roleRepository.save(roleAdmin);

        User admin = new User("username1", encoder.encode("password"), roleRepository.findByRoleName("ROLE_ADMIN").get(), "firstName", "LastName");
        admin.setRoles(Arrays.asList(roleRepository.findByRoleName("ROLE_ADMIN").get(), roleRepository.findByRoleName("ROLE_CSR").get()));
        User user = new User("username2", encoder.encode("password"), roleRepository.findByRoleName("ROLE_CSR").get(), "firstName", "LastName");
        userRepository.save(admin);
        userRepository.save(user);
    }
}
