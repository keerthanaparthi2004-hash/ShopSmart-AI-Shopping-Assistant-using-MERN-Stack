import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [confirm,setConfirm]=useState(''); const [agree,setAgree]=useState(false);
  const { signup } = useContext(AuthContext); const nav=useNavigate(); const [err,setErr]=useState('');
  const handle = (e) => {
    e.preventDefault();
    if(password!==confirm){ setErr('Password mismatch ma!'); return; }
    try { signup(name,email,password); nav('/'); }
    catch(er){ setErr(er.message); }
  };
  return (
    <div className="min-h-screen bg-[#eef0ff] flex items-center justify-center p-4">
      <div className="w-full max-w-23.75[95px]">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="w-7 h-7 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-[12px]">✦</span>
          <span className="text-[16px] font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ShopSmart</span>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h1 className="text-[13px] font-bold">Create Account</h1>
          <p className="text-[11px] text-gray-500 mt-1">Sign up to start your smart shopping journey</p>
          {err && <p className="bg-red-100 text-red-600 p-2 rounded mt-3 text-[11px]">{err}</p>}
          <form onSubmit={handle} className="mt-4">
            <p className="text-[11px] font-semibold">Full Name</p>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="John Doe" className="w-full mt-1 bg-gray-100 rounded-md px-3 py-2 text-[11px] outline-none" />
            <p className="text-[11px] font-semibold mt-3">Email</p>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" className="w-full mt-1 bg-gray-100 rounded-md px-3 py-2 text-[11px] outline-none" />
            <p className="text-[11px] font-semibold mt-3">Password</p>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" className="w-full mt-1 bg-gray-100 rounded-md px-3 py-2 text-[11px] outline-none" />
            <p className="text-[11px] font-semibold mt-3">Confirm Password</p>
            <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="••••••••" className="w-full mt-1 bg-gray-100 rounded-md px-3 py-2 text-[11px] outline-none" />
            <label className="flex items-center gap-2 mt-3"><input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)} className="w-3 h-3" /><span className="text-[10px]">I agree to the <span className="text-blue-600">Terms of Service</span> and <span className="text-blue-600">Privacy Policy</span></span></label>
            <button className="w-full mt-4 bg-[#0f0f23] text-white text-[11px] py-2.5 rounded-lg">Create Account</button>
          </form>
          <p className="text-[10px] text-center mt-3 text-gray-500">Already have an account? <Link to="/login" className="text-blue-600">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}