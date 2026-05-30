package com.drink.app.controller;

import com.drink.app.dto.DrinkDto;
import com.drink.app.model.Drink;
import com.drink.app.model.User;
import com.drink.app.service.DrinkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drinks")
@RequiredArgsConstructor
public class DrinkController {

    private final DrinkService drinkService;

    @GetMapping
    public ResponseEntity<List<Drink>> getAllDrinks() {
        return ResponseEntity.ok(drinkService.getAllDrinks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDrinkById(@PathVariable Long id) {
        try {
            Drink drink = drinkService.getDrinkById(id);
            return ResponseEntity.ok(drink);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/favorites")
    public ResponseEntity<?> getUserFavorites(@RequestParam String userId) {
        try {
            List<Drink> favorites = drinkService.getUserFavorites(userId);
            return ResponseEntity.ok(favorites);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/favorite")
    public ResponseEntity<?> toggleFavorite(@PathVariable Long id, @RequestParam String userId) {
        try {
            User user = drinkService.toggleFavorite(userId, id);
            return ResponseEntity.ok(user);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}/is-favorite")
    public ResponseEntity<?> isFavorite(@PathVariable Long id, @RequestParam String userId) {
        try {
            boolean isFav = drinkService.isFavorite(userId, id);
            return ResponseEntity.ok(isFav);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/recommend")
    public ResponseEntity<?> recommend(@RequestBody DrinkDto.RecommendRequest request) {
        try {
            List<Drink> recommended = drinkService.recommendDrinks(request);
            return ResponseEntity.ok(recommended);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createDrink(@RequestBody DrinkDto.CreateRequest request, @RequestParam String userId) {
        try {
            Drink drink = drinkService.createDrink(request, userId);
            return ResponseEntity.ok(drink);
        } catch (SecurityException e) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.FORBIDDEN).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}


