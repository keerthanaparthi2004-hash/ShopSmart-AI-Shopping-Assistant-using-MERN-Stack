import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const getKey = (type) => user? `${type}_${user.email}` : `${type}_guest`;
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem(getKey('cart')) || '[]'));
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem(getKey('wishlist')) || '[]'));
  useEffect(() => {
    localStorage.setItem(getKey('cart'), JSON.stringify(cart));
    localStorage.setItem(getKey('wishlist'), JSON.stringify(wishlist));
  }, [cart, wishlist, user]);
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem(getKey('cart')) || '[]'));
    setWishlist(JSON.parse(localStorage.getItem(getKey('wishlist')) || '[]'));
  }, [user]);
  const addToCart = (p) => setCart(prev => { const ex = prev.find(i => i.id === p.id); if(ex) return prev.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i); return [...prev,{...p,qty:1}]; });
  const removeFromCart = (id) => setCart(prev => prev.filter(i=>i.id!==id));
  const updateQty = (id,qty) => { if(qty<=0) removeFromCart(id); else setCart(prev=>prev.map(i=>i.id===id?{...i,qty}:i)); };
  const toggleWishlist = (p) => setWishlist(prev => prev.find(i=>i.id===p.id)?prev.filter(i=>i.id!==p.id):[...prev,p]);
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  return <CartContext.Provider value={{cart,wishlist,addToCart,removeFromCart,updateQty,toggleWishlist,total}}>{children}</CartContext.Provider>;
};