import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const drinkService = {
  // 모든 술 목록 조회
  getAllDrinks: async () => {
    const response = await axios.get(`${API_URL}/drinks`);
    return response.data;
  },

  // 단일 술 상세 조회
  getDrinkById: async (id) => {
    const response = await axios.get(`${API_URL}/drinks/${id}`);
    return response.data;
  },

  // 사용자의 즐겨찾기 목록 조회
  getUserFavorites: async (userId) => {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    const drinkIds = response.data.favorites || [];
    
    if (drinkIds.length === 0) return [];

    // 개별 술 정보를 가져오기 위해 쿼리 생성 (id=1&id=2...)
    const query = drinkIds.map(id => `id=${id}`).join('&');
    const drinksResponse = await axios.get(`${API_URL}/drinks?${query}`);
    return drinksResponse.data;
  },

  // 즐겨찾기 추가/삭제 토글
  toggleFavorite: async (userId, drinkId) => {
    const userRes = await axios.get(`${API_URL}/users/${userId}`);
    const user = userRes.data;
    let favorites = user.favorites || [];

    if (favorites.includes(drinkId)) {
      favorites = favorites.filter(id => id !== drinkId);
    } else {
      favorites = [...favorites, drinkId];
    }

    const response = await axios.patch(`${API_URL}/users/${userId}`, { favorites });
    return response.data;
  },

  // 즐겨찾기 여부 확인
  isFavorite: async (userId, drinkId) => {
    const userRes = await axios.get(`${API_URL}/users/${userId}`);
    const user = userRes.data;
    const favorites = user.favorites || [];
    return favorites.includes(drinkId);
  }
};