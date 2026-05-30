const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const drinkService = {
  // 모든 술 목록 조회
  getAllDrinks: async () => {
    const response = await fetch(`${API_URL}/api/drinks`);
    if (!response.ok) {
      throw new Error('술 목록을 불러오는 데 실패했습니다.');
    }
    return await response.json();
  },

  // 단일 술 상세 조회
  getDrinkById: async (id) => {
    const response = await fetch(`${API_URL}/api/drinks/${id}`);
    if (!response.ok) {
      throw new Error('술 정보를 불러오는 데 실패했습니다.');
    }
    return await response.json();
  },

  // 사용자의 즐겨찾기 목록 조회
  getUserFavorites: async (userId) => {
    const response = await fetch(`${API_URL}/api/drinks/favorites?userId=${encodeURIComponent(userId)}`);
    if (!response.ok) {
      throw new Error('즐겨찾기 목록을 불러오는 데 실패했습니다.');
    }
    return await response.json();
  },

  // 즐겨찾기 추가/삭제 토글
  toggleFavorite: async (userId, drinkId) => {
    const response = await fetch(`${API_URL}/api/drinks/${drinkId}/favorite?userId=${encodeURIComponent(userId)}`, {
      method: 'POST'
    });
    if (!response.ok) {
      throw new Error('즐겨찾기 상태를 변경하는 데 실패했습니다.');
    }
    return await response.json();
  },

  // 즐겨찾기 여부 확인
  isFavorite: async (userId, drinkId) => {
    const response = await fetch(`${API_URL}/api/drinks/${drinkId}/is-favorite?userId=${encodeURIComponent(userId)}`);
    if (!response.ok) {
      throw new Error('즐겨찾기 여부를 확인하는 데 실패했습니다.');
    }
    return await response.json();
  }
};

