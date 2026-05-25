import { supabase } from '../lib/supabaseClient';

export const drinkService = {
  // 모든 술 목록 조회
  getAllDrinks: async () => {
    const { data, error } = await supabase
      .from('drinks')
      .select('*');

    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  },

  // 단일 술 상세 조회
  getDrinkById: async (id) => {
    const { data, error } = await supabase
      .from('drinks')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  // 사용자의 즐겨찾기 목록 조회
  getUserFavorites: async (userId) => {
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('favorites')
      .eq('id', userId)
      .single();

    if (userError) {
      throw new Error(userError.message);
    }

    const drinkIds = user?.favorites || [];
    if (drinkIds.length === 0) return [];

    const { data: drinks, error: drinksError } = await supabase
      .from('drinks')
      .select('*')
      .in('id', drinkIds);

    if (drinksError) {
      throw new Error(drinksError.message);
    }

    return drinks;
  },

  // 즐겨찾기 추가/삭제 토글
  toggleFavorite: async (userId, drinkId) => {
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('favorites')
      .eq('id', userId)
      .single();

    if (userError) {
      throw new Error(userError.message);
    }

    const currentFavorites = user?.favorites || [];
    const favorites = currentFavorites.includes(drinkId)
      ? currentFavorites.filter((id) => id !== drinkId)
      : [...currentFavorites, drinkId];

    const { data, error } = await supabase
      .from('users')
      .update({ favorites })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  // 즐겨찾기 여부 확인
  isFavorite: async (userId, drinkId) => {
    const { data: user, error } = await supabase
      .from('users')
      .select('favorites')
      .eq('id', userId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    const favorites = user?.favorites || [];
    return favorites.includes(drinkId);
  }
};
