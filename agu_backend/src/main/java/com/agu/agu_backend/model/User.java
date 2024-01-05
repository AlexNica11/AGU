package com.agu.agu_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

/**
 * Users of the application, with different roles (and privileges)
 *
 */
@Document
public class User {

    @Id
    @Getter
    private String id;

    @NonNull
    @Getter
    @Setter
    private String username;

    @NonNull
    @Getter
    @Setter
    @JsonIgnore
    private String password;

    @NonNull
    @Getter
    @Setter
    @JsonIgnore
    private String firstName;

    @Getter
    @Setter
    @JsonIgnore
    private String lastName;

    /**
     * Roles assigned to the user
     */
    @DBRef
    @Getter
    @Setter
    private List<Role> roles;

    public User(@NonNull String username,
                @NonNull String password,
                @NonNull Role role,
                @Value("") String firstName,
                @Value("")String lastName) {
        this.username = username;
        this.password = password;
        this.roles = Arrays.asList(role);
    }

    protected User(){
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        User user = (User) o;

        if (!Objects.equals(id, user.id)) return false;
        if (!username.equals(user.username)) return false;
        return password.equals(user.password);
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + username.hashCode();
        result = 31 * result + password.hashCode();
        return result;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
