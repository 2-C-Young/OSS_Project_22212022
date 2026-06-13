import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft, Droplets, Flame, Wind, GlassWater } from 'lucide-react';
import { authService } from '../utils/auth';
import { drinkService } from '../utils/drinkService';

const DrinkDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [drink, setDrink] = useState(null);
  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = authService.getCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const drinkData = await drinkService.getDrinkById(id);
        setDrink(drinkData);
        
        if (user) {
          const favStatus = await drinkService.isFavorite(user.id, id);
          setIsFav(favStatus);
        }
      } catch (error) {
        console.error('데이터 로딩 실패', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, user]);

  const handleToggleFav = async () => {
    if (!user) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }
    try {
      await drinkService.toggleFavorite(user.id, id);
      setIsFav(!isFav);
    } catch (error) {
      alert('즐겨찾기 업데이트에 실패했습니다.');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-background text-on-background flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
    </div>
  );

  if (!drink) return (
    <div className="min-h-screen bg-background text-on-background flex flex-col items-center justify-center">
      <p className="text-xl mb-4 text-on-surface-variant">해당 술 정보를 찾을 수 없습니다.</p>
      <button onClick={() => navigate(-1)} className="text-primary font-bold underline">뒤로 가기</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-on-background pt-24 pb-12 px-4 md:px-16">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-on-surface-variant hover:text-white mb-8 transition-colors">
          <ArrowLeft size={20} /> 뒤로 가기
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* 이미지 섹션 */}
          <div className="glass-card rounded-3xl border border-white/5 aspect-square flex items-center justify-center relative overflow-hidden">
            {drink.image_url ? (
              <img src={drink.image_url} alt={drink.name} className="w-full h-full object-cover" />
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"></div>
                <span className="text-on-surface-variant/10 font-serif font-bold uppercase tracking-[0.5em] italic text-4xl select-none">
                  {drink.category}
                </span>
              </>
            )}
          </div>

          {/* 정보 섹션 */}
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20">
                  {drink.category}
                </span>
                <button 
                  onClick={handleToggleFav}
                  className={`p-3 rounded-2xl border transition-all ${
                    isFav 
                    ? 'bg-primary border-primary text-on-primary shadow-[0_0_15px_rgba(242,202,80,0.4)]' 
                    : 'bg-surface border-white/5 text-on-surface-variant hover:border-primary/50 hover:text-primary'
                  }`}
                >
                  <Heart size={24} fill={isFav ? "currentColor" : "none"} />
                </button>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-on-background mb-2">{drink.name}</h1>
              <p className="text-2xl text-primary font-bold">₩{drink.price?.toLocaleString() || '가격 미정'}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 text-on-surface-variant mb-1 text-sm">
                  <Flame size={16} /> 도수
                </div>
                <div className="text-xl font-bold">{drink.abv_range}%</div>
              </div>
              <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 text-on-surface-variant mb-1 text-sm">
                  <Droplets size={16} /> 당도
                </div>
                <div className="flex gap-1 mt-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div 
                      key={s} 
                      className={`h-2 flex-1 rounded-full ${s <= drink.sweetness_level ? 'bg-primary' : 'bg-surface-container-highest'}`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {drink.scents && drink.scents.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2"><Wind size={20} className="text-primary" /> 향과 맛</h3>
                <div className="flex flex-wrap gap-2">
                  {[...(drink.scents || []), ...(drink.tastes || [])].map((tag, idx) => (
                    <span key={idx} className="bg-surface-container px-4 py-2 rounded-xl text-on-surface-variant border border-white/5 text-sm">#{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {drink.atmospheres && drink.atmospheres.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2"><GlassWater size={20} className="text-primary" /> 추천 분위기</h3>
                <div className="flex flex-wrap gap-2">
                  {drink.atmospheres?.map((atm, idx) => (
                    <span key={idx} className="bg-primary/5 px-4 py-2 rounded-xl text-primary border border-primary/20 text-sm">{atm}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinkDetailPage;