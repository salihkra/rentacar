import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Users, Settings, Fuel, Gauge, Calendar, Shield, Plus, Minus } from 'lucide-react';
import { Car, BookingExtra, InsurancePackage } from '../types';
import { bookingExtras, insurancePackages } from '../data/mockData';

interface CarDetailModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
  onReserve: (carId: string, extras: BookingExtra[], insurance: InsurancePackage, totalDays: number) => void;
}

const CarDetailModal: React.FC<CarDetailModalProps> = ({ car, isOpen, onClose, onReserve }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedExtras, setSelectedExtras] = useState<BookingExtra[]>(bookingExtras.map(extra => ({ ...extra, selected: false })));
  const [selectedInsurance, setSelectedInsurance] = useState<InsurancePackage>(insurancePackages[0]);
  const [rentalDays, setRentalDays] = useState(3);

  if (!isOpen || !car) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  const toggleExtra = (extraId: string) => {
    setSelectedExtras(prev => 
      prev.map(extra => 
        extra.id === extraId ? { ...extra, selected: !extra.selected } : extra
      )
    );
  };

  const calculateTotal = () => {
    const carTotal = car.pricePerDay * rentalDays;
    const extrasTotal = selectedExtras.filter(e => e.selected).reduce((sum, e) => sum + (e.price * rentalDays), 0);
    const insuranceTotal = selectedInsurance.price * rentalDays;
    return carTotal + extrasTotal + insuranceTotal;
  };

  const handleReserve = () => {
    onReserve(car.id, selectedExtras.filter(e => e.selected), selectedInsurance, rentalDays);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">{car.name}</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="bg-white px-6 py-6 max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column - Images and Details */}
              <div>
                {/* Image Gallery */}
                <div className="relative mb-6">
                  <img
                    src={car.images[currentImageIndex]}
                    alt={car.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  {car.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {car.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Car Specifications */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-lg mb-4">Teknik Özellikler</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-blue-500" />
                      <span>{car.seats} Kişi</span>
                    </div>
                    <div className="flex items-center">
                      <Settings className="w-4 h-4 mr-2 text-blue-500" />
                      <span>{car.transmission === 'Automatic' ? 'Otomatik' : 'Manuel'}</span>
                    </div>
                    <div className="flex items-center">
                      <Fuel className="w-4 h-4 mr-2 text-blue-500" />
                      <span>{car.fuelType}</span>
                    </div>
                    <div className="flex items-center">
                      <Gauge className="w-4 h-4 mr-2 text-blue-500" />
                      <span>{car.kmLimit} km/gün</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div><strong>Motor:</strong> {car.engineSize}</div>
                      <div><strong>Bagaj:</strong> {car.trunkCapacity}</div>
                      <div><strong>Yıl:</strong> {car.year}</div>
                      <div><strong>Kilometre:</strong> {car.mileage.toLocaleString()} km</div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-lg mb-3">Özellikler</h4>
                  <div className="flex flex-wrap gap-2">
                    {car.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Booking */}
              <div>
                {/* Rental Duration */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-lg mb-3">Kiralama Süresi</h4>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setRentalDays(Math.max(1, rentalDays - 1))}
                      className="bg-white border border-gray-300 rounded-lg p-2 hover:bg-gray-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-xl font-semibold">{rentalDays} Gün</span>
                    <button
                      onClick={() => setRentalDays(rentalDays + 1)}
                      className="bg-white border border-gray-300 rounded-lg p-2 hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Extra Services */}
                <div className="mb-6">
                  <h4 className="font-semibold text-lg mb-3">Ek Hizmetler</h4>
                  <div className="space-y-3">
                    {selectedExtras.map((extra) => (
                      <div key={extra.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={extra.selected}
                            onChange={() => toggleExtra(extra.id)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="ml-3 text-sm font-medium">{extra.name}</span>
                        </div>
                        <span className="text-sm text-gray-600">₺{extra.price}/gün</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Insurance Packages */}
                <div className="mb-6">
                  <h4 className="font-semibold text-lg mb-3 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Sigorta Paketleri
                  </h4>
                  <div className="space-y-3">
                    {insurancePackages.map((insurance) => (
                      <div
                        key={insurance.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedInsurance.id === insurance.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedInsurance(insurance)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              checked={selectedInsurance.id === insurance.id}
                              onChange={() => setSelectedInsurance(insurance)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-3 font-medium">{insurance.name}</span>
                          </div>
                          <span className="text-sm text-gray-600">
                            {insurance.price === 0 ? 'Ücretsiz' : `₺${insurance.price}/gün`}
                          </span>
                        </div>
                        <ul className="text-xs text-gray-600 ml-7">
                          {insurance.coverage.map((item, index) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-lg mb-3">Fiyat Özeti</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Araç kirası ({rentalDays} gün)</span>
                      <span>₺{(car.pricePerDay * rentalDays).toLocaleString()}</span>
                    </div>
                    {selectedExtras.filter(e => e.selected).map((extra) => (
                      <div key={extra.id} className="flex justify-between">
                        <span>{extra.name} ({rentalDays} gün)</span>
                        <span>₺{(extra.price * rentalDays).toLocaleString()}</span>
                      </div>
                    ))}
                    {selectedInsurance.price > 0 && (
                      <div className="flex justify-between">
                        <span>{selectedInsurance.name} ({rentalDays} gün)</span>
                        <span>₺{(selectedInsurance.price * rentalDays).toLocaleString()}</span>
                      </div>
                    )}
                    <div className="border-t border-gray-300 pt-2 flex justify-between font-semibold text-lg">
                      <span>Toplam</span>
                      <span>₺{calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Reserve Button */}
                <button
                  onClick={handleReserve}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold shadow-md transition-colors flex items-center justify-center"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Rezervasyon Yap
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailModal;