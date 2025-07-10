import React, { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import { users } from '../data/mockData';
import { User as UserType } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserType) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Simple authentication - check if user exists
    const user = users.find(u => u.email === formData.email);
    
    if (user) {
      // In a real app, you'd verify the password here
      // For demo purposes, any password works
      if (formData.password.length > 0) {
        onLogin(user);
        onClose();
        setFormData({ email: '', password: '', rememberMe: false });
      } else {
        setError('Lütfen şifrenizi girin');
      }
    } else {
      setError('Geçersiz e-posta adresi');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-6 py-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Giriş Yap</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Demo Accounts Info */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Demo Hesapları:</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Admin:</strong> admin@autorentpro.com (herhangi bir şifre)</p>
                <p><strong>Kullanıcı:</strong> mehmet@example.com (herhangi bir şifre)</p>
              </div>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-posta Adresi
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="block w-full border border-gray-300 rounded-lg py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ornek@email.com"
                    required
                  />
                  <Mail className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div className="mb-5">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Şifre
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="block w-full border border-gray-300 rounded-lg py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                    required
                  />
                  <Lock className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Beni hatırla
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Şifremi unuttum
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold shadow-md transition-colors"
              >
                Giriş Yap
              </button>
            </form>
          </div>
          <div className="bg-gray-50 px-6 py-4 sm:px-8 rounded-b-xl">
            <p className="text-center text-sm text-gray-600">
              Hesabınız yok mu?{' '}
              <button className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Kayıt Ol
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;