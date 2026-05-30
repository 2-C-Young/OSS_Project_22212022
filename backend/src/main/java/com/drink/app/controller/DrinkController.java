package com.drink.app.controller;

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
}
