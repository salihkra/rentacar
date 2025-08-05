import React, { useState, useMemo, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, User, Mail, Phone, Calendar, MapPin, Loader2 } from 'lucide-react';
import { Customer } from '../../types';
import { customerService, CreateCustomerData } from '../../services/customerService';
import CustomerModal from './CustomerModal';
import CustomerDetailModal from './CustomerDetailModal';

interface CustomerManagementProps {
  onBackToHome?: () => void;
}

const CustomerManagement: React.FC<CustomerManagementProps> = ({ onBackToHome }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await customerService.getAllCustomers();
      setCustomers(data);
      setError(null);
    } catch (err) {
      console.error('Error loading customers:', err);
      setError('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = useMemo(() => {
    let filtered = customers;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(customer =>
        customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(customer => customer.status === statusFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

      switch (dateFilter) {
        case 'today':
          filtered = filtered.filter(customer => {
            const registrationDate = new Date(customer.registrationDate);
            return registrationDate >= startOfDay && registrationDate <= endOfDay;
          });
          break;
        case 'week':
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter(customer => {
            const registrationDate = new Date(customer.registrationDate);
            return registrationDate >= weekAgo;
          });
          break;
        case 'month':
          const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
          filtered = filtered.filter(customer => {
            const registrationDate = new Date(customer.registrationDate);
            return registrationDate >= monthAgo;
          });
          break;
      }
    }

    return filtered;
  }, [customers, searchTerm, statusFilter, dateFilter]);

  const handleSaveCustomer = async (customerData: CreateCustomerData) => {
    try {
      if (editingCustomer) {
        await customerService.updateCustomer(editingCustomer.id, customerData);
      } else {
        await customerService.createCustomer(customerData);
      }
      await loadCustomers();
      setShowModal(false);
      setEditingCustomer(null);
    } catch (err) {
      console.error('Error saving customer:', err);
      setError('Failed to save customer');
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    try {
      await customerService.deleteCustomer(id);
      await loadCustomers();
    } catch (err) {
      console.error('Error deleting customer:', err);
      setError('Failed to delete customer');
    }
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setShowModal(true);
  };

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowDetailModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Active': return 'Aktif';
      case 'Inactive': return 'Pasif';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR');
  };

  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'Active').length,
    inactive: customers.filter(c => c.status === 'Inactive').length,
    totalBookings: customers.reduce((sum, c) => sum + c.numberOfBookings, 0)
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
          <h1 className="text-2xl font-bold text-gray-900">Müşteri Yönetimi</h1>
          <p className="text-gray-600">Tüm müşterileri görüntüleyin ve yönetin</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Yeni Müşteri
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
              placeholder="Müşteri adı, email veya telefon ara..."
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
            <option value="Active">Aktif</option>
            <option value="Inactive">Pasif</option>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <User className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Toplam Müşteri</p>
              <p className="text-xl font-semibold">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <User className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Aktif</p>
              <p className="text-xl font-semibold">{stats.active}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <User className="w-8 h-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Pasif</p>
              <p className="text-xl font-semibold">{stats.inactive}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Toplam Rezervasyon</p>
              <p className="text-xl font-semibold">{stats.totalBookings}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Müşteri
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İletişim
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kayıt Tarihi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rezervasyonlar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Son Rezervasyon
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.fullName}</div>
                        <div className="text-sm text-gray-500">ID: {customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.email}</div>
                    <div className="text-sm text-gray-500">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(customer.registrationDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.numberOfBookings}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.lastBookingDate ? formatDate(customer.lastBookingDate) : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                      {getStatusText(customer.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewCustomer(customer)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Görüntüle"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditCustomer(customer)}
                        className="text-green-600 hover:text-green-900"
                        title="Düzenle"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCustomer(customer.id)}
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
        {filteredCustomers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Müşteri bulunamadı
          </div>
        )}
      </div>

      {/* Modals */}
      {showModal && (
        <CustomerModal
          customer={editingCustomer}
          onSave={handleSaveCustomer}
          onClose={() => {
            setShowModal(false);
            setEditingCustomer(null);
          }}
        />
      )}

      {showDetailModal && selectedCustomer && (
        <CustomerDetailModal
          customer={selectedCustomer}
          onClose={() => setShowDetailModal(false)}
        />
      )}
    </div>
  );
};

export default CustomerManagement; 