import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { wishlist } = useContext(CartContext);
  if (wishlist.length===0) return <div className="p-10 text-center">Wishlist empty ma! ❤️ Add pannu ma!</div>;
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist ma! ❤️</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {wishlist.map(p=><ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}