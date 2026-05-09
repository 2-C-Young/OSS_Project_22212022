import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// 라우트 import
import authRoutes from './routes/auth.js';
import drinkRoutes from './routes/drinks.js';
import recommendationRoutes from './routes/recommendation.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어
app.use(cors());
app.use(express.json());

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB 연결 성공'))
  .catch(err => console.error('❌ MongoDB 연결 실패:', err));

// API 라우트
app.use('/api/auth', authRoutes);
app.use('/api/drinks', drinkRoutes);
app.use('/api/recommendations', recommendationRoutes);

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ message: 'Alcoholic API Server' });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 서버가 포트 ${PORT}에서 실행 중입니다.`);
});
