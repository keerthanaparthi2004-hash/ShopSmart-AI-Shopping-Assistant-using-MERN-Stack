import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const [err, setErr] = useState('');

  const handle = (e) => {
    e.preventDefault();
    try { login(email,password); nav('/'); }
    catch(er){ setErr(er.message); }
  };

  return (
    <div className="min-h-screen bg-[#eef0ff] flex items-center justify-center p-4">
      <div className="w-full max-w-[95 px]">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="w-7 h-7 bg-linear-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-[12px]">✦</span>
          <span className="text-[16px] font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ShopSmart</span>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h1 className="text-[13px] font-bold">Welcome Back</h1>
          <p className="text-[11px] text-gray-500 mt-1">Sign in to your account to continue shopping</p>
          {err && <p className="bg-red-100 text-red-600 p-2 rounded mt-3 text-[11px]">{err}</p>}
          <form onSubmit={handle} className="mt-4">
            <p className="text-[11px] font-semibold">Email</p>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" className="w-full mt-1 bg-gray-100 rounded-md px-3 py-2 text-[11px] outline-none" />
            <p className="text-[11px] font-semibold mt-3">Password</p>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" className="w-full mt-1 bg-gray-100 rounded-md px-3 py-2 text-[11px] outline-none" />
            <div className="flex items-center justify-between mt-3">
              <label className="flex items-center gap-1.5"><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} className="w-3 h-3" /><span className="text-[10px]">Remember me</span></label>
              <span className="text-[10px] text-blue-600">Forgot password?</span>
            </div>
            <button className="w-full mt-4 bg-[#0f0f23] text-white text-[11px] py-2.5 rounded-lg">Sign In</button>
          </form>
          <p className="text-[10px] text-center mt-3 text-gray-500">Don't have an account? <Link to="/signup" className="text-blue-600">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}