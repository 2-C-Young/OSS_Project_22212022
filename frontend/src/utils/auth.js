import { supabase } from '../lib/supabaseClient';

export const authService = {
  // 회원가입
  signup: async (userData) => {
    const { id, nickname, password } = userData;

    const { data: existingUsers, error: existingError } = await supabase
      .from('users')
      .select('id')
      .eq('id', id)
      .limit(1);

    if (existingError) {
      throw new Error(existingError.message);
    }

    if (existingUsers.length > 0) {
      throw new Error('이미 존재하는 아이디입니다.');
    }

    const { data, error } = await supabase
      .from('users')
      .insert({ id, nickname, password, favorites: [] })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  // 로그인
  login: async (id, password) => {
    const { data, error } = await supabase
      .from('users')
      .select('id, nickname')
      .eq('id', id)
      .eq('password', password)
      .single();

    if (error || !data) {
      throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');
    }

    const user = {
      id: data.id,
      nickname: data.nickname
    };

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
