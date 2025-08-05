import React from 'react';
import { X, User, Mail, Phone, Calendar, MapPin, FileText, Clock, BookOpen } from 'lucide-react';
import { Customer } from '../../types';

interface CustomerDetailModalProps {
  customer: Customer;
  onClose: () => void;
}

const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({
  customer,
  onClose
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR');
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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Müşteri Detayları</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="bg-white px-6 py-6 max-h-[70vh] overflow-y-auto">
            <div className="space-y-6">
              {/* Customer Header */}
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 h-16 w-16">
                  <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{customer.fullName}</h2>
                  <p className="text-gray-500">Müşteri ID: {customer.id}</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                    {getStatusText(customer.status)}
                  </span>
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Kişisel Bilgiler
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Ad Soyad</label>
                    <p className="text-sm text-gray-900">{customer.fullName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Doğum Tarihi</label>
                    <p className="text-sm text-gray-900">{formatDate(customer.dateOfBirth)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">TC Kimlik No / Pasaport No</label>
                    <p className="text-sm text-gray-900">{customer.nationalId}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Durum</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                      {getStatusText(customer.status)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  İletişim Bilgileri
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Email</label>
                    <p className="text-sm text-gray-900">{customer.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Telefon</label>
                    <p className="text-sm text-gray-900">{customer.phone}</p>
                  </div>
                </div>
              </div>

              {/* Driver License Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Ehliyet Bilgileri
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Ehliyet Numarası</label>
                    <p className="text-sm text-gray-900">{customer.driverLicenseNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Geçerlilik Tarihi</label>
                    <p className="text-sm text-gray-900">{formatDate(customer.driverLicenseExpiry)}</p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Adres Bilgileri
                </h4>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Adres</label>
                  <p className="text-sm text-gray-900">{customer.address}</p>
                </div>
              </div>

              {/* Booking Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Rezervasyon Bilgileri
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Toplam Rezervasyon</label>
                    <p className="text-sm text-gray-900">{customer.numberOfBookings}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Son Rezervasyon</label>
                    <p className="text-sm text-gray-900">
                      {customer.lastBookingDate ? formatDate(customer.lastBookingDate) : 'Henüz rezervasyon yok'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Registration Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Kayıt Bilgileri
                </h4>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Kayıt Tarihi</label>
                  <p className="text-sm text-gray-900">{formatDate(customer.registrationDate)}</p>
                </div>
              </div>

              {/* Notes */}
              {customer.notes && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Notlar</h4>
                  <p className="text-sm text-gray-900">{customer.notes}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4 flex justify-end">
            <button
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailModal; 