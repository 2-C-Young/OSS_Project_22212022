package com.drink.app.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "drinks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Drink {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    private String category;
    
    private Integer price;
    
    @Column(name = "abv_range")
    private Double abvRange;
    
    @Column(name = "sweetness_level")
    private Integer sweetnessLevel;
    
    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(name = "scents", columnDefinition = "text[]")
    @Builder.Default
    private List<String> scents = new ArrayList<>();
    
    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(name = "tastes", columnDefinition = "text[]")
    @Builder.Default
    private List<String> tastes = new ArrayList<>();
    
    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(name = "atmospheres", columnDefinition = "text[]")
    @Builder.Default
    private List<String> atmospheres = new ArrayList<>();
}
