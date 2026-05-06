import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowLeft, Check } from 'lucide-react';

const RecommendationPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    price: 50000,
    abv: 15,
    sweetness: 3,
    tags: []
  });

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

  const handleRecommend = () => {
    // 실제 검색 로직은 추후 구현
    console.log('Selected filters:', filters);
    alert('추천 기능을 준비 중입니다!');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
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
            className="w-full bg-amber-600 hover:bg-amber-700 py-4 rounded-2xl text-lg font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl mt-4 flex items-center justify-center gap-2"
          >
            <Sparkles size={20} /> 취향대로 추천 받기
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationPage;