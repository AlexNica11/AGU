package com.agu.agu_backend.model;

import lombok.Data;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;

/**
 * Class for the roles assigned to different users
 *
 */
@Document
public class Role implements GrantedAuthority {
    private static final long serialVersionUID = 1L;

    @Id
    @Getter
    private String id;

    @Getter
    @Setter
    @NonNull
    private String roleName;

    @Override
    public String getAuthority() {
        return roleName;
    }
}
