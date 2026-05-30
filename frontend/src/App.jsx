import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Search, Heart, User, Home, Sparkles, Menu, LogOut, Wine } from 'lucide-react'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import FavoritesPage from './pages/FavoritesPage'
import DrinkDetailPage from './pages/DrinkDetailPage'
import RecommendationPage from './pages/RecommendationPage'
import SearchPage from './pages/SearchPage'
import AddDrinkPage from './pages/AddDrinkPage'
import { authService } from './utils/auth'
import { drinkService } from './utils/drinkService'

// 메인 홈 섹션 (기존 App 내용을 분리)
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
      <header className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center md:text-left md:flex items-center justify-between">
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">오늘 밤, 당신에게 <br /> <span className="text-amber-500">완벽한 한 잔</span>을</h2>
            <p className="text-lg text-slate-400">취향, 분위기, 안주까지 고려한 스마트 술 추천 서비스.</p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => navigate('/recommend')}
                className="bg-amber-600 hover:bg-amber-700 px-8 py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg"
              >
                <Sparkles size={22} /> 지금 추천 받기
              </button>
            </div>
          </div>
          <div className="hidden md:block w-1/3 h-64 bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center text-slate-600 font-bold uppercase tracking-widest italic opacity-50 text-3xl">Main Visual</div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold">인기 주류 목록</h3>
          <span className="text-slate-500 text-sm">{drinks.length}개의 술 정보가 있습니다.</span>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-500">불러오는 중...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {drinks.map((drink) => (
              <Link 
                to={`/drink/${drink.id}`} 
                key={drink.id} 
                className="group cursor-pointer bg-slate-900 rounded-2xl border border-slate-800 p-4 transition-all hover:border-amber-500 hover:-translate-y-2 shadow-lg"
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
                    {drink.scents.slice(0, 2).map(s => (
                      <span key={s} className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">#{s}</span>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500 truncate mt-2">가격: {drink.price.toLocaleString()}원</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  )
}

function Navigation() {
  const [user, setUser] = useState(authService.getCurrentUser());
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-black text-amber-500 tracking-tighter">ALCOHOLIC</Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-amber-500 px-3 py-2 font-medium">홈</Link>
            <Link to="/favorites" className="text-slate-300 hover:text-amber-500 px-3 py-2 font-medium">즐겨찾기</Link>
            {user && user.role === 'ADMIN' && (
              <Link to="/add-drink" className="text-slate-300 hover:text-amber-500 px-3 py-2 font-medium">술 등록</Link>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {/* 검색 돋보기 버튼 */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              <Search size={22} />
            </button>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-slate-300 font-medium whitespace-nowrap"><span className="text-amber-500">{user.nickname}</span>님</span>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-slate-400 hover:text-white transition-colors text-sm"
                >
                  <LogOut size={18} />
                  <span>로그아웃</span>
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-slate-300 hover:text-white px-4 py-2 font-medium">로그인</Link>
                <Link to="/signup" className="bg-amber-600 hover:bg-amber-700 px-5 py-2 rounded-lg font-bold transition-all shadow-lg shadow-amber-900/20">
                  회원가입
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button className="p-2 text-slate-300"><Menu size={24} /></button>
          </div>
        </div>
      </div>

      {/* 검색 팝업 (모달) */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4">
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          ></div>
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 overflow-hidden">
            <form onSubmit={handleSearchSubmit} className="space-y-4">
              <div className="flex items-center justify-between font-bold text-lg mb-2 text-slate-300">
                <span>술 검색</span>
                <button 
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="text-slate-500 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <p className="text-sm text-slate-400">술의 이름을 입력하세요</p>
              <div className="relative">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="예: 참이슬, 발베니..."
                  className="w-full bg-slate-800 border-2 border-slate-700 rounded-xl px-5 py-4 focus:outline-none focus:border-amber-500 transition-all text-lg"
                />
              </div>
              <div className="flex gap-2">
                <button 
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 py-3 rounded-xl font-bold transition-all"
                >
                  취소
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-amber-600 hover:bg-amber-700 py-3 rounded-xl font-bold transition-all shadow-lg shadow-amber-900/20"
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
      <div className="min-h-screen bg-slate-950 text-white font-sans">
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
        </Routes>
      </div>
    </Router>
  )
}

export default App;