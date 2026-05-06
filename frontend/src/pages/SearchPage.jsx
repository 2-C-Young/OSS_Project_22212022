import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { drinkService } from '../utils/drinkService';
import { Wine, ArrowLeft, Search as SearchIcon } from 'lucide-react';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        // 실제 검색 로직은 나중에 구현하므로, 지금은 전체 데이터를 가져와서 클라이언트 사이드에서 필터링하는 시늉만 합니다.
        const allDrinks = await drinkService.getAllDrinks();
        const filtered = allDrinks.filter(drink => 
          drink.name.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
      } catch (err) {
        console.error("검색 중 오류 발생:", err);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-800 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 className="text-3xl font-bold italic">
            <span className="text-amber-500">"{query}"</span> 검색 결과
          </h2>
          <p className="text-slate-400 mt-1">{results.length}개의 술을 찾았습니다.</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-500">검색 중...</div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((drink) => (
            <Link 
              to={`/drink/${drink.id}`} 
              key={drink.id} 
              className="group bg-slate-900 rounded-2xl border border-slate-800 p-4 transition-all hover:border-amber-500 hover:-translate-y-2 shadow-lg"
            >
              <div className="aspect-square bg-slate-800 rounded-xl mb-4 flex items-center justify-center text-slate-600 overflow-hidden relative">
                <Wine size={48} className="opacity-20 translate-y-2 group-hover:scale-110 transition-transform" />
                <span className="absolute text-[10px] bottom-2 opacity-30">NO IMAGE</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-lg">{drink.name}</h4>
                  <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">{drink.abv_range}%</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  <span className="text-[10px] bg-amber-900/30 text-amber-500 px-2 py-0.5 rounded-full ring-1 ring-amber-500/30">{drink.category}</span>
                </div>
                <p className="text-sm text-slate-500 mt-2">가격: {drink.price.toLocaleString()}원</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-slate-900/50 rounded-3xl border border-dashed border-slate-800">
          <div className="inline-block p-6 bg-slate-800 rounded-full mb-6">
            <SearchIcon size={48} className="text-slate-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-300">검색 결과가 없습니다</h3>
          <p className="text-slate-500 mt-2">다른 이름으로 검색해 보시겠어요?</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-8 text-amber-500 font-bold hover:underline"
          >
            홈으로 돌아가기
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;