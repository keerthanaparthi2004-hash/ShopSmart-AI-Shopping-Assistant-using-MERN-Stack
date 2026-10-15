import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { toggleWishlist, wishlist } = useContext(CartContext);
  const isWish = wishlist.find(p=>p.id===product.id);
  const discount = product.discountPercentage? `-${Math.round(product.discountPercentage)}%` : null;
  return (
    <div className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition group">
      <div className="relative h-64 bg-gray-50">
        <Link to={`/product/${product.id}`}>
          <img src={product.thumbnail} alt={product.title} className="w-full h-full object-contain p-4 group-hover:scale-105 transition" />
        </Link>
        {product.tags?.includes('pro') && <span className="absolute top-3 left-3 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full">Pro Choice</span>}
        {discount && <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">{discount}</span>}
        <button onClick={()=>toggleWishlist(product)} className="absolute top-3 right-3 bg-white w-7 h-7 rounded-full shadow flex items-center justify-center">{isWish?'❤️':'🤍'}</button>
      </div>
      <div className="p-3">
        <p className="text-[10px] text-gray-400 capitalize">{product.category}</p>
        <Link to={`/product/${product.id}`}><h3 className="font-medium text-sm line-clamp-1">{product.title}</h3></Link>
        <div className="flex items-center gap-1 mt-1"><span className="text-yellow-400 text-xs">★</span><span className="text-xs font-medium">{product.rating}</span><span className="text-[10px] text-gray-400">({product.stock})</span></div>
        <div className="flex gap-2 items-center mt-2"><span className="font-bold text-sm">${product.price}</span>{product.discountPercentage && <span className="text-xs text-gray-400 line-through">${(product.price * 1.2).toFixed(2)}</span>}</div>
      </div>
    </div>
  );
}