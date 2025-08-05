import React, { useState, useEffect } from 'react';
import { X, MapPin, Phone, Clock, Mail, User, Building } from 'lucide-react';
import { Location } from '../../types';
import { CreateLocationData } from '../../services/locationService';

interface LocationModalProps {
  location?: Location | null;
  onSave: (locationData: CreateLocationData) => void;
  onClose: () => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ location, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    phone: '',
    workingHours: '',
    status: 'Active' as 'Active' | 'Inactive',
    email: '',
    manager: '',
    capacity: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (location) {
      setFormData({
        name: location.name,
        address: location.address,
        city: location.city,
        phone: location.phone,
        workingHours: location.workingHours,
        status: location.status,
        email: location.email || '',
        manager: location.manager || '',
        capacity: location.capacity?.toString() || ''
      });
    }
  }, [location]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Lokasyon adı gereklidir';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Adres gereklidir';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Şehir gereklidir';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon numarası gereklidir';
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Geçerli bir telefon numarası giriniz';
    }

    if (!formData.workingHours.trim()) {
      newErrors.workingHours = 'Çalışma saatleri gereklidir';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }

    if (formData.capacity && (isNaN(Number(formData.capacity)) || Number(formData.capacity) < 0)) {
      newErrors.capacity = 'Geçerli bir kapasite sayısı giriniz';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave({
        name: formData.name.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        phone: formData.phone.trim(),
        workingHours: formData.workingHours.trim(),
        status: formData.status,
        email: formData.email.trim() || undefined,
        manager: formData.manager.trim() || undefined,
        capacity: formData.capacity ? Number(formData.capacity) : undefined
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            {location ? 'Lokasyon Düzenle' : 'Yeni Lokasyon Ekle'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Location Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Building className="inline w-4 h-4 mr-1" />
              Lokasyon Adı *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Örn: Girne Merkez Şube"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline w-4 h-4 mr-1" />
              Adres *
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              rows={2}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Tam adres bilgisi"
            />
            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
          </div>

                     {/* City and Phone */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                 Şehir *
               </label>
               <select
                 value={formData.city}
                 onChange={(e) => handleInputChange('city', e.target.value)}
                 className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                   errors.city ? 'border-red-500' : 'border-gray-300'
                 }`}
               >
                 <option value="">Şehir seçiniz</option>
                 <option value="Girne">Girne</option>
                 <option value="Lefkoşa">Lefkoşa</option>
                 <option value="Gazimağusa">Gazimağusa</option>
                 <option value="İskele">İskele</option>
                 <option value="Güzelyurt">Güzelyurt</option>
               </select>
               {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
             </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="inline w-4 h-4 mr-1" />
                Telefon *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+90 392 815 1234"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>
          </div>

          {/* Working Hours and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline w-4 h-4 mr-1" />
                Çalışma Saatleri *
              </label>
              <input
                type="text"
                value={formData.workingHours}
                onChange={(e) => handleInputChange('workingHours', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.workingHours ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Örn: 08:00 - 20:00"
              />
              {errors.workingHours && <p className="mt-1 text-sm text-red-600">{errors.workingHours}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Durum
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Active">Aktif</option>
                <option value="Inactive">Pasif</option>
              </select>
            </div>
          </div>

          {/* Email and Manager */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="inline w-4 h-4 mr-1" />
                E-posta
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="ornek@autorentpro.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline w-4 h-4 mr-1" />
                Müdür
              </label>
              <input
                type="text"
                value={formData.manager}
                onChange={(e) => handleInputChange('manager', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Lokasyon müdürü"
              />
            </div>
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Araç Kapasitesi
            </label>
            <input
              type="number"
              value={formData.capacity}
              onChange={(e) => handleInputChange('capacity', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.capacity ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Maksimum araç sayısı"
              min="0"
            />
            {errors.capacity && <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {location ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LocationModal; 