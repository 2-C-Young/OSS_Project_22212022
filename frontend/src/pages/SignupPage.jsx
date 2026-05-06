import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../utils/auth';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (!formData.name || !formData.id || !formData.password) {
        throw new Error('모든 필드를 입력해주세요.');
      }
      
      await authService.signup({
        nickname: formData.name,
        id: formData.id,
        password: formData.password
      });
      
      alert('회원가입이 완료되었습니다! 로그인해주세요.');
      navigate('/login');
    } catch (err) {
      setError(err.message || '회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">회원가입</h2>
        <p className="text-slate-400 text-center mb-8">나만의 바를 만들어보세요.</p>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-xl mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">이름</label>
            <input 
              type="text" 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-sans"
              placeholder="이름을 입력하세요"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">아이디</label>
            <input 
              type="text" 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-sans"
              placeholder="사용하실 아이디"
              value={formData.id}
              onChange={(e) => setFormData({...formData, id: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">비밀번호</label>
            <input 
              type="password" 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-sans"
              placeholder="비밀번호 설정"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95 mt-4">
            회원가입 완료
          </button>
        </form>
        
        <p className="mt-8 text-center text-slate-400 text-sm">
          이미 계정 이 있나요? <Link to="/login" className="text-amber-500 hover:underline">로그인</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;