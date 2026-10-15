import { useEffect, useState, useContext } from 'react';
import { fetchProducts } from '../services/api';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [showShop, setShowShop] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [price, setPrice] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', confirm: '', agree: false });
  const [loginForm, setLoginForm] = useState({ email: '', password: '', remember: false });

  const auth = useContext(AuthContext);
  const login = auth?.login;
  const signup = auth?.signup;
  const { cart, addToCart: addToCartContext } = useContext(CartContext);

  useEffect(() => { fetchProducts().then(setProducts); }, []);
  useEffect(() => { if(search.trim().length > 0){ setShowShop(true); } }, [search]);

  const addToCart = (e, product) => {
    e.preventDefault(); e.stopPropagation();
    addToCartContext(product);
    alert(`${product.title} added to cart 🛒`);
  };

  const handleSignup = () => {
    if(!signupForm.name ||!signupForm.email ||!signupForm.password){ alert('Fill all fields ma!'); return; }
    if(signupForm.password!== signupForm.confirm){ alert('Password match aagala ma!'); return; }
    if(!signupForm.agree){ alert('Terms agree pannunga ma!'); return; }
    try{
      if(signup) signup(signupForm.name, signupForm.email, signupForm.password);
      alert('Account created ma! ✅');
      setShowSignup(false);
      setSignupForm({ name: '', email: '', password: '', confirm: '', agree: false });
    }
    catch(err){ alert(err.message); }
  };

  const handleLogin = () => {
    if(!loginForm.email ||!loginForm.password){ alert('Email & Password fill pannunga ma!'); return; }
    try{
      if(login) login(loginForm.email, loginForm.password);
      alert('Login success ma! ✅');
      setShowLogin(false);
    }
    catch(err){ alert(err.message); }
  };

  const displayFeatured = products.length? products.slice(0,4) : [
    { id:1, title:'Wireless Noise-Canceling Headphones', price:259.99, rating:4.8, badge:'Best Seller', badgeColor:'bg-orange-500', img:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', bg:'bg-yellow-400' },
    { id:2, title:'Smart Watch Pro Series 7', price:449.99, rating:4.9, badge:'New Arrival', badgeColor:'bg-[#0f4d2a]', img:'https://images.unsplash.com/photo-1555421689-3f034debb7a6?w=400', bg:'bg-slate-100' },
    { id:3, title:'Premium Running Shoes', price:159.99, rating:4.7, badge:'Top Rated', badgeColor:'bg-[#052e16]', img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', bg:'bg-red-600' },
    { id:4, title:'Stainless Steel Water Bottle', price:34.99, rating:4.6, badge:'Eco Choice', badgeColor:'bg-green-600', img:'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400', bg:'bg-green-50' },
  ];

  const filterCats = ['All','Electronics','Fashion','Sports','Home'];

  const getCorrectCategory = (title, originalCat) => {
    const t = title.toLowerCase();
    const oc = (originalCat||'').toLowerCase();
    if(t.includes('shirt') || t.includes('jacket') || t.includes('t-shirt') || t.includes('dress') || t.includes('lipstick') || t.includes('mascara') || t.includes('fashion') || t.includes('cloth') || t.includes('backpack') || t.includes('leather')) return 'Fashion';
    if(oc.includes('beaut') || oc.includes('fragr') || oc.includes('fashion') || oc.includes('womens') || oc.includes('mens') || oc.includes('tops')) return 'Fashion';
    if(t.includes('headphone') || t.includes('earphone') || t.includes('tv') || t.includes('television') || t.includes('laptop') || t.includes('camera') || t.includes('speaker') || t.includes('monitor') || t.includes('smart watch') || t.includes('smartwatch')) return 'Electronics';
    if(oc.includes('laptop') || oc.includes('smartphone') || oc.includes('mobile') || oc.includes('electronics')) return 'Electronics';
    if(t.includes('shoe') && t.includes('running') || t.includes('basketball') || t.includes('sports') || t.includes('football') || t.includes('sneaker') || t.includes('gym')) return 'Sports';
    if(oc.includes('sport')) return 'Sports';
    return 'Home';
  };

  const allProducts = products.length? products.map(p=>{ const correctCat = getCorrectCategory(p.title, p.category); return {...p, mappedCategory: correctCat, displayCategory: correctCat, rating: p.rating || 4.5 }; }) : [
    { id:1, title:'Wireless Headphones', price:299.99, rating:4.8, mappedCategory:'Electronics', displayCategory:'Electronics', img:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', bg:'bg-blue-50' },
    { id:2, title:'4K Smart TV 55 inch', price:599.99, rating:4.9, mappedCategory:'Electronics', displayCategory:'Electronics', img:'https://images.unsplash.com/photo-1593359677879-a4bb92f367d8?w=400', bg:'bg-slate-50' },
    { id:3, title:'Running Shoes', price:159.99, rating:4.7, mappedCategory:'Sports', displayCategory:'Sports', img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', bg:'bg-green-50' },
    { id:4, title:'Leather Jacket', price:129.99, rating:4.6, mappedCategory:'Fashion', displayCategory:'Fashion', img:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', bg:'bg-purple-50' },
    { id:5, title:'Home Decor Lamp', price:39.99, rating:4.5, mappedCategory:'Home', displayCategory:'Home', img:'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400', bg:'bg-orange-50' },
    { id:6, title:'Cotton T-Shirt', price:29.99, rating:4.4, mappedCategory:'Fashion', displayCategory:'Fashion', img:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', bg:'bg-yellow-50' },
    { id:7, title:'Basketball', price:49.99, rating:4.3, mappedCategory:'Sports', displayCategory:'Sports', img:'https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=400', bg:'bg-red-50' },
    { id:8, title:'Coffee Table', price:199.99, rating:4.8, mappedCategory:'Home', displayCategory:'Home', img:'https://images.unsplash.com/photo-1532372320572-cda25653a694?w=400', bg:'bg-gray-50' },
  ];

  const filteredProducts = allProducts.filter(p=>{
    const cat = p.mappedCategory || p.displayCategory;
    if(search){ const s = search.toLowerCase(); if(!p.title.toLowerCase().includes(s) &&!cat.toLowerCase().includes(s)) return false; }
    if(selectedCategory!== 'All' && cat!== selectedCategory) return false;
    if(p.price > price) return false;
    if(minRating && p.rating < minRating) return false;
    return true;
  });

  const displayedProducts = (() => {
    if(selectedCategory === 'All') return filteredProducts;
    if(selectedCategory === 'Electronics') return filteredProducts.slice(0, 10);
    if(selectedCategory === 'Fashion') return filteredProducts.slice(0, 10);
    if(selectedCategory === 'Sports') return filteredProducts.slice(0, 10);
    if(selectedCategory === 'Home') return filteredProducts.slice(0, 20);
    return filteredProducts;
  })();

  const categories = [{ name: 'Electronics' }, { name: 'Fashion' }, { name: 'Sports' }, { name: 'Home' }];
  const handleCategoryClick = (catName) => { setSelectedCategory(catName); setPrice(1000); setMinRating(0); setShowShop(true); window.scrollTo(0,0); };

  return (
    <>
      <Navbar search={search} setSearch={setSearch} setShowShop={setShowShop} showShop={showShop} setSelectedCategory={setSelectedCategory} cartCount={cart.reduce((sum,i)=>sum+i.qty,0)} setShowLogin={setShowLogin} setShowSignup={setShowSignup} />

      {showLogin && (
        <div className="fixed inset-0 bg-[#052e16]/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="w-8 h-8 bg-linear-to-br from-[#052e16] to-[#0f4d2a] rounded-lg flex items-center justify-center text-white">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
              </span>
              <span className="text-[18px] font-bold text-[#052e16]">ShopSmart</span>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100 relative">
              <button onClick={()=>setShowLogin(false)} className="absolute top-3 right-3 text-gray-400 hover:text-black">✕</button>
              <h2 className="text-[14px] font-bold text-[#052e16]">Welcome Back</h2>
              <p className="text-[11px] text-gray-500 mt-1">Sign in to your account to continue shopping</p>
              <p className="text-[11px] font-semibold mt-4">Email</p>
              <input value={loginForm.email} onChange={e=>setLoginForm({...loginForm, email: e.target.value})} placeholder="you@example.com" className="w-full mt-1 bg-green-50/50 rounded-md px-3 py-2.5 text-[11px] outline-none focus:ring-1 focus:ring-[#0f4d2a] border border-green-100" />
              <p className="text-[11px] font-semibold mt-4">Password</p>
              <input type="password" value={loginForm.password} onChange={e=>setLoginForm({...loginForm, password: e.target.value})} placeholder="••••••••" className="w-full mt-1 bg-green-50/50 rounded-md px-3 py-2.5 text-[11px] outline-none focus:ring-1 focus:ring-[#0f4d2a] border border-green-100" />
              <div className="flex items-center justify-between mt-4">
                <label className="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" checked={loginForm.remember} onChange={e=>setLoginForm({...loginForm, remember: e.target.checked})} className="w-3.5 h-3.5 accent-[#052e16]" /><span className="text-[11px]">Remember me</span></label>
                <span className="text-[11px] text-[#0f4d2a] cursor-pointer hover:underline">Forgot password?</span>
              </div>
              <button onClick={handleLogin} className="w-full mt-5 bg-[#052e16] text-white text-[12px] py-3 rounded-lg font-medium hover:bg-[#0f4d2a]">Sign In</button>
              <p className="text-[11px] text-center mt-4 text-gray-500">Don't have an account? <span onClick={()=>{setShowLogin(false); setShowSignup(true);}} className="text-[#0f4d2a] cursor-pointer font-medium hover:underline">Sign up</span></p>
            </div>
          </div>
        </div>
      )}

      {showSignup && (
        <div className="fixed inset-0 bg-[#052e16]/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="w-8 h-8 bg-linear-to-br from-[#052e16] to-[#0f4d2a] rounded-lg flex items-center justify-center text-white">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
              </span>
              <span className="text-[18px] font-bold text-[#052e16]">ShopSmart</span>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100 relative">
              <button onClick={()=>setShowSignup(false)} className="absolute top-3 right-3 text-gray-400 hover:text-black">✕</button>
              <h2 className="text-[14px] font-bold text-[#052e16]">Create Account</h2>
              <p className="text-[11px] text-gray-500 mt-1">Sign up to start your smart shopping journey</p>
              <p className="text-[11px] font-semibold mt-4">Full Name</p>
              <input value={signupForm.name} onChange={e=>setSignupForm({...signupForm, name: e.target.value})} placeholder="John Doe" className="w-full mt-1 bg-green-50/50 rounded-md px-3 py-2.5 text-[11px] outline-none focus:ring-1 focus:ring-[#0f4d2a] border border-green-100" />
              <p className="text-[11px] font-semibold mt-3">Email</p>
              <input value={signupForm.email} onChange={e=>setSignupForm({...signupForm, email: e.target.value})} placeholder="you@example.com" className="w-full mt-1 bg-green-50/50 rounded-md px-3 py-2.5 text-[11px] outline-none focus:ring-1 focus:ring-[#0f4d2a] border border-green-100" />
              <p className="text-[11px] font-semibold mt-3">Password</p>
              <input type="password" value={signupForm.password} onChange={e=>setSignupForm({...signupForm, password: e.target.value})} placeholder="••••••••" className="w-full mt-1 bg-green-50/50 rounded-md px-3 py-2.5 text-[11px] outline-none focus:ring-1 focus:ring-[#0f4d2a] border border-green-100" />
              <p className="text-[11px] font-semibold mt-3">Confirm Password</p>
              <input type="password" value={signupForm.confirm} onChange={e=>setSignupForm({...signupForm, confirm: e.target.value})} placeholder="••••••••" className="w-full mt-1 bg-green-50/50 rounded-md px-3 py-2.5 text-[11px] outline-none focus:ring-1 focus:ring-[#0f4d2a] border border-green-100" />
              <label className="flex items-center gap-2 mt-4 cursor-pointer">
                <input type="checkbox" checked={signupForm.agree} onChange={e=>setSignupForm({...signupForm, agree: e.target.checked})} className="w-3.5 h-3.5 accent-[#052e16]" />
                <span className="text-[10px]">I agree to the <span className="text-[#0f4d2a]">Terms of Service</span> and <span className="text-[#0f4d2a]">Privacy Policy</span></span>
              </label>
              <button onClick={handleSignup} className="w-full mt-4 bg-[#052e16] text-white text-[12px] py-3 rounded-lg font-medium hover:bg-[#0f4d2a]">Create Account</button>
              <p className="text-[11px] text-center mt-4 text-gray-500">Already have an account? <span onClick={()=>{setShowSignup(false); setShowLogin(true);}} className="text-[#0f4d2a] cursor-pointer font-medium hover:underline">Sign in</span></p>
            </div>
          </div>
        </div>
      )}

      {showShop? (
        <div className="max-w-7xl mx-auto px-6 py-6 bg-[#fafafa] min-h-screen">
          <div className="flex items-center justify-between">
            <h1 className="text-[20px] font-bold text-[#052e16]">Shop All Products {search && `- Search: "${search}"`}</h1>
            <button onClick={()=>{setShowShop(false); setSelectedCategory('All'); setPrice(1000); setMinRating(0); setSearch('');}} className="text-[11px] border border-green-200 px-3 py-1.5 rounded-md bg-white text-[#052e16] hover:bg-green-50">Back to Home</button>
          </div>
          <div className="flex gap-3 mt-4">
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products... e.g. TV, Shirt, Shoes" className="flex-1 border border-green-100 rounded-md px-4 py-2 text-[12px] bg-white focus:ring-1 focus:ring-[#0f4d2a] outline-none" autoFocus />
            <button onClick={()=>setSearch('')} className="border border-green-100 rounded-md px-3 py-2 text-[11px] bg-white hover:bg-green-50">Clear</button>
          </div>
          <div className="flex gap-6 mt-6">
            <div className="w-55 bg-white border border-green-100 rounded-lg p-4 h-fit sticky top-20">
              <h3 className="text-[12px] font-bold text-[#052e16]">Filters</h3>
              <p className="text-[11px] font-semibold mt-4">Categories</p>
              <div className="mt-2 space-y-2">
                {filterCats.map(c=>(
                  <label key={c} className="flex items-center gap-2 text-[11px] cursor-pointer">
                    <input type="checkbox" checked={selectedCategory===c} onChange={()=>setSelectedCategory(c)} className="w-3 h-3 accent-[#052e16]" />
                    <span className={selectedCategory===c? 'font-semibold text-[#052e16]' : ''}>{c}</span>
                  </label>
                ))}
              </div>
              <p className="text-[11px] font-semibold mt-5">Price Range</p>
              <input type="range" min="0" max="1000" value={price} onChange={e=>setPrice(Number(e.target.value))} className="w-full mt-2 accent-[#052e16]" />
              <div className="flex justify-between text-[10px] text-gray-500 mt-1"><span>$0</span><span>${price}</span></div>
              <p className="text-[11px] font-semibold mt-5">Minimum Rating</p>
              <div className="mt-2 space-y-2">
                {[4.5,4,3.5,3].map(r=>(
                  <label key={r} className="flex items-center gap-2 text-[11px] cursor-pointer">
                    <input type="checkbox" checked={minRating===r} onChange={()=>setMinRating(minRating===r?0:r)} className="w-3 h-3 accent-[#052e16]" />
                    <span className={minRating===r? 'font-semibold text-[#052e16]' : ''}>{r}+ Stars</span>
                  </label>
                ))}
              </div>
              <button onClick={()=>{setSelectedCategory('All'); setPrice(1000); setMinRating(0); setSearch('');}} className="w-full mt-5 border border-green-100 rounded-md py-1.5 text-[11px] hover:bg-green-50">Reset Filters</button>
            </div>
            <div className="flex-1">
              <p className="text-[11px] text-gray-500">Showing {displayedProducts.length} products {selectedCategory!=='All'? `in ${selectedCategory}` : ''}</p>
              <div className="grid grid-cols-3 gap-4 mt-3">
                {displayedProducts.map((p,i)=>(
                  <div key={i} className="bg-white border border-green-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                    <Link to={`/product/${p.id}`} className={`relative h-45 ${p.bg||'bg-white'} flex items-center justify-center`}>
                      <span className="absolute top-2 left-2 text-[8px] text-white px-2 py-0.5 rounded font-medium bg-[#0f4d2a]">{p.mappedCategory}</span>
                      <img src={p.img || p.thumbnail} className="h-28 object-contain" />
                    </Link>
                    <div className="p-3">
                      <p className="text-[9px] text-gray-400">{p.mappedCategory}</p>
                      <p className="text-[11px] font-medium mt-1 line-clamp-1">{p.title}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-[11px] font-bold text-[#052e16]">${p.price}</p>
                        <button onClick={(e)=>addToCart(e,p)} className="bg-[#052e16] text-white text-[9px] px-3 py-1 rounded-md hover:bg-[#0f4d2a]">Add to Cart</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
      <>
      <div className="bg-linear-to-r from-[#052e16] via-[#0f4d2a] to-[#14532d] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-1.5 bg-white/20 text-[9px] px-3 py-1 rounded-full">
             <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
                   AI-Powered Shopping Experience
          </div>
          <h1 className="text-4xl font-bold mt-4 leading-tight">Shop Smarter with AI<br/>Assistance</h1>
          <p className="text-[13px] mt-4 text-white/90 max-w-[150 px] mx-auto">Get personalized recommendations, compare products instantly, and make confident <br/>purchasing decisions with our AI shopping assistant.</p>
          <div className="flex justify-center gap-3 mt-6">
            <button onClick={()=>{setSelectedCategory('All'); setShowShop(true);}} className="bg-white text-[#052e16] text-[11px] px-5 py-2 rounded-md font-bold">Start Shopping →</button>
            <button className="border border-white/40 text-[11px] px-5 py-2 rounded-md hover:bg-white/10">Learn More</button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white border border-green-100 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
            <div className="w-9 h-9 bg-green-50 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-4 h-4 text-[#0f4d2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
            </div>
            <p className="text-[12px] font-bold mt-3">AI Assistant</p>
            <p className="text-[10px] text-gray-500 mt-1 leading-tight">Get instant product recommendations</p>
          </div>
          <div className="bg-white border border-green-100 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
            <div className="w-9 h-9 bg-green-50 rounded-full flex items-center justify-center mx-auto">
               <svg className="w-4 h-4 text-[#0f4d2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <p className="text-[13px] font-bold mt-3">Secure Checkout</p>
            <p className="text-[11px] text-gray-500 mt-1 leading-tight">Safe and encrypted payments</p>
          </div>
          <div className="bg-white border border-green-100 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
            <div className="w-9 h-9 bg-green-50 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-4 h-4 text-[#0f4d2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/></svg>
            </div>
            <p className="text-[13px] font-bold mt-3">Fast Shipping</p>
            <p className="text-[11px] text-gray-500 mt-1 leading-tight">Free delivery on orders over $50</p>
          </div>
          <div className="bg-white border border-green-100 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
            <div className="w-9 h-9 bg-green-50 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-4 h-4 text-[#0f4d2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 18v-6a9 9 0 0118 0v6"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>
            </div>
            <p className="text-[13px] font-bold mt-3">24/7 Support</p>
            <p className="text-[11px] text-gray-500 mt-1 leading-tight">Always here to help you</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center">
          <div><h2 className="text-[14px] font-bold text-[#052e16]">Featured Products</h2></div>
          <button onClick={()=>{setSelectedCategory('All'); setShowShop(true);}} className="text-[10px] border border-green-100 px-3 py-1.5 rounded-md bg-white text-[#052e16] hover:bg-green-50">View All</button>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-6">
          {displayFeatured.map((p,i)=>(
            <div key={i} className="bg-white border border-green-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
              <Link to={`/product/${p.id}`} className={`relative h-45 ${p.bg} flex items-center justify-center`}>
                <span className={`absolute top-2 left-2 text-[8px] text-white px-2 py-0.5 rounded font-medium ${p.badgeColor}`}>{p.badge}</span>
                <img src={p.img || p.thumbnail} className="h-28 object-contain" />
              </Link>
              <div className="p-3">
                <p className="text-[11px] font-medium line-clamp-2 h-7.5[30px]">{p.title}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[11px] font-bold text-[#052e16]">${p.price}</span>
                  <button onClick={(e)=>addToCart(e,p)} className="bg-[#052e16] text-white text-[9px] px-3 py-1 rounded-md hover:bg-[#0f4d2a]">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-10">
        <h2 className="text-[14px] font-bold text-center text-[#052e16]">Shop by Category</h2>
        <div className="grid grid-cols-4 gap-4 mt-6">
          {categories.map((c,i)=>(
            <div key={i} onClick={()=>handleCategoryClick(c.name)} className="bg-white border border-green-100 rounded-lg overflow-hidden text-center hover:shadow-md cursor-pointer">
              <div className="h-40 bg-green-50/50 flex items-center justify-center"><p className="text-[11px] text-[#0f4d2a] font-medium">{c.name}</p></div>
              <div className="py-3"><p className="text-[11px] font-medium text-[#052e16]">{c.name}</p></div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-linear-to-r from-[#052e16] via-[#0f4d2a] to-[#14532d] text-white text-center py-10">
        <h3 className="text-[15px] font-bold">Ready to Experience Smart Shopping?</h3>
        <p className="text-[10px] mt-2 text-white/80">Join thousands of satisfied customers who shop smarter with AI assistance.</p>
        <button onClick={()=>setShowSignup(true)} className="mt-4 bg-white text-[#052e16] text-[10px] px-5 py-2 rounded-md font-bold hover:bg-green-50">Get Started Free →</button>
      </div>

      <footer className="bg-[#052e16] text-white py-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-4 gap-8">
          <div>
            <p className="text-[12px] font-bold flex items-center gap-2">
            <span className="w-5 h-5 bg-white rounded flex items-center justify-center">
                <svg className="w-3 h-3 text-[#052e16]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
            </span> ShopSmart
            </p>
            <p className="text-[9px] text-green-200/60 mt-3 leading-relaxed">Your AI-powered shopping assistant for smarter<br/>purchasing decisions.</p></div>
          <div><p className="text-[11px] font-bold">Shop</p><div className="mt-3 space-y-1.5 text-[9px] text-green-100/60"><p onClick={()=>handleCategoryClick('Electronics')} className="hover:text-white cursor-pointer">Electronics</p><p onClick={()=>handleCategoryClick('Fashion')} className="hover:text-white cursor-pointer">Fashion</p><p onClick={()=>handleCategoryClick('Sports')} className="hover:text-white cursor-pointer">Sports</p><p onClick={()=>handleCategoryClick('Home')} className="hover:text-white cursor-pointer">Home</p></div></div>
          <div><p className="text-[11px] font-bold">Customer Service</p><div className="mt-3 space-y-1.5 text-[9px] text-green-100/60"><p>Contact Us</p><p>Shipping Info</p><p>Returns</p><p>FAQ</p></div></div>
          <div><p className="text-[11px] font-bold">Connect</p><div className="flex items-center gap-3 mt-3"><a href="https://facebook.com" target="_blank" className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-[11px] hover:bg-white/20">f</a><a href="https://twitter.com" target="_blank" className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-[11px] hover:bg-white/20">X</a><a href="https://instagram.com" target="_blank" className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-[10px] hover:bg-white/20">O</a><a href="mailto:support@shopsmart.com" className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-[11px] hover:bg-white/20">@</a></div><p className="text-[8px] text-green-200/50 mt-3">Subscribe to our newsletter</p></div>
        </div>
        <div className="max-w-5xl mx-auto px-6 mt-8 pt-6 border-t border-white/10"><p className="text-[8px] text-green-100/40 text-center">© 2026 ShopSmart. All rights reserved. Dark Green + White Theme</p></div>
      </footer>
      <button className="fixed bottom-6 right-6 w-10 h-10 bg-[#052e16] rounded-full flex items-center justify-center shadow-lg z-50 text-white hover:bg-[#0f4d2a]">💬</button>
      </>
      )}
    </>
  );
}