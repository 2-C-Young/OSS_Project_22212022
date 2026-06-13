import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, Check, Wine } from 'lucide-react';
import { drinkService } from '../utils/drinkService';

const RecommendationPage = () => {
  const navigate = useNavigate();
  const resultsRef = useRef(null);
  const [filters, setFilters] = useState({
    price: 50000,
    abv: 15,
    sweetness: 3,
    tags: []
  });

  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const availableTags = [
    '깔끔함', '꽃', '알코올', '캬라멜', '나무', '씀', '단맛'
  ];

  const handleTagToggle = (tag) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleRecommend = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await drinkService.recommendDrinks(filters);
      setRecommendations(results);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      console.error(err);
      setError(err.message || '추천 결과를 가져오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 pt-24">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-on-surface-variant hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" /> 뒤로 가기
      </button>

      <div className="bg-surface rounded-3xl border border-white/5 p-8 shadow-2xl glass-card">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
            <Sparkles className="text-primary" size={28} />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-on-background">맞춤 술 추천</h2>
            <p className="text-on-surface-variant text-sm">당신의 취향을 알려주세요.</p>
          </div>
        </div>

        <div className="space-y-10">
          {/* 가격대 조절 */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="font-bold text-on-surface-variant text-sm">가격대</label>
              <span className="text-primary font-bold">
                {filters.price.toLocaleString()}원 이하
              </span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="1000000" 
              step="10000"
              value={filters.price}
              onChange={(e) => setFilters({...filters, price: parseInt(e.target.value)})}
              className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-on-surface-variant/50">
              <span>0원</span>
              <span>100만원</span>
            </div>
          </div>

          {/* 도수 조절 */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="font-bold text-on-surface-variant text-sm">희망 도수 (ABV)</label>
              <span className="text-primary font-bold">
                약 {filters.abv}%
              </span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="60" 
              step="1"
              value={filters.abv}
              onChange={(e) => setFilters({...filters, abv: parseInt(e.target.value)})}
              className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-on-surface-variant/50">
              <span>0%</span>
              <span>60%</span>
            </div>
          </div>

          {/* 당도 선택 */}
          <div className="space-y-4">
            <label className="font-bold text-on-surface-variant text-sm block">선호하는 당도</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setFilters({...filters, sweetness: num})}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                    filters.sweetness === num 
                      ? 'bg-primary text-on-primary shadow-lg translate-y-[-2px]' 
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-on-surface-variant/50 px-1">
              <span>안 달아요</span>
              <span>매우 달아요</span>
            </div>
          </div>

          {/* 향과 맛 태그 선택 */}
          <div className="space-y-4">
            <label className="font-bold text-on-surface-variant text-sm block">향과 맛 태그</label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 border ${
                    filters.tags.includes(tag)
                      ? 'bg-primary/20 border-primary text-primary'
                      : 'bg-surface-container border-white/5 text-on-surface-variant hover:border-on-surface-variant/50'
                  }`}
                >
                  {filters.tags.includes(tag) && <Check size={14} />}
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleRecommend}
            disabled={loading}
            className="w-full bg-secondary-container hover:bg-secondary text-on-secondary-container py-4 rounded-2xl text-lg font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Sparkles size={20} /> {loading ? '분석 중...' : '취향대로 추천 받기'}
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-16 mt-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mb-4"></div>
          <p className="text-on-surface-variant text-sm">당신의 취향을 분석하여 최적의 술을 찾고 있습니다...</p>
        </div>
      )}

      {error && (
        <div className="mt-8 bg-error/10 border border-error text-error p-4 rounded-2xl text-center">
          {error}
        </div>
      )}

      {recommendations !== null && !loading && (
        <div ref={resultsRef} className="mt-12 space-y-8 scroll-mt-24">
          <div className="text-center">
            <h3 className="font-serif text-2xl font-bold flex items-center justify-center gap-2">
              <Sparkles className="text-primary" size={24} /> 당신만을 위한 추천 결과
            </h3>
            <p className="text-on-surface-variant text-sm mt-2">
              최대 {filters.price.toLocaleString()}원, 희망 도수 {filters.abv}% 기준 최적의 매칭 결과입니다.
            </p>
          </div>

          {recommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendations.map((drink, idx) => (
                <Link
                  key={drink.id}
                  to={`/drink/${drink.id}`}
                  className="group glass-card rounded-3xl border border-white/5 p-6 transition-all hover:border-primary hover:-translate-y-2 shadow-2xl relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="absolute top-4 left-4 bg-primary text-on-primary text-xs font-extrabold px-3 py-1 rounded-full shadow-md z-10">
                    {idx + 1}위 매칭
                  </div>

                  <div>
                    <div className="aspect-video bg-surface-container-low rounded-2xl mb-6 flex items-center justify-center text-on-surface-variant/20 overflow-hidden relative border border-white/5">
                      {drink.image_url ? (
                        <img src={drink.image_url} alt={drink.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      ) : (
                        <>
                          <Wine size={40} className="opacity-20 group-hover:scale-110 transition-transform" />
                          <span className="absolute bottom-2 text-[9px] opacity-30 uppercase tracking-widest">{drink.category}</span>
                        </>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold border border-primary/20">
                          {drink.category}
                        </span>
                        <h4 className="text-xl font-bold mt-2 text-white group-hover:text-primary transition-colors">
                          {drink.name}
                        </h4>
                      </div>

                      <div className="flex justify-between items-center text-sm border-y border-white/5 py-2">
                        <span className="text-on-surface-variant">도수: <strong className="text-on-surface">{drink.abv_range}%</strong></span>
                        <span className="text-on-surface-variant">가격: <strong className="text-on-surface">₩{drink.price?.toLocaleString()}</strong></span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-xs text-on-surface-variant">당도</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <div 
                              key={s} 
                              className={`h-1.5 flex-1 rounded-full ${s <= drink.sweetness_level ? 'bg-primary' : 'bg-surface-container-highest'}`}
                            ></div>
                          ))}
                        </div>
                      </div>

                      {drink.scents && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {[...(drink.scents || []), ...(drink.tastes || [])].slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="text-[10px] bg-surface-container text-on-surface-variant px-2.5 py-1 rounded-lg border border-white/5">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 text-center text-xs font-bold text-primary group-hover:underline flex items-center justify-center gap-1">
                    상세 정보 및 즐겨찾기 <ArrowLeft size={12} className="rotate-180" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-surface/40 rounded-3xl border border-dashed border-white/5 glass-card">
              <Wine size={48} className="text-on-surface-variant/30 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-on-surface">매칭된 술이 없습니다</h4>
              <p className="text-on-surface-variant text-sm mt-1">가격이나 도수 범위를 조금 넓혀서 시도해 보세요.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecommendationPage;