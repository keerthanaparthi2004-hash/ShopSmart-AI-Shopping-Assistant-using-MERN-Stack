import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import AIAssistant from './components/AIAssistant';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
              <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              </Routes>
            <AIAssistant />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}