import React, { useState, useMemo, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, Calendar, Car, User, MapPin, Clock, Loader2 } from 'lucide-react';
import { Booking, Car as CarType, Customer } from '../../types';
import { bookingService, CreateBookingData } from '../../services/bookingService';
import { carService } from '../../services/carService';
import { customerService } from '../../services/customerService';
import { locationNames } from '../../data/mockData';
import BookingModal from './BookingModal';
import BookingDetailModal from './BookingDetailModal';

interface BookingsManagementProps {
  onBackToHome?: () => void;
}

const BookingsManagement: React.FC<BookingsManagementProps> = ({ onBackToHome }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [cars, setCars] = useState<CarType[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBookings();
    loadCars();
    loadCustomers();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingService.getAllBookings();
      setBookings(data);
      setError(null);
    } catch (err) {
      console.error('Error loading bookings:', err);
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const loadCars = async () => {
    try {
      const data = await carService.getAllCars();
      setCars(data);
    } catch (err) {
      console.error('Error loading cars:', err);
    }
  };

  const loadCustomers = async () => {
    try {
      const data = await customerService.getAllCustomers();
      setCustomers(data);
    } catch (err) {
      console.error('Error loading customers:', err);
    }
  };

  const filteredBookings = useMemo(() => {
    let filtered = bookings;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (booking.carPlate && booking.carPlate.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

      switch (dateFilter) {
        case 'today':
          filtered = filtered.filter(booking => {
            const pickupDate = new Date(booking.pickupDate);
            return pickupDate >= startOfDay && pickupDate <= endOfDay;
          });
          break;
        case 'week':
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter(booking => {
            const pickupDate = new Date(booking.pickupDate);
            return pickupDate >= weekAgo;
          });
          break;
        case 'month':
          const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
          filtered = filtered.filter(booking => {
            const pickupDate = new Date(booking.pickupDate);
            return pickupDate >= monthAgo;
          });
          break;
      }
    }

    return filtered;
  }, [bookings, searchTerm, statusFilter, dateFilter]);

  const handleSaveBooking = async (bookingData: CreateBookingData) => {
    try {
      if (editingBooking) {
        await bookingService.updateBooking(editingBooking.id, bookingData);
      } else {
        await bookingService.createBooking(bookingData);
      }
      await loadBookings();
      setShowModal(false);
      setEditingBooking(null);
    } catch (err) {
      console.error('Error saving booking:', err);
      setError('Failed to save booking');
    }
  };

  const handleDeleteBooking = async (id: string) => {
    try {
      await bookingService.deleteBooking(id);
      await loadBookings();
    } catch (err) {
      console.error('Error deleting booking:', err);
      setError('Failed to delete booking');
    }
  };

  const handleEditBooking = (booking: Booking) => {
    setEditingBooking(booking);
    setShowModal(true);
  };

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowDetailModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Pending': return 'Beklemede';
      case 'Active': return 'Aktif';
      case 'Completed': return 'Tamamlandı';
      case 'Cancelled': return 'İptal Edildi';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR');
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'Pending').length,
    active: bookings.filter(b => b.status === 'Active').length,
    completed: bookings.filter(b => b.status === 'Completed').length,
    totalRevenue: bookings.reduce((sum, b) => sum + b.totalAmount, 0)
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Yükleniyor...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rezervasyon Yönetimi</h1>
          <p className="text-gray-600">Tüm rezervasyonları görüntüleyin ve yönetin</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Yeni Rezervasyon
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Müşteri, araç veya plaka ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="Pending">Beklemede</option>
            <option value="Active">Aktif</option>
            <option value="Completed">Tamamlandı</option>
            <option value="Cancelled">İptal Edildi</option>
          </select>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tüm Tarihler</option>
            <option value="today">Bugün</option>
            <option value="week">Bu Hafta</option>
            <option value="month">Bu Ay</option>
          </select>
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setDateFilter('all');
            }}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Temizle
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Toplam</p>
              <p className="text-xl font-semibold">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-yellow-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Beklemede</p>
              <p className="text-xl font-semibold">{stats.pending}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Car className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Aktif</p>
              <p className="text-xl font-semibold">{stats.active}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <User className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Tamamlandı</p>
              <p className="text-xl font-semibold">{stats.completed}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <MapPin className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Toplam Gelir</p>
              <p className="text-xl font-semibold">₺{stats.totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rezervasyon ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Müşteri
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Araç
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarih & Saat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lokasyon
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
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{booking.id.slice(0, 8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                    {booking.customer && (
                      <>
                        <div className="text-sm text-gray-500">{booking.customer.email}</div>
                        <div className="text-sm text-gray-500">{booking.customer.phone}</div>
                        <div className="text-xs text-gray-400">
                          TC: {booking.customer.nationalId} • Durum: {booking.customer.status === 'Active' ? 'Aktif' : 'Pasif'}
                        </div>
                      </>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.carName}</div>
                    {booking.carPlate && (
                      <div className="text-sm text-gray-500">{booking.carPlate}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(booking.pickupDate)} - {formatDate(booking.returnDate)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatTime(booking.pickupTime)} - {formatTime(booking.returnTime)}
                    </div>
                    <div className="text-xs text-gray-400">
                      {calculateDays(booking.pickupDate, booking.returnDate)} gün
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.pickupLocation}</div>
                    <div className="text-sm text-gray-500">→ {booking.returnLocation}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                      {getStatusText(booking.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₺{booking.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewBooking(booking)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Görüntüle"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditBooking(booking)}
                        className="text-green-600 hover:text-green-900"
                        title="Düzenle"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBooking(booking.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredBookings.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Rezervasyon bulunamadı
          </div>
        )}
      </div>

      {/* Modals */}
      {showModal && (
        <BookingModal
          booking={editingBooking}
          onSave={handleSaveBooking}
          onClose={() => {
            setShowModal(false);
            setEditingBooking(null);
          }}
          cars={cars}
          customers={customers}
          locationNames={locationNames}
        />
      )}

      {showDetailModal && selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => setShowDetailModal(false)}
        />
      )}
    </div>
  );
};

export default BookingsManagement; 