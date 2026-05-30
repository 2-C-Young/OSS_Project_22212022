import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, ArrowLeft, CheckCircle2, ShieldAlert } from 'lucide-react';
import { drinkService } from '../utils/drinkService';
import { authService } from '../utils/auth';

const AddDrinkPage = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    category: '소주',
    price: '',
    abvRange: '',
    sweetnessLevel: 3,
    scents: '',
    tastes: '',
    atmospheres: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const user = authService.getCurrentUser();

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      setIsAdmin(false);
      const timer = setTimeout(() => {
        navigate('/');
      }, 3000);
      setCheckingAuth(false);
      return () => clearTimeout(timer);
    } else {
      setIsAdmin(true);
      setCheckingAuth(false);
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || user.role !== 'ADMIN') {
      setError('관리자 권한이 없습니다.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    const parseTags = (tagStr) => {
      if (!tagStr.trim()) return [];
      return tagStr.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    };

    const drinkData = {
      name: formData.name,
      category: formData.category,
      price: parseInt(formData.price) || 0,
      abv_range: parseFloat(formData.abvRange) || 0.0,
      sweetness_level: formData.sweetnessLevel,
      scents: parseTags(formData.scents),
      tastes: parseTags(formData.tastes),
      atmospheres: parseTags(formData.atmospheres)
    };

    if (!drinkData.name.trim()) {
      setError('술 이름을 입력해 주세요.');
      setLoading(false);
      return;
    }

    try {
      await drinkService.createDrink(drinkData, user.id);
      setSuccess(true);
      setFormData({
        name: '',
        category: '소주',
        price: '',
        abvRange: '',
        sweetnessLevel: 3,
        scents: '',
        tastes: '',
        atmospheres: ''
      });
      alert('술이 성공적으로 등록되었습니다!');
    } catch (err) {
      console.error(err);
      setError(err.message || '술 등록 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-background text-on-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 pt-32 text-center">
        <div className="bg-surface rounded-3xl border border-white/5 p-8 shadow-2xl space-y-6 glass-card">
          <div className="flex justify-center">
            <div className="p-4 bg-error/10 rounded-full border border-error/20 text-error">
              <ShieldAlert size={48} />
            </div>
          </div>
          <h2 className="text-2xl font-serif font-bold text-on-background">접근 권한이 없습니다</h2>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            이 페이지는 관리자 전용 메뉴입니다.<br />
            일반 사용자는 접근할 수 없습니다.<br />
            <span className="text-primary font-bold">3초 후 홈 화면으로 리다이렉트됩니다.</span>
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-surface-container hover:bg-surface-container-high py-3 rounded-xl font-bold transition-all text-sm text-on-surface"
          >
            즉시 홈으로 이동
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 pt-24">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-on-surface-variant hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" /> 뒤로 가기
      </button>

      <div className="bg-surface rounded-3xl border border-white/5 p-8 shadow-2xl glass-card">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
            <PlusCircle className="text-primary" size={28} />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-on-background">새 주류 등록</h2>
            <p className="text-on-surface-variant text-sm">데이터베이스에 수기로 새로운 술 정보를 추가합니다.</p>
          </div>
        </div>

        {success && (
          <div className="mb-6 bg-emerald-950/20 border border-emerald-800 text-emerald-400 p-4 rounded-2xl flex items-center gap-2">
            <CheckCircle2 size={20} />
            <span>주류 정보가 정상적으로 추가되었습니다! 홈에서 즉시 확인하실 수 있습니다.</span>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-error/10 border border-error text-error p-4 rounded-2xl text-center text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-bold text-on-surface-variant block text-sm">술 이름 *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="예: 발베니 12년, 한라산"
                className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="font-bold text-on-surface-variant block text-sm">카테고리 *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all text-white"
              >
                <option value="소주">소주</option>
                <option value="맥주">맥주</option>
                <option value="위스키">위스키</option>
                <option value="전통주">전통주</option>
                <option value="와인">와인</option>
                <option value="기타">기타</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-bold text-on-surface-variant block text-sm">가격 (원) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="예: 1500, 110000"
                className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="font-bold text-on-surface-variant block text-sm">도수 (ABV, %) *</label>
              <input
                type="number"
                step="0.1"
                name="abvRange"
                value={formData.abvRange}
                onChange={handleChange}
                placeholder="예: 16.5, 40.0"
                className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-bold text-on-surface-variant block text-sm">당도 (1: 안달고 ~ 5: 매우달콤)</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => setFormData({ ...formData, sweetnessLevel: num })}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                    formData.sweetnessLevel === num 
                      ? 'bg-primary text-on-primary shadow-md' 
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-bold text-on-surface-variant block text-sm">향 태그 (쉼표로 구분)</label>
            <input
              type="text"
              name="scents"
              value={formData.scents}
              onChange={handleChange}
              placeholder="예: 알코올, 과일, 꽃, 나무, 바닐라"
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all text-white text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold text-on-surface-variant block text-sm">맛 태그 (쉼표로 구분)</label>
            <input
              type="text"
              name="tastes"
              value={formData.tastes}
              onChange={handleChange}
              placeholder="예: 깔끔함, 씀, 단맛, 탄산, 상큼함"
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all text-white text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold text-on-surface-variant block text-sm">추천 분위기 태그 (쉼표로 구분)</label>
            <input
              type="text"
              name="atmospheres"
              value={formData.atmospheres}
              onChange={handleChange}
              placeholder="예: 회식, 친구, 혼술, 바, 연인, 축구"
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all text-white text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary-container hover:bg-secondary text-on-secondary-container py-4 rounded-2xl text-lg font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl mt-6 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? '등록 중...' : '새 주류 등록 완료'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDrinkPage;
