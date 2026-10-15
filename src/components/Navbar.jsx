import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ search, setSearch, setShowShop, showShop, setSelectedCategory, cartCount, setShowLogin, setShowSignup }) {
  const navigate = useNavigate();
  const handleShopClick = () => {
    navigate('/');
    if(setShowShop) setShowShop(true);
    if(setSelectedCategory) setSelectedCategory('All');
  };
  const handleLogoClick = () => {
    navigate('/');
    if(setShowShop) setShowShop(false);
    if(setSelectedCategory) setSelectedCategory('All');
  };

  return (
    <div className="bg-white border-b border-green-100 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
          {/* FIX: bg-gradient-to-br -> bg-linear-to-br */}
          <span className="w-7 h-7 bg-linear-to-br from-green-900 to-green-500 rounded flex items-center justify-center text-white">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
            </svg>
          </span>
          <span className="text-sm font-bold text-green-900">ShopSmart</span>
        </div>
        <div className="flex-1 max-w-md mx-6">
          <input
            value={search}
            onChange={e=>setSearch(e.target.value)}
            placeholder="Search for products..."
            className="w-full border border-gray-200 rounded-full px-4 py-2 text-xs bg-gray-50 outline-none focus:ring-1 focus:ring-green-600"
          />
        </div>
        <div className="flex items-center gap-4">
          <button onClick={handleShopClick} className="text-xs font-medium text-gray-700 hover:text-green-700">Shop</button>
          <Link to="/cart" className="relative text-gray-700">
            🛒 {cartCount>0 && <span className="absolute -top-2 -right-2 w-4 h-4 bg-green-600 text-white text-[8px] rounded-full flex items-center justify-center">{cartCount}</span>}
          </Link>
          <button onClick={()=>setShowLogin(true)} className="text-xs border border-gray-200 px-3 py-1.5 rounded-full">Sign in</button>
        </div>
      </div>
    </div>
  );
}