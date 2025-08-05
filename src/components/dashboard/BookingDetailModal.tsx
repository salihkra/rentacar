import React from 'react';
import { X, User, Car, Calendar, Clock, MapPin, DollarSign, Phone, Mail } from 'lucide-react';
import { Booking } from '../../types';

interface BookingDetailModalProps {
  booking: Booking;
  onClose: () => void;
}

const BookingDetailModal: React.FC<BookingDetailModalProps> = ({ booking, onClose }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'Beklemede';
      case 'Active':
        return 'Aktif';
      case 'Completed':
        return 'Tamamlandı';
      case 'Cancelled':
        return 'İptal Edildi';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const calculateDays = () => {
    const pickup = new Date(booking.pickupDate);
    const returnDate = new Date(booking.returnDate);
    const diffTime = Math.abs(returnDate.getTime() - pickup.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            Rezervasyon Detayları
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Booking ID and Status */}
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Rezervasyon ID</h4>
              <p className="text-lg font-semibold text-gray-900">{booking.id}</p>
            </div>
            <div className="text-right">
              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                {getStatusText(booking.status)}
              </span>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Müşteri Bilgileri
            </h4>
            {booking.customer ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Ad Soyad:</span>
                  <p className="font-medium text-gray-900">{booking.customer.fullName}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">E-posta:</span>
                  <p className="font-medium text-gray-900">{booking.customer.email}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Telefon:</span>
                  <p className="font-medium text-gray-900">{booking.customer.phone}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">TC Kimlik No:</span>
                  <p className="font-medium text-gray-900">{booking.customer.nationalId}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Ehliyet No:</span>
                  <p className="font-medium text-gray-900">{booking.customer.driverLicenseNumber}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Ehliyet Geçerlilik:</span>
                  <p className="font-medium text-gray-900">{formatDate(booking.customer.driverLicenseExpiry)}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Durum:</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    booking.customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {booking.customer.status === 'Active' ? 'Aktif' : 'Pasif'}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Kayıt Tarihi:</span>
                  <p className="font-medium text-gray-900">{formatDate(booking.customer.registrationDate)}</p>
                </div>
                <div className="md:col-span-2">
                  <span className="text-sm text-gray-500">Adres:</span>
                  <p className="font-medium text-gray-900">{booking.customer.address}</p>
                </div>
                {booking.customer.notes && (
                  <div className="md:col-span-2">
                    <span className="text-sm text-gray-500">Notlar:</span>
                    <p className="font-medium text-gray-900">{booking.customer.notes}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Ad Soyad:</span>
                  <p className="font-medium text-gray-900">{booking.customerName}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Müşteri ID:</span>
                  <p className="font-medium text-gray-900">{booking.customerId}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500 italic">Müşteri bilgileri veritabanından yüklenemedi.</p>
                </div>
              </div>
            )}
          </div>

          {/* Car Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <Car className="w-4 h-4 mr-2" />
              Araç Bilgileri
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-sm text-gray-500">Araç:</span>
                <p className="font-medium text-gray-900">{booking.carName}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Araç ID:</span>
                <p className="font-medium text-gray-900">{booking.carId}</p>
              </div>
              {booking.carPlate && (
                <div>
                  <span className="text-sm text-gray-500">Plaka:</span>
                  <p className="font-medium text-gray-900">{booking.carPlate}</p>
                </div>
              )}
            </div>
          </div>

          {/* Date and Time Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Tarih ve Saat Bilgileri
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="text-sm font-medium text-gray-600 mb-2">Alış Bilgileri</h5>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">Tarih:</span>
                    <span className="ml-2 font-medium text-gray-900">{formatDate(booking.pickupDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">Saat:</span>
                    <span className="ml-2 font-medium text-gray-900">{formatTime(booking.pickupTime)}</span>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-600 mb-2">Teslim Bilgileri</h5>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">Tarih:</span>
                    <span className="ml-2 font-medium text-gray-900">{formatDate(booking.returnDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">Saat:</span>
                    <span className="ml-2 font-medium text-gray-900">{formatTime(booking.returnTime)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center">
                <span className="text-sm text-gray-500">Toplam Süre:</span>
                <span className="ml-2 font-medium text-gray-900">{calculateDays()} gün</span>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Lokasyon Bilgileri
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="text-sm font-medium text-gray-600 mb-2">Alış Lokasyonu</h5>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="font-medium text-gray-900">{booking.pickupLocation}</span>
                </div>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-600 mb-2">Teslim Lokasyonu</h5>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="font-medium text-gray-900">{booking.returnLocation}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Finansal Bilgiler
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-sm text-gray-500">Toplam Tutar:</span>
                <p className="text-lg font-bold text-gray-900">₺{booking.totalAmount.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Günlük Ücret:</span>
                <p className="font-medium text-gray-900">₺{(booking.totalAmount / calculateDays()).toFixed(2)}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Süre:</span>
                <p className="font-medium text-gray-900">{calculateDays()} gün</p>
              </div>
            </div>
          </div>

          {/* Extras and Insurance (if available) */}
          {(booking.extras && booking.extras.length > 0) || booking.insurance ? (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Ek Hizmetler</h4>
              
              {booking.extras && booking.extras.length > 0 && (
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-gray-600 mb-2">Ekstra Hizmetler</h5>
                  <div className="space-y-2">
                    {booking.extras.map((extra, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">{extra.name}</span>
                        <span className="text-sm font-medium text-gray-900">₺{extra.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {booking.insurance && (
                <div>
                  <h5 className="text-sm font-medium text-gray-600 mb-2">Sigorta</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">{booking.insurance.name}</span>
                      <span className="text-sm font-medium text-gray-900">₺{booking.insurance.price}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Kapsam: {booking.insurance.coverage.join(', ')}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailModal; 