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
    '깔끔함', '꽃', '알코올', '캬라멜', '나무', '씀', '담'
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

      // 결과를 렌더링한 후 스크롤을 부드럽게 이동시킵니다.
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
        className="flex items-center text-slate-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" /> 뒤로 가기
      </button>

      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-amber-500/20 rounded-2xl">
            <Sparkles className="text-amber-500" size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">맞춤 술 추천</h2>
            <p className="text-slate-400 text-sm">당신의 취향을 알려주세요.</p>
          </div>
        </div>

        <div className="space-y-10">
          {/* 가격대 조절 */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="font-bold text-slate-200">가격대</label>
              <span className="text-amber-500 font-mono font-bold">
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
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>0원</span>
              <span>100만원</span>
            </div>
          </div>

          {/* 도수 조절 */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="font-bold text-slate-200">희망 도수 (ABV)</label>
              <span className="text-amber-500 font-mono font-bold">
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
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>0%</span>
              <span>60%</span>
            </div>
          </div>

          {/* 당도 선택 */}
          <div className="space-y-4">
            <label className="font-bold text-slate-200 block">선호하는 당도</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setFilters({...filters, sweetness: num})}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                    filters.sweetness === num 
                      ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/40 translate-y-[-2px]' 
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-slate-500 px-1">
              <span>안 달아요</span>
              <span>매우 달아요</span>
            </div>
          </div>

          {/* 향과 맛 태그 선택 */}
          <div className="space-y-4">
            <label className="font-bold text-slate-200 block">향과 맛 태그</label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 border ${
                    filters.tags.includes(tag)
                      ? 'bg-amber-500/20 border-amber-500 text-amber-500'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
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
            className="w-full bg-amber-600 hover:bg-amber-700 py-4 rounded-2xl text-lg font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Sparkles size={20} /> {loading ? '분석 중...' : '취향대로 추천 받기'}
          </button>
        </div>
      </div>

      {/* 로딩 표시 */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 mt-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-amber-500 mb-4"></div>
          <p className="text-slate-400 text-sm">당신의 취향을 분석하여 최적의 술을 찾고 있습니다...</p>
        </div>
      )}

      {/* 에러 표시 */}
      {error && (
        <div className="mt-8 bg-red-950/20 border border-red-800 text-red-400 p-4 rounded-2xl text-center">
          {error}
        </div>
      )}

      {/* 추천 결과 영역 */}
      {recommendations !== null && !loading && (
        <div ref={resultsRef} className="mt-12 space-y-8 scroll-mt-24">
          <div className="text-center">
            <h3 className="text-2xl font-bold flex items-center justify-center gap-2">
              <Sparkles className="text-amber-500" size={24} /> 당신만을 위한 추천 결과
            </h3>
            <p className="text-slate-400 text-sm mt-2">
              최대 {filters.price.toLocaleString()}원, 희망 도수 {filters.abv}% 기준 (오차 ±4% 내) 최적의 매칭 결과입니다.
            </p>
          </div>

          {recommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendations.map((drink, idx) => (
                <Link
                  key={drink.id}
                  to={`/drink/${drink.id}`}
                  className="group bg-slate-900 rounded-3xl border border-slate-800 p-6 transition-all hover:border-amber-500 hover:-translate-y-2 shadow-2xl relative overflow-hidden flex flex-col justify-between"
                >
                  {/* 순위 배지 */}
                  <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full shadow-md z-10">
                    {idx + 1}위 매칭
                  </div>

                  <div>
                    {/* 이미지 프레임 */}
                    <div className="aspect-video bg-slate-800/50 rounded-2xl mb-6 flex items-center justify-center text-slate-600 overflow-hidden relative border border-slate-800/80">
                      <Wine size={40} className="opacity-20 group-hover:scale-110 transition-transform" />
                      <span className="absolute bottom-2 text-[9px] opacity-30 uppercase tracking-widest">{drink.category}</span>
                    </div>

                    {/* 술 정보 */}
                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full font-bold border border-amber-500/20">
                          {drink.category}
                        </span>
                        <h4 className="text-xl font-bold mt-2 text-white group-hover:text-amber-500 transition-colors">
                          {drink.name}
                        </h4>
                      </div>

                      <div className="flex justify-between items-center text-sm border-y border-slate-800/80 py-2">
                        <span className="text-slate-400">도수: <strong className="text-slate-200">{drink.abv_range}%</strong></span>
                        <span className="text-slate-400">가격: <strong className="text-slate-200">₩{drink.price?.toLocaleString()}</strong></span>
                      </div>

                      {/* 당도 */}
                      <div className="space-y-1">
                        <span className="text-xs text-slate-400">당도</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <div 
                              key={s} 
                              className={`h-1.5 flex-1 rounded-full ${s <= drink.sweetness_level ? 'bg-amber-500' : 'bg-slate-800'}`}
                            ></div>
                          ))}
                        </div>
                      </div>

                      {/* 태그 목록 */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {[...(drink.scents || []), ...(drink.tastes || [])].slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-800 text-slate-400 px-2.5 py-1 rounded-lg border border-slate-700">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/60 text-center text-xs font-bold text-amber-500 group-hover:underline flex items-center justify-center gap-1">
                    상세 정보 및 즐겨찾기 <ArrowLeft size={12} className="rotate-180" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-dashed border-slate-800">
              <Wine size={48} className="text-slate-700 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-slate-300">매칭된 술이 없습니다</h4>
              <p className="text-slate-500 text-sm mt-1">가격이나 도수 범위를 조금 넓혀서 시도해 보세요.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecommendationPage;