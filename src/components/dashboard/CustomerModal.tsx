import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, Calendar, MapPin, FileText, Save } from 'lucide-react';
import { Customer } from '../../types';
import { CreateCustomerData } from '../../services/customerService';

interface CustomerModalProps {
  customer?: Customer | null;
  onSave: (customerData: CreateCustomerData) => void;
  onClose: () => void;
}

const CustomerModal: React.FC<CustomerModalProps> = ({
  customer,
  onSave,
  onClose
}) => {
  const [formData, setFormData] = useState<CreateCustomerData>({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationalId: '',
    driverLicenseNumber: '',
    driverLicenseExpiry: '',
    address: '',
    notes: '',
    status: 'Active'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (customer) {
      setFormData({
        fullName: customer.fullName,
        email: customer.email,
        phone: customer.phone,
        dateOfBirth: customer.dateOfBirth,
        nationalId: customer.nationalId,
        driverLicenseNumber: customer.driverLicenseNumber,
        driverLicenseExpiry: customer.driverLicenseExpiry,
        address: customer.address,
        notes: customer.notes || '',
        status: customer.status
      });
    }
  }, [customer]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Ad soyad gereklidir';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email gereklidir';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir email adresi giriniz';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon numarası gereklidir';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Doğum tarihi gereklidir';
    }

    if (!formData.nationalId.trim()) {
      newErrors.nationalId = 'TC Kimlik No / Pasaport No gereklidir';
    }

    if (!formData.driverLicenseNumber.trim()) {
      newErrors.driverLicenseNumber = 'Ehliyet numarası gereklidir';
    }

    if (!formData.driverLicenseExpiry) {
      newErrors.driverLicenseExpiry = 'Ehliyet geçerlilik tarihi gereklidir';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Adres gereklidir';
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

  const handleInputChange = (field: keyof CreateCustomerData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">
                {customer ? 'Müşteri Düzenle' : 'Yeni Müşteri Ekle'}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white px-6 py-6 max-h-[70vh] overflow-y-auto">
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Kişisel Bilgiler
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Doğum Tarihi *
                    </label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className={`w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.dateOfBirth && (
                      <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      TC Kimlik No / Pasaport No *
                    </label>
                    <input
                      type="text"
                      value={formData.nationalId}
                      onChange={(e) => handleInputChange('nationalId', e.target.value)}
                      className={`w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.nationalId ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.nationalId && (
                      <p className="text-red-500 text-sm mt-1">{errors.nationalId}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Durum
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value as 'Active' | 'Inactive')}
                      className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Active">Aktif</option>
                      <option value="Inactive">Pasif</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  İletişim Bilgileri
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Driver License Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Ehliyet Bilgileri
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ehliyet Numarası *
                    </label>
                    <input
                      type="text"
                      value={formData.driverLicenseNumber}
                      onChange={(e) => handleInputChange('driverLicenseNumber', e.target.value)}
                      className={`w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.driverLicenseNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.driverLicenseNumber && (
                      <p className="text-red-500 text-sm mt-1">{errors.driverLicenseNumber}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Geçerlilik Tarihi *
                    </label>
                    <input
                      type="date"
                      value={formData.driverLicenseExpiry}
                      onChange={(e) => handleInputChange('driverLicenseExpiry', e.target.value)}
                      className={`w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.driverLicenseExpiry ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.driverLicenseExpiry && (
                      <p className="text-red-500 text-sm mt-1">{errors.driverLicenseExpiry}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Adres Bilgileri
                </h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adres *
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={3}
                    className={`w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notlar
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Müşteri hakkında ek notlar..."
                />
              </div>
            </div>
          </form>

          <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium"
            >
              İptal
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              {customer ? 'Değişiklikleri Kaydet' : 'Müşteri Ekle'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerModal; 