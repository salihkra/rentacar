import React, { useState } from 'react';
import { User, BarChart3, Calendar, Users, Car, FileText, MapPin, Tag, TrendingUp, Shield as UserShield, Settings, Download, ChevronDown } from 'lucide-react';
import DashboardStats from './components/dashboard/DashboardStats';
import BookingsTable from './components/dashboard/BookingsTable';
import CarManagement from './components/dashboard/CarManagement';
import { dashboardStats, bookings } from './data/mockData';

const CRMDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const navItems = [
    { section: 'MAIN', items: [
      { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-5 h-5" /> },
      { id: 'bookings', label: 'Bookings', icon: <Calendar className="w-5 h-5" /> },
      { id: 'customers', label: 'Customers', icon: <Users className="w-5 h-5" /> },
      { id: 'fleet', label: 'Fleet', icon: <Car className="w-5 h-5" /> },
      { id: 'invoices', label: 'Invoices', icon: <FileText className="w-5 h-5" /> }
    ]},
    { section: 'MANAGEMENT', items: [
      { id: 'locations', label: 'Locations', icon: <MapPin className="w-5 h-5" /> },
      { id: 'pricing', label: 'Pricing', icon: <Tag className="w-5 h-5" /> },
      { id: 'reports', label: 'Reports', icon: <TrendingUp className="w-5 h-5" /> }
    ]},
    { section: 'ADMIN', items: [
      { id: 'staff', label: 'Staff', icon: <UserShield className="w-5 h-5" /> },
      { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> }
    ]}
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'fleet':
        return <CarManagement />;
      case 'dashboard':
      default:
        return (
          <>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Dashboard Overview</h2>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <select className="block appearance-none bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-sm">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Last Quarter</option>
                    <option>Last Year</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors inline-flex items-center justify-center">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </button>
              </div>
            </div>

            <DashboardStats stats={dashboardStats} />

            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Booking Trends</h3>
                  <div className="flex space-x-2">
                    <button className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded">Weekly</button>
                    <button className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">Monthly</button>
                    <button className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">Yearly</button>
                  </div>
                </div>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Chart placeholder - Booking trends over time</p>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Revenue by Vehicle Type</h3>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Chart placeholder - Revenue distribution</p>
                </div>
              </div>
            </div>

            <BookingsTable bookings={bookings} />
          </>
        );
    }
  };

  return (
    <section className="py-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-xl shadow-md mb-6 md:mb-0 md:mr-6">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white mr-3">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Admin User</h4>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
            <nav className="p-4">
              {navItems.map((section) => (
                <div key={section.section} className="mb-6">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-3">
                    {section.section}
                  </h4>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.id}>
                        <button 
                          onClick={() => setActiveSection(item.id)}
                          className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                          activeSection === item.id
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}>
                          <span className="mr-3 text-gray-500">{item.icon}</span>
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CRMDashboard;