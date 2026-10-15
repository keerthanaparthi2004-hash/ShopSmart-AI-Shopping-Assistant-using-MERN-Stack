import { useState, useEffect, useContext } from 'react';
import { fetchProducts } from '../services/api';
import { parseQuery, getSuggestions } from '../utils/aiAssistant';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function AIAssistant() {
  const [open, setOpen] = useState(true);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { from:'ai', text:"Hi! I'm your AI shopping assistant. How can I help you find the perfect product today?", time:'23:23' }
  ]);
  const [products, setProducts] = useState([]);
  const { cart, wishlist } = useContext(CartContext);

  useEffect(()=>{fetchProducts().then(setProducts)},[]);

  const send = () => {
    if(!query) return;
    const time = new Date().toLocaleTimeString().slice(0,5);
    setMessages(m=>[...m, {from:'user', text:query, time}]);
    const qObj = parseQuery(query);
    const sug = getSuggestions(products, qObj, cart, wishlist);
    setTimeout(()=>{
      setMessages(m=>[...m, {from:'ai', text:sug.message, time, products:sug.products}]);
    },500);
    setQuery('');
  };

  if(!open) return <button onClick={()=>setOpen(true)} className="fixed bottom-6 right-6 bg-linear-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg z-50">✨ AI</button>;

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white shadow-2xl rounded-xl border overflow-hidden z-50 flex flex-col h-125">
      <div className="bg-linear-to-r from-blue-500 to-purple-600 text-white p-3 flex justify-between items-center">
        <div className="flex gap-2 items-center"><div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">✨</div><div><p className="text-sm font-semibold">AI Shopping Assistant</p><p className="text-[10px] opacity-80">Always here to help</p></div></div>
        <button onClick={()=>setOpen(false)} className="text-white">✕</button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
        {messages.map((msg,i)=>(
          <div key={i} className={`${msg.from==='user'?'ml-auto bg-blue-500 text-white':'bg-white border'} max-w-4/5 rounded-xl p-2.5`}>
            <p className="text-xs">{msg.text}</p>
            {msg.products && <div className="mt-2 space-y-1">{msg.products.slice(0,2).map(p=><Link key={p.id} to={`/product/${p.id}`} className="flex gap-2 bg-gray-50 rounded p-1"><img src={p.thumbnail} className="w-8 h-8 object-contain"/><span className="text-[10px]">{p.title} - ${p.price}</span></Link>)}</div>}
            <p className="text-[9px] opacity-60 mt-1">{msg.time}</p>
          </div>
        ))}
      </div>
      <div className="p-2 border-t flex gap-2">
        <input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask me anything..." className="flex-1 border rounded-full px-3 py-1.5 text-xs focus:outline-none" />
        <button onClick={send} className="bg-linear-to-r from-blue-500 to-purple-600 text-white w-7 h-7 rounded-full flex items-center justify-center">➤</button>
      </div>
    </div>
  );
}
