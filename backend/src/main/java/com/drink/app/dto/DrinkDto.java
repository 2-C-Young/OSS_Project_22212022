package com.drink.app.dto;

import lombok.*;
import java.util.List;

public class DrinkDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class RecommendRequest {
        private Integer price;
        private Double abv;
        private Integer sweetness;
        private List<String> tags;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CreateRequest {
        private String name;
        private String category;
        private Integer price;
        private Double abvRange;
        private Integer sweetnessLevel;
        private List<String> scents;
        private List<String> tastes;
        private List<String> atmospheres;
        private String imageUrl;
    }
}

