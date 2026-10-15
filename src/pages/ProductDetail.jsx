import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('features');
  const [related, setRelated] = useState([]);
  const { addToCart, toggleWishlist, wishlist } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`).then(r=>r.json()).then(p=>{
      setProduct(p);
      fetch(`https://dummyjson.com/products/category/${p.category}`).then(r=>r.json()).then(d=>setRelated(d.products.filter(x=>x.id!==p.id).slice(0,4)));
    });
  }, [id]);

  if (!product) return <div className="p-10">Loading ma...</div>;
  const isWish = wishlist.find(p=>p.id===product.id);

  const handleAdd = () => {
    for(let i=0;i<qty;i++) addToCart(product);
  };

  return (
    <div className="bg-[#fafafa] min-h-screen">
      
      <div className="max-w-5xl mx-auto px-8 py-6">
         <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-[11px] text-gray-500">
            <Link to="/" className="hover:text-[#052e16]">Home</Link>
            <span>/</span>
            <Link to="/" className="hover:text-[#052e16]">Shop</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate max-w-37.5[150px]">{product.title}</span>
          </div>
          <button onClick={()=>navigate('/')} className="text-[11px] border border-gray-200 px-4 py-1.5 rounded-lg bg-white hover:bg-gray-50">
            ← Back to Home
          </button>
        </div>

        
        <div className="bg-white rounded-xl border border-gray-100 p-6 grid md:grid-cols-2 gap-8 shadow-sm">
         <div className="bg-white rounded-lg border border-gray-100 h-96 flex items-center justify-center p-8">
            <img src={product.thumbnail} alt={product.title} className="h-full object-contain" />
          </div>

         
          <div>
            <h1 className="text-[20px] font-bold leading-tight">{product.title}</h1>
            <p className="text-[11px] text-gray-500 mt-1">{product.category} • ⭐ {product.rating}</p>

            <div className="flex items-center gap-2 mt-3">
              <span className="bg-green-50 text-[#0f4d2a] text-[10px] px-2 py-1 rounded font-medium border border-green-100">✓ In Stock</span>
              <span className="text-[10px] text-gray-500">{product.stock} units available</span>
            </div>

            <p className="text-[22px] font-bold mt-4 text-[#052e16]">${product.price}</p>
            <p className="text-[11px] text-gray-600 mt-3 leading-relaxed">{product.description}</p>

           
            <div className="flex items-center gap-3 mt-6">
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button onClick={()=>setQty(q=>Math.max(1,q-1))} className="px-3 py-2 text-[14px] hover:bg-gray-50">-</button>
                <span className="px-4 text-[12px] font-bold border-x border-gray-200">{qty}</span>
                <button onClick={()=>setQty(q=>q+1)} className="px-3 py-2 text-[14px] hover:bg-gray-50">+</button>
              </div>
              <button onClick={handleAdd} className="flex-1 bg-[#052e16] text-white text-[12px] py-2.5 rounded-lg font-medium hover:bg-[#0f4d2a]">Add to Cart</button>
              <button onClick={()=>toggleWishlist(product)} className={`w-10 h-10 rounded-lg flex items-center justify-center border ${isWish?'bg-red-50 text-red-500 border-red-200':'bg-white text-gray-500 border-gray-200'}`}>❤️</button>
            </div>

            
            <div className="mt-6 space-y-2 text-[10px] text-gray-600 border-t border-gray-100 pt-4">
              <p className="flex items-center gap-2">🚚 <span>Free shipping on order over $50</span></p>
              <p className="flex items-center gap-2">🛡️ <span>1 year warranty Included</span></p>
              <p className="flex items-center gap-2">↩️ <span>30-day return policy</span></p>
            </div>
          </div>
        </div>

      
        <div className="bg-white rounded-xl border border-gray-100 p-6 mt-6 shadow-sm">
          <div className="flex gap-6 border-b border-gray-100 text-[12px] font-medium">
            <button onClick={()=>setActiveTab('features')} className={`pb-3 border-b-2 ${activeTab==='features'?'border-[#052e16] text-[#052e16]':'border-transparent text-gray-400'}`}>Features</button>
            <button onClick={()=>setActiveTab('desc')} className={`pb-3 border-b-2 ${activeTab==='desc'?'border-[#052e16] text-[#052e16]':'border-transparent text-gray-400'}`}>Description</button>
            <button onClick={()=>setActiveTab('reviews')} className={`pb-3 border-b-2 ${activeTab==='reviews'?'border-[#052e16] text-[#052e16]':'border-transparent text-gray-400'}`}>Reviews</button>
          </div>

          <div className="mt-5">
            {activeTab==='features' && (
              <div>
                <h4 className="text-[12px] font-bold mb-3">Key Features</h4>
                <ul className="text-[11px] text-gray-600 space-y-2 list-disc ml-5">
                  <li>Brand: {product.brand} - Premium quality</li>
                  <li>Stock: {product.stock} units - In Stock</li>
                  <li>Discount: {product.discountPercentage}% off on MRP</li>
                  <li>Category: {product.category} - High performance</li>
                  <li>Durable, lightweight and long-lasting design</li>
                  <li>1 Year warranty + 30-day return policy</li>
                </ul>
              </div>
            )}
            {activeTab==='desc' && <p className="text-[11px] text-gray-600 leading-relaxed">{product.description}<br/><br/>Made with premium materials for best experience. Perfect for daily use and gifting purpose.</p>}
            {activeTab==='reviews' && <p className="text-[11px] text-gray-600">⭐ {product.rating} rating - 128 reviews<br/>Customers love quality and price. Verified purchase reviews only.</p>}
          </div>
        </div>

        
        <div className="mt-8">
          <h3 className="text-[13px] font-bold mb-4">Related Products</h3>
          <div className="grid grid-cols-4 gap-5">
            {related.map(rp=>(
              <Link key={rp.id} to={`/product/${rp.id}`} className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-sm transition">
                
                <div className="h-35 bg-white flex items-center justify-center p-3 border-b border-gray-50">
                  <img src={rp.thumbnail} className="h-20 object-contain" alt={rp.title} />
                </div>
                <div className="p-3">
                  <p className="text-[10px] font-medium line-clamp-1">{rp.title}</p>
                  <p className="text-[11px] font-bold mt-1 text-[#052e16]">${rp.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}