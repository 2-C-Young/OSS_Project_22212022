import express from 'express';
import Drink from '../models/Drink.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// 점수 계산 함수들
function calculatePriceScore(price, min, max) {
  if (price < min || price > max) return 0;
  const mid = (min + max) / 2;
  const distance = Math.abs(price - mid);
  const maxDistance = (max - min) / 2;
  return 1 - (distance / maxDistance) * 0.5;
}

function calculateABVScore(abv, min, max) {
  if (abv < min || abv > max) return 0;
  return 1;
}

function calculateSweetnessScore(drinkSweetness, userSweetness) {
  const diff = Math.abs(drinkSweetness - userSweetness);
  return Math.max(0, 1 - (diff / 5) * 0.3);
}

function calculateTagScore(drinkTags, userTags) {
  if (!drinkTags || drinkTags.length === 0 || userTags.length === 0) return 0;
  const matches = drinkTags.filter(tag => userTags.includes(tag)).length;
  return matches / userTags.length;
}

function calculateRecommendationScore(drink, filters) {
  let score = 0;
  let totalWeight = 0;

  // 가격 점수 (25점)
  if (filters.priceMin !== undefined && filters.priceMax !== undefined) {
    const priceScore = calculatePriceScore(drink.price, filters.priceMin, filters.priceMax);
    score += priceScore * 25;
    totalWeight += 25;
  }

  // 도수 점수 (20점)
  if (filters.abvMin !== undefined && filters.abvMax !== undefined) {
    const abvScore = calculateABVScore(drink.abv, filters.abvMin, filters.abvMax);
    score += abvScore * 20;
    totalWeight += 20;
  }

  // 당도 점수 (15점)
  if (filters.sweetness !== undefined) {
    const sweetnessScore = calculateSweetnessScore(drink.sweetness, filters.sweetness);
    score += sweetnessScore * 15;
    totalWeight += 15;
  }

  // 향 점수 (20점)
  if (filters.scents && filters.scents.length > 0) {
    const scentsScore = calculateTagScore(drink.scents, filters.scents);
    score += scentsScore * 20;
    totalWeight += 20;
  }

  // 맛 점수 (20점)
  if (filters.tastes && filters.tastes.length > 0) {
    const tastesScore = calculateTagScore(drink.tastes, filters.tastes);
    score += tastesScore * 20;
    totalWeight += 20;
  }

  return totalWeight > 0 ? (score / totalWeight) * 100 : 0;
}

// 추천 API
router.post('/recommend', async (req, res) => {
  try {
    const { priceMin, priceMax, abvMin, abvMax, sweetness, scents, tastes } = req.body;

    // 가격/도수 범위로 1차 필터링
    const query = {};
    
    if (priceMin !== undefined && priceMax !== undefined) {
      query.price = { $gte: priceMin, $lte: priceMax };
    }
    
    if (abvMin !== undefined && abvMax !== undefined) {
      query.abv = { $gte: abvMin, $lte: abvMax };
    }

    let drinks = await Drink.find(query);

    // 각 술에 점수 계산
    const rankedDrinks = drinks.map(drink => ({
      ...drink.toObject(),
      score: calculateRecommendationScore(drink, {
        priceMin,
        priceMax,
        abvMin,
        abvMax,
        sweetness,
        scents,
        tastes
      })
    }));

    // 점수 높은 순서대로 정렬
    rankedDrinks.sort((a, b) => b.score - a.score);

    // 상위 10개 반환
    const recommendations = rankedDrinks.slice(0, 10);

    res.json({
      message: '추천 완료',
      count: recommendations.length,
      recommendations
    });
  } catch (error) {
    res.status(500).json({ message: '추천 실패', error: error.message });
  }
});

export default router;
