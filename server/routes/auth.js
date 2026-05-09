import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// 회원가입
router.post('/signup', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: '사용자명과 비밀번호는 필수입니다.' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: '이미 존재하는 사용자명입니다.' });
    }

    const user = new User({ username, password, email });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.status(201).json({
      message: '회원가입 성공',
      userId: user._id,
      username: user.username,
      token
    });
  } catch (error) {
    res.status(500).json({ message: '회원가입 실패', error: error.message });
  }
});

// 로그인
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: '사용자명과 비밀번호는 필수입니다.' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: '사용자명 또는 비밀번호가 잘못되었습니다.' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: '사용자명 또는 비밀번호가 잘못되었습니다.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.json({
      message: '로그인 성공',
      userId: user._id,
      username: user.username,
      token
    });
  } catch (error) {
    res.status(500).json({ message: '로그인 실패', error: error.message });
  }
});

// 사용자 정보 조회 (인증 필요)
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('favorites');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: '사용자 정보 조회 실패', error: error.message });
  }
});

export default router;
