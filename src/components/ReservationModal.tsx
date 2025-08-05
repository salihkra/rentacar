import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, CreditCard, Calendar, MapPin, Clock, Search, AlertCircle, CheckCircle } from 'lucide-react';
import { Car, BookingExtra, InsurancePackage, Customer } from '../types';
import { customerService } from '../services/customerService';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: Car | null;
  extras: BookingExtra[];
  insurance: InsurancePackage;
  totalDays: number;
  onConfirm: (bookingData: any) => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  car,
  extras,
  insurance,
  totalDays,
  onConfirm
}) => {
  const [isGuest, setIsGuest] = useState(true);
  const [searchMode, setSearchMode] = useState<'guest' | 'search' | 'create'>('guest');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'email' | 'nationalId' | 'phone'>('email');
  const [searchResults, setSearchResults] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tcNo: '',
    address: '',
    dateOfBirth: '',
    pickupDate: '',
    returnDate: '',
    pickupTime: '10:00',
    returnTime: '10:00',
    pickupLocation: 'Girne',
    returnLocation: 'Girne',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    acceptTerms: false
  });

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setSearchMode('guest');
      setSearchTerm('');
      setSearchResults([]);
      setSelectedCustomer(null);
      setSearchError('');
      setFormData({
        name: '',
        email: '',
        phone: '',
        tcNo: '',
        address: '',
        dateOfBirth: '',
        pickupDate: '',
        returnDate: '',
        pickupTime: '10:00',
        returnTime: '10:00',
        pickupLocation: 'Girne',
        returnLocation: 'Girne',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: '',
        acceptTerms: false
      });
    }
  }, [isOpen]);

  if (!isOpen || !car) return null;

  const calculateTotal = () => {
    const carTotal = car.pricePerDay * totalDays;
    const extrasTotal = extras.reduce((sum, e) => sum + (e.price * totalDays), 0);
    const insuranceTotal = insurance.price * totalDays;
    return carTotal + extrasTotal + insuranceTotal;
  };

  const handleSearchCustomer = async () => {
    if (!searchTerm.trim()) {
      setSearchError('Lütfen arama terimi giriniz');
      return;
    }

    setIsSearching(true);
    setSearchError('');
    setSearchResults([]);

    try {
      let customer: Customer | null = null;
      
      switch (searchType) {
        case 'email':
          customer = await customerService.findCustomerByEmail(searchTerm.trim());
          break;
        case 'nationalId':
          customer = await customerService.findCustomerByNationalId(searchTerm.trim());
          break;
        case 'phone':
          customer = await customerService.findCustomerByPhone(searchTerm.trim());
          break;
      }

      if (customer) {
        setSearchResults([customer]);
        setSelectedCustomer(customer);
        setSearchError('');
      } else {
        setSearchError('Müşteri bulunamadı. Lütfen bilgileri kontrol ediniz veya yeni müşteri oluşturunuz.');
        setSelectedCustomer(null);
      }
    } catch (error) {
      console.error('Error searching customer:', error);
      setSearchError('Arama sırasında bir hata oluştu. Lütfen tekrar deneyiniz.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleCreateCustomer = async () => {
    // Validate required fields for customer creation
    if (!formData.name || !formData.email || !formData.phone || !formData.tcNo) {
      setSearchError('Müşteri oluşturmak için ad, email, telefon ve TC kimlik numarası gereklidir.');
      return;
    }

    try {
      const newCustomer = await customerService.createCustomer({
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth || new Date().toISOString().split('T')[0],
        nationalId: formData.tcNo,
        driverLicenseNumber: formData.tcNo, // Using TC as driver license for now
        driverLicenseExpiry: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 10 years from now
        address: formData.address || 'Belirtilmemiş',
        notes: 'Rezervasyon sırasında oluşturuldu',
        status: 'Active'
      });

      setSelectedCustomer(newCustomer);
      setSearchMode('guest');
      setSearchError('');
    } catch (error) {
      console.error('Error creating customer:', error);
      setSearchError('Müşteri oluşturulurken bir hata oluştu. Lütfen tekrar deneyiniz.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that we have a customer (either existing or new)
    if (!selectedCustomer && searchMode !== 'guest') {
      setSearchError('Lütfen önce müşteri seçiniz veya yeni müşteri oluşturunuz.');
      return;
    }

    const bookingData = {
      car,
      extras,
      insurance,
      totalDays,
      customerInfo: formData,
      customer: selectedCustomer, // Add the customer object
      total: calculateTotal(),
      isGuest: searchMode === 'guest'
    };
    onConfirm(bookingData);
  };

  const renderCustomerSearch = () => (
    <div className="mb-6">
      <h4 className="font-semibold text-lg mb-4 flex items-center">
        <Search className="w-5 h-5 mr-2" />
        Müşteri Ara
      </h4>
      
      <div className="space-y-4">
        <div className="flex space-x-2">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as 'email' | 'nationalId' | 'phone')}
            className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="email">E-posta</option>
            <option value="nationalId">TC Kimlik No</option>
            <option value="phone">Telefon</option>
          </select>
          <input
            type="text"
            placeholder={`${searchType === 'email' ? 'E-posta' : searchType === 'nationalId' ? 'TC Kimlik No' : 'Telefon'} giriniz`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleSearchCustomer}
            disabled={isSearching}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSearching ? 'Aranıyor...' : 'Ara'}
          </button>
        </div>

        {searchError && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <span>{searchError}</span>
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="border border-gray-200 rounded-lg p-4">
            <h5 className="font-medium mb-2">Bulunan Müşteri:</h5>
            {searchResults.map((customer) => (
              <div
                key={customer.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedCustomer?.id === customer.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedCustomer(customer)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{customer.fullName}</p>
                    <p className="text-sm text-gray-600">{customer.email}</p>
                    <p className="text-sm text-gray-600">{customer.phone}</p>
                  </div>
                  {selectedCustomer?.id === customer.id && (
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setSearchMode('create')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Yeni Müşteri Oluştur
          </button>
          <button
            type="button"
            onClick={() => setSearchMode('guest')}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            Misafir Olarak Devam Et
          </button>
        </div>
      </div>
    </div>
  );

  const renderCustomerCreate = () => (
    <div className="mb-6">
      <h4 className="font-semibold text-lg mb-4 flex items-center">
        <User className="w-5 h-5 mr-2" />
        Yeni Müşteri Oluştur
      </h4>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ad Soyad *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            E-posta *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Telefon *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            TC Kimlik No *
          </label>
          <input
            type="text"
            required
            maxLength={11}
            value={formData.tcNo}
            onChange={(e) => setFormData({ ...formData, tcNo: e.target.value })}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adres
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            rows={3}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex space-x-2">
          <button
            type="button"
            onClick={handleCreateCustomer}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Müşteri Oluştur
          </button>
          <button
            type="button"
            onClick={() => setSearchMode('search')}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            Geri Dön
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Rezervasyon Tamamla</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white px-6 py-6 max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column - Customer Info */}
              <div>
                {/* Customer Type Selection */}
                <div className="mb-6">
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSearchMode('guest');
                        setSelectedCustomer(null);
                      }}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        searchMode === 'guest' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Misafir Kullanıcı
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchMode('search');
                        setSelectedCustomer(null);
                      }}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        searchMode === 'search' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Müşteri Ara
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchMode('create');
                        setSelectedCustomer(null);
                      }}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        searchMode === 'create' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Yeni Müşteri
                    </button>
                  </div>
                </div>

                {/* Customer Search/Create Section */}
                {searchMode === 'search' && renderCustomerSearch()}
                {searchMode === 'create' && renderCustomerCreate()}

                {/* Selected Customer Display */}
                {selectedCustomer && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h5 className="font-medium text-green-800">Seçilen Müşteri</h5>
                    </div>
                    <p className="font-medium">{selectedCustomer.fullName}</p>
                    <p className="text-sm text-gray-600">{selectedCustomer.email}</p>
                    <p className="text-sm text-gray-600">{selectedCustomer.phone}</p>
                    <button
                      type="button"
                      onClick={() => setSelectedCustomer(null)}
                      className="text-sm text-red-600 hover:text-red-700 mt-2"
                    >
                      Müşteriyi Değiştir
                    </button>
                  </div>
                )}

                {/* Customer Information - Only show for guest mode or when no customer selected */}
                {(searchMode === 'guest' || !selectedCustomer) && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-lg mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Müşteri Bilgileri
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Ad Soyad *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          E-posta *
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg py-2 px-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Telefon *
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg py-2 px-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          TC Kimlik No *
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={11}
                          value={formData.tcNo}
                          onChange={(e) => setFormData({ ...formData, tcNo: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Adres
                        </label>
                        <textarea
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          rows={3}
                          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Rental Details */}
                <div className="mb-6">
                  <h4 className="font-semibold text-lg mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Kiralama Detayları
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teslim Alma Tarihi *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.pickupDate}
                        onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teslim Etme Tarihi *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.returnDate}
                        onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teslim Alma Saati
                      </label>
                      <div className="relative">
                        <select
                          value={formData.pickupTime}
                          onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg py-2 px-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="08:00">08:00</option>
                          <option value="09:00">09:00</option>
                          <option value="10:00">10:00</option>
                          <option value="11:00">11:00</option>
                          <option value="12:00">12:00</option>
                          <option value="13:00">13:00</option>
                          <option value="14:00">14:00</option>
                          <option value="15:00">15:00</option>
                          <option value="16:00">16:00</option>
                          <option value="17:00">17:00</option>
                          <option value="18:00">18:00</option>
                        </select>
                        <Clock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teslim Etme Saati
                      </label>
                      <div className="relative">
                        <select
                          value={formData.returnTime}
                          onChange={(e) => setFormData({ ...formData, returnTime: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg py-2 px-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="08:00">08:00</option>
                          <option value="09:00">09:00</option>
                          <option value="10:00">10:00</option>
                          <option value="11:00">11:00</option>
                          <option value="12:00">12:00</option>
                          <option value="13:00">13:00</option>
                          <option value="14:00">14:00</option>
                          <option value="15:00">15:00</option>
                          <option value="16:00">16:00</option>
                          <option value="17:00">17:00</option>
                          <option value="18:00">18:00</option>
                        </select>
                        <Clock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teslim Alma Lokasyonu
                      </label>
                      <div className="relative">
                        <select
                          value={formData.pickupLocation}
                          onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg py-2 px-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Girne">Girne</option>
                          <option value="Lefkoşa">Lefkoşa</option>
                          <option value="Gazimağusa">Gazimağusa</option>
                          <option value="İskele">İskele</option>
                          <option value="Güzelyurt">Güzelyurt</option>
                        </select>
                        <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teslim Etme Lokasyonu
                      </label>
                      <div className="relative">
                        <select
                          value={formData.returnLocation}
                          onChange={(e) => setFormData({ ...formData, returnLocation: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg py-2 px-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Girne">Girne</option>
                          <option value="Lefkoşa">Lefkoşa</option>
                          <option value="Gazimağusa">Gazimağusa</option>
                          <option value="İskele">İskele</option>
                          <option value="Güzelyurt">Güzelyurt</option>
                        </select>
                        <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Car Details & Payment */}
              <div>
                {/* Car Details */}
                <div className="mb-6">
                  <h4 className="font-semibold text-lg mb-4">Araç Detayları</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={car.image} 
                        alt={car.name} 
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <h5 className="font-semibold text-lg">{car.name}</h5>
                        <p className="text-gray-600">{car.brand} {car.model}</p>
                        <p className="text-gray-600">{car.year} • {car.transmission} • {car.fuelType}</p>
                        <p className="text-2xl font-bold text-blue-600">₺{car.pricePerDay}/gün</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Extras & Insurance */}
                <div className="mb-6">
                  <h4 className="font-semibold text-lg mb-4">Ekstra Hizmetler</h4>
                  <div className="space-y-3">
                                         {extras.map((extra) => (
                       <div key={extra.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                         <div>
                           <p className="font-medium">{extra.name}</p>
                         </div>
                         <p className="font-semibold">₺{extra.price}/gün</p>
                       </div>
                     ))}
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium">{insurance.name}</p>
                        <p className="text-sm text-gray-600">Sigorta paketi</p>
                      </div>
                      <p className="font-semibold">₺{insurance.price}/gün</p>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="mb-6">
                  <h4 className="font-semibold text-lg mb-4 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Ödeme Bilgileri
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kart Numarası *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={16}
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value.replace(/\s/g, '') })}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Son Kullanma Tarihi *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          maxLength={5}
                          value={formData.expiryDate}
                          onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV *
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={4}
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kart Sahibinin Adı *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ad Soyad"
                        value={formData.cardName}
                        onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms & Total */}
                <div className="mb-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <input
                      type="checkbox"
                      required
                      checked={formData.acceptTerms}
                      onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                      className="mt-1"
                    />
                    <label className="text-sm text-gray-700">
                      <a href="#" className="text-blue-600 hover:underline">Kiralama şartları</a> ve{' '}
                      <a href="#" className="text-blue-600 hover:underline">gizlilik politikası</a>nı kabul ediyorum.
                    </label>
                  </div>

                  {/* Total Calculation */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Araç Kiralama ({totalDays} gün)</span>
                        <span>₺{car.pricePerDay * totalDays}</span>
                      </div>
                      {extras.map((extra) => (
                        <div key={extra.id} className="flex justify-between text-sm text-gray-600">
                          <span>{extra.name}</span>
                          <span>₺{extra.price * totalDays}</span>
                        </div>
                      ))}
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{insurance.name}</span>
                        <span>₺{insurance.price * totalDays}</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Toplam</span>
                          <span>₺{calculateTotal()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Rezervasyonu Tamamla
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;