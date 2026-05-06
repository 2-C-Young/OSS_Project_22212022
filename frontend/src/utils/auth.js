import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const authService = {
  // 회원가입
  signup: async (userData) => {
    // 중복 아이디 체크
    const response = await axios.get(`${API_URL}/users?id=${userData.id}`);
    if (response.data.length > 0) {
      throw new Error('이미 존재하는 아이디입니다.');
    }
    
    // 깔끔하게 사용자가 입력한 데이터만 저장 (json-server 구 버전은 이를 유지함)
    const newUser = {
      id: userData.id,
      nickname: userData.nickname,
      password: userData.password,
      favorites: []
    };
    
    return axios.post(`${API_URL}/users`, newUser);
  },

  // 로그인
  login: async (id, password) => {
    // id 필드로 직접 조회
    const response = await axios.get(`${API_URL}/users?id=${id}&password=${password}`);
    if (response.data.length === 0) {
      throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
    
    const user = response.data[0];
    localStorage.setItem('user', JSON.stringify({
      id: user.id,
      nickname: user.nickname
    }));
    
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