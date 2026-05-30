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
    <div className="max-w-7xl mx-auto px-4 md:px-16 py-12 pt-24">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-surface-container rounded-full transition-colors text-on-surface-variant"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 className="font-serif text-3xl font-bold text-on-background">
            <span className="text-primary">"{query}"</span> 검색 결과
          </h2>
          <p className="text-on-surface-variant mt-1 text-sm">{results.length}개의 술을 찾았습니다.</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-on-surface-variant">검색 중...</div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((drink) => (
            <Link 
              to={`/drink/${drink.id}`} 
              key={drink.id} 
              className="group glass-card rounded-2xl border border-white/5 overflow-hidden hover:border-primary/50 transition-all hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="aspect-[3/4] bg-surface-container-low flex items-center justify-center text-on-surface-variant/20 overflow-hidden relative border-b border-white/5">
                <Wine size={64} className="opacity-20 group-hover:scale-110 transition-transform duration-500" />
                <span className="absolute text-[10px] bottom-2 opacity-30 tracking-wider">NO IMAGE</span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <span className="text-[10px] bg-tertiary-fixed text-on-tertiary-fixed-variant px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      {drink.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-lg text-on-surface group-hover:text-primary transition-colors">{drink.name}</h4>
                </div>
                <div className="flex justify-between items-center text-xs text-on-surface-variant pt-2 border-t border-white/5">
                  <span>{drink.abv_range}% Alc.</span>
                  <span className="text-primary font-bold">₩{drink.price.toLocaleString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-surface/50 rounded-3xl border border-white/5 glass-card">
          <div className="inline-block p-6 bg-surface-container rounded-full mb-6">
            <SearchIcon size={48} className="text-on-surface-variant/30" />
          </div>
          <h3 className="text-xl font-bold text-on-background">검색 결과가 없습니다</h3>
          <p className="text-on-surface-variant mt-2 text-sm">다른 이름으로 검색해 보시겠어요?</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-8 text-primary font-bold hover:underline"
          >
            홈으로 돌아가기
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;