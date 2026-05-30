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
    <div className="min-h-screen bg-background text-on-background flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-on-background pt-24 pb-12 px-4 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-surface-container rounded-full transition-colors text-on-surface-variant">
            <ArrowLeft size={24} />
          </button>
          <div className="space-y-1">
            <h1 className="font-serif text-3xl font-bold text-on-background">내 즐겨찾기</h1>
            <div className="h-1 w-12 bg-primary rounded-full"></div>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-20 bg-surface/50 rounded-3xl border border-white/5 glass-card">
            <Heart className="mx-auto mb-4 text-on-surface-variant/30" size={64} />
            <p className="text-on-surface-variant text-lg mb-6">즐겨찾는 술이 없습니다.</p>
            <Link to="/" className="text-primary hover:text-primary-container font-semibold underline">술 보러 가기</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((drink) => (
              <Link 
                key={drink.id} 
                to={`/drink/${drink.id}`}
                className="group glass-card rounded-2xl border border-white/5 overflow-hidden hover:border-primary/50 transition-all hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="h-48 bg-surface-container-low relative flex items-center justify-center overflow-hidden border-b border-white/5">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
                  <span className="text-on-surface-variant/20 font-serif font-bold uppercase tracking-widest italic text-2xl group-hover:scale-110 transition-transform">{drink.category}</span>
                  <button 
                    onClick={(e) => handleRemove(e, drink.id)}
                    className="absolute top-4 right-4 p-2 bg-background/80 hover:bg-error/80 rounded-full text-white transition-colors backdrop-blur-sm"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-lg text-on-surface group-hover:text-primary transition-colors">{drink.name}</h3>
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
    </div>
  );
};

export default FavoritesPage;