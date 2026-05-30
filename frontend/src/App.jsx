import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { Search, Heart, User, Home, Sparkles, Menu, LogOut, Wine } from 'lucide-react'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import FavoritesPage from './pages/FavoritesPage'
import DrinkDetailPage from './pages/DrinkDetailPage'
import RecommendationPage from './pages/RecommendationPage'
import SearchPage from './pages/SearchPage'
import AddDrinkPage from './pages/AddDrinkPage'
import DrinkListPage from './pages/DrinkListPage'
import { authService } from './utils/auth'
import { drinkService } from './utils/drinkService'

// 메인 홈 섹션
function HomePage() {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        console.log("Fetching drinks...");
        const data = await drinkService.getAllDrinks();
        console.log("Fetched drinks data:", data);
        setDrinks(data || []);
      } catch (err) {
        console.error("데이터 로딩 실패:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDrinks();
  }, []);

  return (
    <>
      <header className="relative overflow-hidden hero-gradient py-20 px-4 md:px-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-6">
        <div className="z-10 space-y-8">
          <div className="space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-on-background leading-tight">
              오늘 밤, 당신에게 <br />
              <span className="text-primary italic">완벽한 한 잔</span>을
            </h2>
            <p className="text-base md:text-lg text-on-surface-variant max-w-md">
              취향, 분위기, 안주까지 고려한 스마트 술 추천 서비스.
            </p>
          </div>
          <button 
            onClick={() => navigate('/recommend')}
            className="bg-secondary-container hover:bg-secondary text-on-secondary-container font-semibold py-4 px-8 rounded-xl premium-glow flex items-center gap-3 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <Sparkles size={20} /> 지금 추천 받기
          </button>
        </div>
        <div className="relative group hidden md:block">
          <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-50"></div>
          <div className="glass-card rounded-3xl overflow-hidden aspect-[4/3] relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10"></div>
            <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant/20 font-serif font-bold uppercase tracking-widest italic text-3xl">Main Visual</div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-16 py-16">
        <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-6">
          <div className="space-y-1">
            <h3 className="font-serif text-2xl md:text-3xl text-on-background">인기 주류 목록</h3>
            <div className="h-1 w-12 bg-primary rounded-full"></div>
          </div>
          <span className="text-sm text-on-surface-variant flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            {drinks.length}개의 술 정보가 있습니다.
          </span>
        </div>

        {loading ? (
          <div className="text-center py-20 text-on-surface-variant">불러오는 중...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {drinks.slice(0, 8).map((drink) => (
              <Link 
                to={`/drink/${drink.id}`} 
                key={drink.id} 
                className="glass-card rounded-2xl group cursor-pointer hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
              >
                <div className="aspect-[3/4] bg-surface-container-low rounded-t-2xl flex items-center justify-center text-on-surface-variant/20 overflow-hidden relative border-b border-white/5">
                  <Wine size={64} className="opacity-20 group-hover:scale-110 transition-transform duration-500" />
                  <span className="absolute text-[10px] bottom-2 opacity-30 tracking-wider">NO IMAGE</span>
                </div>
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <span className="text-[10px] uppercase font-bold text-on-tertiary-fixed-variant tracking-tighter bg-tertiary-fixed px-2 py-0.5 rounded">
                        {drink.category}
                      </span>
                    </div>
                    <h4 className="font-bold text-lg text-on-surface group-hover:text-primary transition-colors">{drink.name}</h4>
                  </div>
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="flex justify-between items-center text-xs text-on-surface-variant">
                      <span>{drink.abv_range}% Alc.</span>
                      <span className="text-primary font-bold">₩{drink.price.toLocaleString()}</span>
                    </div>
                    {drink.scents && drink.scents.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {drink.scents.slice(0, 2).map(s => (
                          <span key={s} className="text-[10px] bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-full">#{s}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-16 flex justify-center">
          <button 
            onClick={() => navigate('/drinks')}
            className="border border-outline hover:bg-white/5 px-10 py-3 rounded-full text-sm font-semibold transition-all flex items-center gap-2"
          >
            더 많은 주류 탐색하기
          </button>
        </div>
      </main>
    </>
  )
}

function Navigation() {
  const [user, setUser] = useState(authService.getCurrentUser());
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(authService.getCurrentUser());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate('/');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-16">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-12">
            <Link to="/" className="text-xl md:text-2xl font-serif font-bold text-primary tracking-wider uppercase">ALCOHOLIC</Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link 
                to="/" 
                className={`pb-1 text-xs tracking-wider uppercase border-b-2 ${location.pathname === '/' ? 'text-primary font-bold border-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}
              >
                홈
              </Link>
              <Link 
                to="/drinks" 
                className={`pb-1 text-xs tracking-wider uppercase border-b-2 ${location.pathname === '/drinks' ? 'text-primary font-bold border-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}
              >
                전체 술 목록
              </Link>
              <Link 
                to="/favorites" 
                className={`pb-1 text-xs tracking-wider uppercase border-b-2 ${location.pathname === '/favorites' ? 'text-primary font-bold border-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}
              >
                즐겨찾기
              </Link>
              {user && user.role === 'ADMIN' && (
                <Link 
                  to="/add-drink" 
                  className={`pb-1 text-xs tracking-wider uppercase border-b-2 ${location.pathname === '/add-drink' ? 'text-primary font-bold border-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}
                >
                  술 등록
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-on-surface-variant hover:text-primary transition-colors"
            >
              <Search size={20} />
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-xs text-on-surface-variant"><span className="text-primary font-bold">{user.nickname}</span>님</span>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-on-surface-variant hover:text-error transition-colors text-xs"
                >
                  <LogOut size={16} />
                  <span>로그아웃</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-on-surface-variant hover:text-on-surface text-xs font-semibold">로그인</Link>
                <Link to="/signup" className="bg-primary hover:bg-primary-container text-on-primary font-bold px-4 py-2 rounded-lg text-xs transition-all shadow-md">
                  회원가입
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 검색 모달 */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          ></div>
          <div className="relative w-full max-w-xl bg-surface border border-white/5 rounded-2xl shadow-2xl p-6 overflow-hidden glass-card">
            <form onSubmit={handleSearchSubmit} className="space-y-4">
              <div className="flex items-center justify-between font-bold text-lg mb-2 text-on-surface">
                <span className="font-serif">술 검색</span>
                <button 
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="text-on-surface-variant hover:text-on-surface"
                >
                  ✕
                </button>
              </div>
              <p className="text-sm text-on-surface-variant">술의 이름을 입력하세요</p>
              <div className="relative">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="예: 참이슬, 발베니..."
                  className="w-full bg-surface-container border border-outline-variant rounded-xl px-5 py-4 focus:outline-none focus:border-primary transition-all text-lg text-white"
                />
              </div>
              <div className="flex gap-2">
                <button 
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="flex-1 bg-surface-container-high hover:bg-surface-container-highest py-3 rounded-xl font-bold transition-all text-on-surface"
                >
                  취소
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary-container text-on-primary py-3 rounded-xl font-bold transition-all shadow-md"
                >
                  확인
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-on-surface font-sans">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/drink/:id" element={<DrinkDetailPage />} />
          <Route path="/recommend" element={<RecommendationPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/add-drink" element={<AddDrinkPage />} />
          <Route path="/drinks" element={<DrinkListPage />} />
        </Routes>
        
        {/* Footer */}
        <footer className="bg-surface-container-lowest border-t border-white/5 py-12 px-4 md:px-16 mt-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-sm font-serif font-bold text-primary uppercase tracking-widest">ALCOHOLIC</span>
              <p className="text-on-surface-variant text-xs">© 2026 ALCOHOLIC. Discover your perfect spirit.</p>
            </div>
            <nav className="flex gap-8">
              <span className="text-on-surface-variant text-xs">About Us</span>
              <span className="text-on-surface-variant text-xs">Privacy Policy</span>
              <span className="text-on-surface-variant text-xs">Terms of Service</span>
            </nav>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App;