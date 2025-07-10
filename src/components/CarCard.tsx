import React from 'react';
import { Users, Snowflake, Settings, Fuel, Calendar, MapPin, Gauge } from 'lucide-react';
import { Car } from '../types';

interface CarCardProps {
  car: Car;
  onBook: (carId: string) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onBook }) => {
  const categoryColors = {
    Economy: 'bg-blue-100 text-blue-800',
    Sports: 'bg-yellow-100 text-yellow-800',
    SUV: 'bg-green-100 text-green-800',
    Luxury: 'bg-purple-100 text-purple-800'
  };

  const categoryNames = {
    Economy: 'Ekonomik',
    Sports: 'Spor',
    SUV: 'SUV',
    Luxury: 'Lüks'
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <div className="relative">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-56 object-cover"
        />
        {car.isPopular && (
          <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Popüler
          </div>
        )}
        <div className="absolute bottom-3 left-3 bg-white text-gray-800 text-xs font-bold px-2 py-1 rounded-md shadow-sm flex items-center">
          <MapPin className="w-3 h-3 text-blue-500 mr-1" />
          {car.location}
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
            <p className="text-gray-500 text-sm">{car.model} • {car.mileage.toLocaleString()} km</p>
          </div>
          <div className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[car.category]}`}>
            {categoryNames[car.category]}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-gray-600 mb-4 text-sm">
          <div className="flex items-center mr-4">
            <Users className="w-4 h-4 mr-2 text-blue-500" />
            <span>{car.seats} Kişi</span>
          </div>
          <div className="flex items-center mr-4">
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
        
        <div className="flex justify-between items-center border-t border-gray-200 pt-4">
          <div>
            <p className="text-gray-500 text-sm">Günlük</p>
            <p className="text-2xl font-bold text-gray-900">
              ₺{car.pricePerDay}
              <span className="text-base font-normal">/gün</span>
            </p>
          </div>
          <button
            onClick={() => onBook(car.id)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center"
          >
            <Calendar className="w-4 h-4 mr-1" />
            Rezervasyon
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;