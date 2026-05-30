import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../utils/auth';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    id: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (!formData.id || !formData.password) {
        throw new Error('아이디와 비밀번호를 입력해주세요.');
      }

      await authService.login(formData.id, formData.password);
      window.dispatchEvent(new Event('storage')); // 네비게이션 바 갱신을 위한 이벤트
      navigate('/');
    } catch (err) {
      setError(err.message || '로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-background px-4 pt-16">
      <div className="w-full max-w-md bg-surface p-8 rounded-3xl border border-white/5 shadow-2xl glass-card">
        <h2 className="text-3xl font-serif font-bold text-on-background mb-2 text-center">반가워요!</h2>
        <p className="text-on-surface-variant text-center mb-8">ALCOHOLIC에 로그인하세요.</p>
        
        {error && (
          <div className="bg-error/10 border border-error text-error p-3 rounded-xl mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-on-surface-variant mb-2">아이디</label>
            <input 
              type="text" 
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all font-sans"
              placeholder="아이디를 입력하세요"
              value={formData.id}
              onChange={(e) => setFormData({...formData, id: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-on-surface-variant mb-2">비밀번호</label>
            <input 
              type="password" 
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all font-sans"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button type="submit" className="w-full bg-primary hover:bg-primary-container text-on-primary font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95">
            로그인
          </button>
        </form>
        
        <p className="mt-8 text-center text-on-surface-variant text-sm">
          계정이 없으신가요? <Link to="/signup" className="text-primary hover:underline font-bold">회원가입</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;