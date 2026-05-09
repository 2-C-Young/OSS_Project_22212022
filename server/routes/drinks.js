import express from 'express';
import Drink from '../models/Drink.js';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// 모든 술 조회
router.get('/', async (req, res) => {
  try {
    const drinks = await Drink.find();
    res.json(drinks);
  } catch (error) {
    res.status(500).json({ message: '술 목록 조회 실패', error: error.message });
  }
});

// 특정 술 조회
router.get('/:id', async (req, res) => {
  try {
    const drink = await Drink.findById(req.params.id);
    if (!drink) {
      return res.status(404).json({ message: '술을 찾을 수 없습니다.' });
    }
    res.json(drink);
  } catch (error) {
    res.status(500).json({ message: '술 조회 실패', error: error.message });
  }
});

// 술 검색 (이름)
router.get('/search/byname', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: '검색어가 필요합니다.' });
    }

    const drinks = await Drink.find({
      name: { $regex: q, $options: 'i' }
    });
    res.json(drinks);
  } catch (error) {
    res.status(500).json({ message: '검색 실패', error: error.message });
  }
});

// 즐겨찾기 추가 (인증 필요)
router.post('/:drinkId/favorite', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user.favorites.includes(req.params.drinkId)) {
      user.favorites.push(req.params.drinkId);
      await user.save();
    }
    res.json({ message: '즐겨찾기 추가됨' });
  } catch (error) {
    res.status(500).json({ message: '즐겨찾기 추가 실패', error: error.message });
  }
});

// 즐겨찾기 제거 (인증 필요)
router.delete('/:drinkId/favorite', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.favorites = user.favorites.filter(id => id.toString() !== req.params.drinkId);
    await user.save();
    res.json({ message: '즐겨찾기 제거됨' });
  } catch (error) {
    res.status(500).json({ message: '즐겨찾기 제거 실패', error: error.message });
  }
});

// 즐겨찾기 목록 조회 (인증 필요)
router.get('/favorites/list', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('favorites');
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: '즐겨찾기 조회 실패', error: error.message });
  }
});

export default router;
