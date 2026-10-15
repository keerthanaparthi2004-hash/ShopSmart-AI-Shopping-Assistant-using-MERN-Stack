import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CartItem from '../components/CartItem';
import { CartContext } from '../context/CartContext';

export default function Cart() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { cart, updateQty, removeFromCart, total } = useContext(CartContext);

  const increaseQty = (id) => {
    const item = cart.find(i => i.id === id);
    if(item) updateQty(id, item.qty + 1);
  };

  const decreaseQty = (id) => {
    const item = cart.find(i => i.id === id);
    if(item) updateQty(id, item.qty - 1);
  };

  const removeItem = (id) => {
    removeFromCart(id);
  };

  if(cart.length === 0){
    return (
      <>
        <Navbar search={search} setSearch={setSearch} setShowShop={()=>{}} showShop={false} setSelectedCategory={()=>{}} cartCount={0} />
        <div className="max-w-50[200px] mx-auto px-6 py-20 text-center">
          <p className="text-[40px]">🛒</p>
          <h1 className="text-[18px] font-bold mt-4">Your Cart is Empty</h1>
          <p className="text-[12px] text-gray-500 mt-2">Add shop cart</p>
          <div className="flex justify-center gap-3 mt-6">
            <button onClick={()=>navigate('/')} className="bg-[#052e16] text-white text-[11px] px-6 py-2 rounded-md">Back to Shop →</button>
            <button onClick={()=>navigate('/')} className="border border-gray-200 text-[11px] px-6 py-2 rounded-md bg-white">Go to Home</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar search={search} setSearch={setSearch} setShowShop={()=>{}} showShop={false} setSelectedCategory={()=>{}} cartCount={cart.reduce((s,i)=>s+i.qty,0)} />
      <div className="max-w-62.5[250px] mx-auto px-6 py-6 bg-[#fafafa] min-h-screen">

        <div className="flex items-center justify-between">
          <h1 className="text-[20px] font-bold">Shopping Cart - {cart.length} items</h1>
          <div className="flex gap-2">
            <button onClick={()=>navigate('/')} className="text-[11px] border px-3 py-1.5 rounded-md bg-white hover:bg-gray-50">← Back to Shop</button>
          </div>
        </div>

        <div className="flex gap-6 mt-6">
          <div className="flex-1 space-y-4">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} onInc={increaseQty} onDec={decreaseQty} onRemove={removeItem} />
            ))}
          </div>

          <div className="w-65[260px] bg-white border border-gray-100 rounded-lg p-4 h-fit sticky top-20">
            <h3 className="text-[13px] font-bold">Order Summary</h3>
            <div className="flex justify-between mt-4 text-[11px]"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
            <div className="flex justify-between mt-2 text-[11px]"><span>Shipping</span><span className="text-green-600">Free</span></div>
            <div className="border-t mt-3 pt-3 flex justify-between text-[12px] font-bold"><span>Total</span><span>${total.toFixed(2)}</span></div>
            <button className="w-full mt-4 bg-[#052e16] text-white text-[11px] py-2 rounded-md">Proceed to Checkout</button>
            <button onClick={()=>navigate('/')} className="w-full mt-3 text-[11px] text-[#052e16] border border-green-200 py-2 rounded-md bg-white">← Continue Shopping</button>
            <button onClick={()=>navigate('/')} className="w-full mt-2 text-[11px] border py-2 rounded-md bg-white">Back to Home</button>
          </div>
        </div>
      </div>
    </>
  );
}