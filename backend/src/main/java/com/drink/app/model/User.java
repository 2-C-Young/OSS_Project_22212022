package com.drink.app.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    private String id;
    
    private String nickname;
    
    private String password;
    
    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(name = "favorites", columnDefinition = "bigint[]")
    @Builder.Default
    private List<Long> favorites = new ArrayList<>();
    
    @Column(name = "role", columnDefinition = "varchar(50) default 'USER'")
    @Builder.Default
    private String role = "USER";
}
