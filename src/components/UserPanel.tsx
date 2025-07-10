import React, { useState } from 'react';
import { User, Calendar, CreditCard, FileText, Settings, LogOut, Eye, Download } from 'lucide-react';
import { bookings, customers } from '../data/mockData';

const UserPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const currentUser = customers[0]; // Mock current user

  const userBookings = bookings.filter(b => b.customerId === currentUser.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR');
  };

  const menuItems = [
    { id: 'bookings', label: 'Rezervasyonlarım', icon: <Calendar className="w-5 h-5" /> },
    { id: 'active', label: 'Aktif Kiralamalar', icon: <Calendar className="w-5 h-5" /> },
    { id: 'payments', label: 'Ödeme Geçmişi', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'invoices', label: 'Faturalarım', icon: <FileText className="w-5 h-5" /> },
    { id: 'profile', label: 'Profil Ayarları', icon: <Settings className="w-5 h-5" /> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'bookings':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Rezervasyon Geçmişi</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rezervasyon No
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Araç
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tarihler
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Durum
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tutar
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        İşlemler
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{booking.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.carName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(booking.pickupDate)} - {formatDate(booking.returnDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                            {booking.status === 'Active' ? 'Aktif' : 
                             booking.status === 'Completed' ? 'Tamamlandı' :
                             booking.status === 'Cancelled' ? 'İptal Edildi' : 'Beklemede'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₺{booking.totalAmount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-3">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'active':
        const activeBookings = userBookings.filter(b => b.status === 'Active');
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Aktif Kiralamalar</h2>
            {activeBookings.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aktif kiralama bulunamadı</h3>
                <p className="text-gray-600">Şu anda aktif bir kiralama işleminiz bulunmamaktadır.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeBookings.map((booking) => (
                  <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold">{booking.carName}</h3>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                        Aktif
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>Rezervasyon:</strong> #{booking.id}</p>
                      <p><strong>Teslim Alma:</strong> {formatDate(booking.pickupDate)} - {booking.pickupTime}</p>
                      <p><strong>Teslim Etme:</strong> {formatDate(booking.returnDate)} - {booking.returnTime}</p>
                      <p><strong>Lokasyon:</strong> {booking.pickupLocation}</p>
                      <p><strong>Toplam:</strong> ₺{booking.totalAmount.toLocaleString()}</p>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                        Detayları Görüntüle
                      </button>
                      <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium">
                        İletişim
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'payments':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ödeme Geçmişi</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tarih
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rezervasyon
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tutar
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ödeme Yöntemi
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Durum
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(booking.pickupDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{booking.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₺{booking.totalAmount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Kredi Kartı
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Ödendi
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'invoices':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Faturalarım</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userBookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <span className="text-sm text-gray-500">#{booking.id}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{booking.carName}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {formatDate(booking.pickupDate)} - {formatDate(booking.returnDate)}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold">₺{booking.totalAmount.toLocaleString()}</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      Ödendi
                    </span>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center">
                    <Download className="w-4 h-4 mr-2" />
                    Faturayı İndir
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profil Ayarları</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-6">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-20 h-20 rounded-full mr-6"
                />
                <div>
                  <h3 className="text-xl font-semibold">{currentUser.name}</h3>
                  <p className="text-gray-600">{currentUser.email}</p>
                  <p className="text-sm text-gray-500">{currentUser.totalRentals} kiralama tamamlandı</p>
                </div>
              </div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      defaultValue={currentUser.name}
                      className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      E-posta
                    </label>
                    <input
                      type="email"
                      defaultValue={currentUser.email}
                      className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      defaultValue={currentUser.phone}
                      className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      TC Kimlik No
                    </label>
                    <input
                      type="text"
                      defaultValue={currentUser.tcNo}
                      className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adres
                  </label>
                  <textarea
                    defaultValue={currentUser.address}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-medium"
                  >
                    Değişiklikleri Kaydet
                  </button>
                  <button
                    type="button"
                    className="border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-6 rounded-lg font-medium"
                  >
                    İptal
                  </button>
                </div>
              </form>
            </div>
          </div>
        );

      default:
        return null;
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
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{currentUser.name}</h4>
                  <p className="text-xs text-gray-500">Müşteri</p>
                </div>
              </div>
            </div>
            <nav className="p-4">
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="mr-3 text-gray-500">{item.icon}</span>
                      {item.label}
                    </button>
                  </li>
                ))}
                <li className="pt-4 border-t border-gray-200">
                  <button className="w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="w-5 h-5 mr-3" />
                    Çıkış Yap
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserPanel;