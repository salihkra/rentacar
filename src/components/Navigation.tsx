import React, { useState } from 'react';
import { Car, Menu, X, User, LayoutDashboard } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLoginClick: () => void;
  onDashboardClick: () => void;
  onUserPanelClick: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  activeTab, 
  setActiveTab, 
  onLoginClick, 
  onDashboardClick,
  onUserPanelClick 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'fleet', label: 'Our Fleet' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleTabClick = (tabId: string) => {
    if (tabId === 'fleet' || tabId === 'about' || tabId === 'contact') {
      const element = document.getElementById(tabId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <Car className="w-6 h-6" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900 hidden sm:block">AutoRent Pro</span>
            </div>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? 'text-blue-600 border-blue-500'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-transparent'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onLoginClick}
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
            >
              <User className="w-4 h-4 mr-1" />
              Login
            </button>
            <button
              onClick={onUserPanelClick}
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
            >
              <User className="w-4 h-4 mr-1" />
              Hesabım
            </button>
            <button
              onClick={onDashboardClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors flex items-center"
            >
              <LayoutDashboard className="w-4 h-4 mr-1" />
              Dashboard
            </button>
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`block w-full text-left pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  activeTab === item.id
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="mt-4 px-4 space-y-3">
              <button
                onClick={onLoginClick}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center"
              >
                <User className="w-4 h-4 mr-1" />
                Login
              </button>
              <button
                onClick={onUserPanelClick}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center mb-3"
              >
                <User className="w-4 h-4 mr-1" />
                Hesabım
              </button>
              <button
                onClick={onDashboardClick}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center"
              >
                <LayoutDashboard className="w-4 h-4 mr-1" />
                Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;