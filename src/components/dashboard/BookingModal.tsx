import React, { useState, useEffect } from 'react';
import { X, User, Car, Calendar, Clock, MapPin, DollarSign } from 'lucide-react';
import { Booking, Car as CarType, Customer } from '../../types';
import { CreateBookingData } from '../../services/bookingService';

interface BookingModalProps {
  booking?: Booking | null;
  onSave: (bookingData: CreateBookingData) => void;
  onClose: () => void;
  cars: CarType[];
  customers: Customer[];
  locationNames: string[];
}

const BookingModal: React.FC<BookingModalProps> = ({ 
  booking, 
  onSave, 
  onClose, 
  cars, 
  customers, 
  locationNames 
}) => {
  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    carId: '',
    carName: '',
    carPlate: '',
    pickupDate: '',
    returnDate: '',
    pickupTime: '10:00',
    returnTime: '10:00',
    pickupLocation: '',
    returnLocation: '',
    status: 'Pending' as const,
    totalAmount: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null);
  const [days, setDays] = useState(1);

  const timeOptions = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', 
    '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  useEffect(() => {
    if (booking) {
      setFormData({
        customerId: booking.customerId,
        customerName: booking.customerName,
        carId: booking.carId,
        carName: booking.carName,
        carPlate: booking.carPlate || '',
        pickupDate: booking.pickupDate,
        returnDate: booking.returnDate,
        pickupTime: booking.pickupTime,
        returnTime: booking.returnTime,
        pickupLocation: booking.pickupLocation,
        returnLocation: booking.returnLocation,
        status: booking.status,
        totalAmount: booking.totalAmount
      });
    }
  }, [booking]);

  useEffect(() => {
    if (formData.pickupDate && formData.returnDate) {
      const start = new Date(formData.pickupDate);
      const end = new Date(formData.returnDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDays(diffDays || 1);
    }
  }, [formData.pickupDate, formData.returnDate]);

  useEffect(() => {
    if (formData.carId && selectedCar) {
      const total = selectedCar.pricePerDay * days;
      setFormData(prev => ({ ...prev, totalAmount: total }));
    }
  }, [selectedCar, days, formData.carId]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerId) newErrors.customerId = 'Müşteri seçiniz';
    if (!formData.carId) newErrors.carId = 'Araç seçiniz';
    if (!formData.pickupDate) newErrors.pickupDate = 'Alış tarihi gerekli';
    if (!formData.returnDate) newErrors.returnDate = 'Teslim tarihi gerekli';
    if (!formData.pickupLocation) newErrors.pickupLocation = 'Alış lokasyonu gerekli';
    if (!formData.returnLocation) newErrors.returnLocation = 'Teslim lokasyonu gerekli';

    if (formData.pickupDate && formData.returnDate) {
      const start = new Date(formData.pickupDate);
      const end = new Date(formData.returnDate);
      if (end <= start) {
        newErrors.returnDate = 'Teslim tarihi alış tarihinden sonra olmalıdır';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCustomerChange = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    setFormData(prev => ({ 
      ...prev, 
      customerId, 
      customerName: customer ? customer.fullName : '' 
    }));
  };

  const handleCarChange = (carId: string) => {
    const car = cars.find(c => c.id === carId);
    setSelectedCar(car || null);
    setFormData(prev => ({ 
      ...prev, 
      carId, 
      carName: car ? car.name : '',
      carPlate: car ? car.plateNumber || '' : ''
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {booking ? 'Rezervasyon Düzenle' : 'Yeni Rezervasyon'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-1" />
              Müşteri
            </label>
            <select
              value={formData.customerId}
              onChange={(e) => handleCustomerChange(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.customerId ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Müşteri seçiniz</option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.fullName} - {customer.email}
                </option>
              ))}
            </select>
            {errors.customerId && <p className="text-red-500 text-sm mt-1">{errors.customerId}</p>}
          </div>

          {/* Car Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Car className="w-4 h-4 inline mr-1" />
              Araç
            </label>
            <select
              value={formData.carId}
              onChange={(e) => handleCarChange(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.carId ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Araç seçiniz</option>
              {cars.map(car => (
                <option key={car.id} value={car.id}>
                  {car.name} ({car.brand}) - ₺{car.pricePerDay}/gün
                </option>
              ))}
            </select>
            {errors.carId && <p className="text-red-500 text-sm mt-1">{errors.carId}</p>}
            {selectedCar && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Seçilen Araç:</strong> {selectedCar.name} ({selectedCar.brand})
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Plaka:</strong> {selectedCar.plateNumber || 'Belirtilmemiş'}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Günlük Ücret:</strong> ₺{selectedCar.pricePerDay}
                </p>
              </div>
            )}
          </div>

          {/* Date and Time Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Alış Tarihi
              </label>
              <input
                type="date"
                value={formData.pickupDate}
                onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.pickupDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.pickupDate && <p className="text-red-500 text-sm mt-1">{errors.pickupDate}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Teslim Tarihi
              </label>
              <input
                type="date"
                value={formData.returnDate}
                onChange={(e) => handleInputChange('returnDate', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.returnDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.returnDate && <p className="text-red-500 text-sm mt-1">{errors.returnDate}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Alış Saati
              </label>
              <select
                value={formData.pickupTime}
                onChange={(e) => handleInputChange('pickupTime', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {timeOptions.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Teslim Saati
              </label>
              <select
                value={formData.returnTime}
                onChange={(e) => handleInputChange('returnTime', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {timeOptions.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Location Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Alış Lokasyonu
              </label>
              <select
                value={formData.pickupLocation}
                onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.pickupLocation ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Lokasyon seçiniz</option>
                {locationNames.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              {errors.pickupLocation && <p className="text-red-500 text-sm mt-1">{errors.pickupLocation}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Teslim Lokasyonu
              </label>
              <select
                value={formData.returnLocation}
                onChange={(e) => handleInputChange('returnLocation', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.returnLocation ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Lokasyon seçiniz</option>
                {locationNames.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              {errors.returnLocation && <p className="text-red-500 text-sm mt-1">{errors.returnLocation}</p>}
            </div>
          </div>

          {/* Status and Total Amount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Durum
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Pending">Beklemede</option>
                <option value="Active">Aktif</option>
                <option value="Completed">Tamamlandı</option>
                <option value="Cancelled">İptal Edildi</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Toplam Tutar
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  value={formData.totalAmount}
                  onChange={(e) => handleInputChange('totalAmount', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  readOnly
                />
                <span className="ml-2 text-gray-500">₺</span>
              </div>
              {selectedCar && days > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  {days} gün × ₺{selectedCar.pricePerDay} = ₺{selectedCar.pricePerDay * days}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {booking ? 'Güncelle' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal; 