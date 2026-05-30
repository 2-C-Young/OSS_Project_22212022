import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wine, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { drinkService } from '../utils/drinkService';

const DrinkListPage = () => {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const data = await drinkService.getAllDrinks();
        setDrinks(data || []);
      } catch (err) {
        console.error("술 목록을 불러오는 중 오류 발생:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDrinks();
  }, []);

  // 페이지네이션 계산
  const totalPages = Math.ceil(drinks.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDrinks = drinks.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return (
    <div className="min-h-screen bg-background text-on-background flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-16 py-12 pt-24 min-h-screen flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-surface-container rounded-full transition-colors text-on-surface-variant"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="space-y-1">
            <h1 className="font-serif text-3xl font-bold text-on-background">전체 술 목록</h1>
            <div className="h-1 w-12 bg-primary rounded-full"></div>
          </div>
        </div>

        {drinks.length === 0 ? (
          <div className="text-center py-20 bg-surface/50 rounded-3xl border border-white/5 glass-card">
            <Wine className="mx-auto mb-4 text-on-surface-variant/30" size={64} />
            <p className="text-on-surface-variant text-lg">등록된 술 정보가 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {currentDrinks.map((drink) => (
              <Link 
                to={`/drink/${drink.id}`} 
                key={drink.id} 
                className="group glass-card rounded-2xl border border-white/5 overflow-hidden hover:border-primary/50 transition-all hover:-translate-y-1 flex flex-col justify-between h-full"
              >
                <div className="aspect-[3/4] bg-surface-container-low flex items-center justify-center text-on-surface-variant/20 overflow-hidden relative border-b border-white/5">
                  <Wine size={56} className="opacity-20 group-hover:scale-110 transition-transform duration-500" />
                  <span className="absolute text-[10px] bottom-2 opacity-30 tracking-wider">NO IMAGE</span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <span className="text-[10px] bg-tertiary-fixed text-on-tertiary-fixed-variant px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                        {drink.category}
                      </span>
                    </div>
                    <h4 className="font-bold text-base text-on-surface group-hover:text-primary transition-colors line-clamp-1">{drink.name}</h4>
                  </div>
                  <div className="flex justify-between items-center text-xs text-on-surface-variant pt-2 border-t border-white/5">
                    <span>{drink.abv_range}% Alc.</span>
                    <span className="text-primary font-bold">₩{drink.price.toLocaleString()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* 페이지네이션 UI */}
      {drinks.length > itemsPerPage && (
        <div className="mt-12 flex justify-center items-center gap-2">
          <button
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-white/5 text-on-surface-variant disabled:opacity-30 disabled:hover:bg-surface-container transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 rounded-xl font-bold transition-all border ${
                currentPage === page
                  ? 'bg-primary border-primary text-on-primary shadow-md'
                  : 'bg-surface-container border-white/5 text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-white/5 text-on-surface-variant disabled:opacity-30 disabled:hover:bg-surface-container transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default DrinkListPage;
