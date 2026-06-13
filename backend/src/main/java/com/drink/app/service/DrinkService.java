package com.drink.app.service;

import com.drink.app.dto.DrinkDto;
import com.drink.app.model.Drink;
import com.drink.app.model.User;
import com.drink.app.repository.DrinkRepository;
import com.drink.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    public List<Drink> recommendDrinks(DrinkDto.RecommendRequest request) {
        List<Drink> allDrinks = drinkRepository.findAll();

        // 1차 필터링: 가격 조건 충족 & 도수 조건 충족 (±4.0%)
        List<Drink> filtered = allDrinks.stream()
                .filter(drink -> drink.getPrice() <= request.getPrice())
                .filter(drink -> Math.abs(drink.getAbvRange() - request.getAbv()) <= 4.0)
                .collect(Collectors.toList());

        // Fallback: 만약 조건에 맞는 술이 없다면 가격 조건만 충족하는 전체 술 중에서 다시 매칭 (사용자 경험 향상)
        if (filtered.isEmpty()) {
            filtered = allDrinks.stream()
                    .filter(drink -> drink.getPrice() <= request.getPrice())
                    .collect(Collectors.toList());
        }

        // 만약 여전히 비어있다면 전체 술 대상
        if (filtered.isEmpty()) {
            filtered = allDrinks;
        }

        // 정렬 기준 정의
        // 1. 태그 매치 개수 (내림차순)
        // 2. 도수 오차 (오름차순)
        // 3. 당도 오차 (오름차순)
        filtered.sort((d1, d2) -> {
            long tagsMatch1 = countMatchingTags(d1, request.getTags());
            long tagsMatch2 = countMatchingTags(d2, request.getTags());

            if (tagsMatch1 != tagsMatch2) {
                return Long.compare(tagsMatch2, tagsMatch1); // 내림차순
            }

            double abvDiff1 = Math.abs(d1.getAbvRange() - request.getAbv());
            double abvDiff2 = Math.abs(d2.getAbvRange() - request.getAbv());
            if (Math.abs(abvDiff1 - abvDiff2) > 0.0001) {
                return Double.compare(abvDiff1, abvDiff2); // 오름차순
            }

            int sweetnessDiff1 = Math.abs(d1.getSweetnessLevel() - request.getSweetness());
            int sweetnessDiff2 = Math.abs(d2.getSweetnessLevel() - request.getSweetness());
            return Integer.compare(sweetnessDiff1, sweetnessDiff2); // 오름차순
        });

        // 최대 상위 3개 반환
        return filtered.stream().limit(3).collect(Collectors.toList());
    }

    private long countMatchingTags(Drink drink, List<String> requestTags) {
        if (requestTags == null || requestTags.isEmpty()) {
            return 0;
        }

        long count = 0;
        if (drink.getScents() != null) {
            count += drink.getScents().stream().filter(requestTags::contains).count();
        }
        if (drink.getTastes() != null) {
            count += drink.getTastes().stream().filter(requestTags::contains).count();
        }
        return count;
    }

    @Transactional
    public Drink createDrink(DrinkDto.CreateRequest request, String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        if (!"ADMIN".equalsIgnoreCase(user.getRole())) {
            throw new SecurityException("관리자 권한이 없습니다.");
        }

        Drink drink = Drink.builder()
                .name(request.getName())
                .category(request.getCategory())
                .price(request.getPrice())
                .abvRange(request.getAbvRange())
                .sweetnessLevel(request.getSweetnessLevel())
                .scents(request.getScents() != null ? request.getScents() : new ArrayList<>())
                .tastes(request.getTastes() != null ? request.getTastes() : new ArrayList<>())
                .atmospheres(request.getAtmospheres() != null ? request.getAtmospheres() : new ArrayList<>())
                .imageUrl(request.getImageUrl())
                .build();
        return drinkRepository.save(drink);
    }
}


