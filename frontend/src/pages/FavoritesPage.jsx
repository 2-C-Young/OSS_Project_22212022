import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, Trash2, ArrowLeft } from 'lucide-react';
import { authService } from '../utils/auth';
import { drinkService } from '../utils/drinkService';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchFavorites();
  }, [user, navigate]);

  const fetchFavorites = async () => {
    try {
      const data = await drinkService.getUserFavorites(user.id);
      setFavorites(data);
    } catch (error) {
      console.error('즐겨찾기를 불러오는데 실패했습니다.', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (e, drinkId) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await drinkService.toggleFavorite(user.id, drinkId);
      setFavorites(favorites.filter(item => item.id !== drinkId));
    } catch (error) {
      alert('삭제 실패');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-amber-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold">내 즐겨찾기</h1>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-slate-800">
            <Heart className="mx-auto mb-4 text-slate-700" size={64} />
            <p className="text-slate-400 text-lg mb-6">즐겨찾는 술이 없습니다.</p>
            <Link to="/" className="text-amber-500 hover:text-amber-400 font-semibold underline">술 보러 가기</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((drink) => (
              <Link 
                key={drink.id} 
                to={`/drink/${drink.id}`}
                className="group bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-amber-500/50 transition-all hover:-translate-y-1"
              >
                <div className="h-48 bg-slate-800 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
                  <span className="text-slate-600 font-bold uppercase tracking-widest italic text-2xl group-hover:scale-110 transition-transform">{drink.category}</span>
                  <button 
                    onClick={(e) => handleRemove(e, drink.id)}
                    className="absolute top-4 right-4 p-2 bg-slate-950/80 hover:bg-red-500/80 rounded-full text-white transition-colors backdrop-blur-sm"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg group-hover:text-amber-500 transition-colors">{drink.name}</h3>
                    <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">{drink.abv_range}%</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {drink.scents?.slice(0, 2).map((scent, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-slate-800 rounded-full text-slate-400">#{scent}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;