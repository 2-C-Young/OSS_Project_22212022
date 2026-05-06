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
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">반가워요!</h2>
        <p className="text-slate-400 text-center mb-8">ALCOHOLIC에 로그인하세요.</p>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-xl mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">아이디</label>
            <input 
              type="text" 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-sans"
              placeholder="아이디를 입력하세요"
              value={formData.id}
              onChange={(e) => setFormData({...formData, id: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">비밀번호</label>
            <input 
              type="password" 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-sans"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95">
            로그인
          </button>
        </form>
        
        <p className="mt-8 text-center text-slate-400 text-sm">
          계정이 없으신가요? <Link to="/signup" className="text-amber-500 hover:underline">회원가입</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;