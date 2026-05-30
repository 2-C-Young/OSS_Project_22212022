const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const authService = {
  // 회원가입
  signup: async (userData) => {
    const response = await fetch(`${API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg || '회원가입에 실패했습니다.');
    }

    return await response.json();
  },

  // 로그인
  login: async (id, password) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, password })
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg || '아이디 또는 비밀번호가 일치하지 않습니다.');
    }

    const user = await response.json();
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

