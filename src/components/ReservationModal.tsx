import React, { useState } from 'react';
import { X, User, Mail, Phone, CreditCard, Calendar, MapPin, Clock } from 'lucide-react';
import { Car, BookingExtra, InsurancePackage } from '../types';

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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tcNo: '',
    address: '',
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

  if (!isOpen || !car) return null;

  const calculateTotal = () => {
    const carTotal = car.pricePerDay * totalDays;
    const extrasTotal = extras.reduce((sum, e) => sum + (e.price * totalDays), 0);
    const insuranceTotal = insurance.price * totalDays;
    return carTotal + extrasTotal + insuranceTotal;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookingData = {
      car,
      extras,
      insurance,
      totalDays,
      customerInfo: formData,
      total: calculateTotal(),
      isGuest
    };
    onConfirm(bookingData);
  };

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
                {/* Guest/Member Toggle */}
                <div className="mb-6">
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsGuest(true)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        isGuest ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Misafir Kullanıcı
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsGuest(false)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        !isGuest ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Üye Girişi
                    </button>
                  </div>
                </div>

                {/* Customer Information */}
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
                        min={new Date().toISOString().split('T')[0]}
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
                        min={formData.pickupDate}
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
                          className="w-full border border-gray-300 rounded-lg py-2 px-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                        >
                          <option value="08:00">08:00</option>
                          <option value="10:00">10:00</option>
                          <option value="12:00">12:00</option>
                          <option value="14:00">14:00</option>
                          <option value="16:00">16:00</option>
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
                          className="w-full border border-gray-300 rounded-lg py-2 px-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                        >
                          <option value="08:00">08:00</option>
                          <option value="10:00">10:00</option>
                          <option value="12:00">12:00</option>
                          <option value="14:00">14:00</option>
                          <option value="16:00">16:00</option>
                          <option value="18:00">18:00</option>
                        </select>
                        <Clock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teslim Alma Yeri
                      </label>
                      <div className="relative">
                        <select
                          value={formData.pickupLocation}
                          onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg py-2 px-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                        >
                          <option value="Girne">Girne</option>
                          <option value="Lefkoşa">Lefkoşa</option>
                          <option value="Gazimağusa">Gazimağusa</option>
                          <option value="İskele">İskele</option>
                        </select>
                        <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teslim Etme Yeri
                      </label>
                      <div className="relative">
                        <select
                          value={formData.returnLocation}
                          onChange={(e) => setFormData({ ...formData, returnLocation: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg py-2 px-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                        >
                          <option value="Girne">Girne</option>
                          <option value="Lefkoşa">Lefkoşa</option>
                          <option value="Gazimağusa">Gazimağusa</option>
                          <option value="İskele">İskele</option>
                        </select>
                        <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                      </div>
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
                        Kart Üzerindeki İsim *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.cardName}
                        onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kart Numarası *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={19}
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        placeholder="1234 5678 9012 3456"
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
                          maxLength={5}
                          value={formData.expiryDate}
                          onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                          placeholder="MM/YY"
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
                          maxLength={3}
                          value={formData.cvv}
                          onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                          placeholder="123"
                          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Summary */}
              <div>
                {/* Booking Summary */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h4 className="font-semibold text-lg mb-4">Rezervasyon Özeti</h4>
                  
                  {/* Car Info */}
                  <div className="flex items-center mb-4 pb-4 border-b border-gray-200">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-16 h-12 object-cover rounded-lg mr-4"
                    />
                    <div>
                      <h5 className="font-medium">{car.name}</h5>
                      <p className="text-sm text-gray-600">{car.model}</p>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span>Araç kirası ({totalDays} gün)</span>
                      <span>₺{(car.pricePerDay * totalDays).toLocaleString()}</span>
                    </div>
                    {extras.map((extra) => (
                      <div key={extra.id} className="flex justify-between">
                        <span>{extra.name} ({totalDays} gün)</span>
                        <span>₺{(extra.price * totalDays).toLocaleString()}</span>
                      </div>
                    ))}
                    {insurance.price > 0 && (
                      <div className="flex justify-between">
                        <span>{insurance.name} ({totalDays} gün)</span>
                        <span>₺{(insurance.price * totalDays).toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-300 pt-4">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Toplam Tutar</span>
                      <span>₺{calculateTotal().toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      * KDV dahil fiyattır
                    </p>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="mb-6">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      required
                      checked={formData.acceptTerms}
                      onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                    />
                    <label className="ml-3 text-sm text-gray-700">
                      <a href="#" className="text-blue-600 hover:text-blue-800">Kiralama şartlarını</a> ve{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-800">gizlilik politikasını</a> okudum, kabul ediyorum. *
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!formData.acceptTerms}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold shadow-md transition-colors"
                >
                  Rezervasyonu Tamamla
                </button>

                <p className="text-xs text-gray-600 mt-3 text-center">
                  Güvenli ödeme sistemi ile korunuyorsunuz
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;