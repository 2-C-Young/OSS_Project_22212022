package com.drink.app.service;

import com.drink.app.model.Drink;
import com.drink.app.model.User;
import com.drink.app.repository.DrinkRepository;
import com.drink.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DrinkService {

    private final DrinkRepository drinkRepository;
    private final UserRepository userRepository;

    public List<Drink> getAllDrinks() {
        return drinkRepository.findAll();
    }

    public Drink getDrinkById(Long id) {
        return drinkRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 술입니다."));
    }

    public List<Drink> getUserFavorites(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        List<Long> favoriteIds = user.getFavorites();
        if (favoriteIds == null || favoriteIds.isEmpty()) {
            return new ArrayList<>();
        }

        return drinkRepository.findAllById(favoriteIds);
    }

    @Transactional
    public User toggleFavorite(String userId, Long drinkId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        List<Long> favorites = user.getFavorites();
        if (favorites == null) {
            favorites = new ArrayList<>();
        }

        if (favorites.contains(drinkId)) {
            favorites.remove(drinkId);
        } else {
            favorites.add(drinkId);
        }

        user.setFavorites(favorites);
        return userRepository.save(user);
    }

    public boolean isFavorite(String userId, Long drinkId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        List<Long> favorites = user.getFavorites();
        return favorites != null && favorites.contains(drinkId);
    }
}
