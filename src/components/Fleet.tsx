import React from 'react';
import { Car as CarType, Filter } from 'lucide-react';
import CarCard from './CarCard';
import { cars } from '../data/mockData';
import { Car, SearchFilters } from '../types';
import { useState, useEffect } from 'react';

interface FleetProps {
  onCarSelect: (car: any) => void;
  filters: SearchFilters | null;
  showAll?: boolean;
}

const Fleet: React.FC<FleetProps> = ({ onCarSelect, filters, showAll = false }) => {
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars);
  const [localFilters, setLocalFilters] = useState<Partial<SearchFilters>>({});
  const [showAllCars, setShowAllCars] = useState(showAll);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    const isPrice = name === 'minPrice' || name === 'maxPrice';
    const finalValue = value === '' ? undefined : (isPrice ? Number(value) : value);
    setLocalFilters(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleClearFilters = () => {
    setLocalFilters({});
  };

  useEffect(() => {
    const combinedFilters = { ...filters, ...localFilters };

    const newFilteredCars = cars.filter(car => {
      return (
        (!combinedFilters.pickupLocation || car.location === combinedFilters.pickupLocation) &&
        (!combinedFilters.brand || car.brand === combinedFilters.brand) &&
        (!combinedFilters.category || car.category === combinedFilters.category) &&
        (!combinedFilters.transmission || car.transmission === combinedFilters.transmission) &&
        (!combinedFilters.fuelType || car.fuelType === combinedFilters.fuelType) &&
        (!combinedFilters.minPrice || car.pricePerDay >= combinedFilters.minPrice) &&
        (!combinedFilters.maxPrice || car.pricePerDay <= combinedFilters.maxPrice)
      );
    });
    setFilteredCars(newFilteredCars);
  }, [filters, localFilters]);

  const handleBooking = (carId: string) => {
    const car = cars.find(c => c.id === carId);
    if (car) {
      onCarSelect(car);
    }
  };

  // Determine which cars to display
  const carsToDisplay = showAllCars ? filteredCars : filteredCars.slice(0, 3);

  return (
    <section id="fleet" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold mb-2 inline-block">ARAÇ FİLOMUZ</span>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Araç Koleksiyonumuzu Keşfedin</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ekonomik kompakt araçlardan lüks SUV'lara kadar, ihtiyaçlarınıza uygun mükemmel aracı rekabetçi fiyatlarla bulun.
          </p>
        </div>
        
        {/* Filter Bar */}
        {showAllCars && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filtreler
              </h3>
              <button onClick={handleClearFilters} className="text-blue-600 hover:text-blue-800 text-sm">
                Filtreleri Temizle
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <select name="brand" value={localFilters.brand || ''} onChange={handleFilterChange} className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Marka</option>
                <option value="Toyota">Toyota</option>
                <option value="Ford">Ford</option>
                <option value="BMW">BMW</option>
                <option value="Chevrolet">Chevrolet</option>
                <option value="Mercedes">Mercedes</option>
                <option value="Audi">Audi</option>
                <option value="Volkswagen">Volkswagen</option>
                <option value="Renault">Renault</option>
              </select>
              <select name="category" value={localFilters.category || ''} onChange={handleFilterChange} className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Kategori</option>
                <option value="Economy">Ekonomik</option>
                <option value="SUV">SUV</option>
                <option value="Luxury">Lüks</option>
                <option value="Sports">Spor</option>
              </select>
              <select name="transmission" value={localFilters.transmission || ''} onChange={handleFilterChange} className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Vites</option>
                <option value="Automatic">Otomatik</option>
                <option value="Manual">Manuel</option>
              </select>
              <select name="fuelType" value={localFilters.fuelType || ''} onChange={handleFilterChange} className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Yakıt Türü</option>
                <option value="Petrol">Benzin</option>
                <option value="Diesel">Dizel</option>
                <option value="Electric">Elektrik</option>
                <option value="Hybrid">Hibrit</option>
              </select>
              <div className="flex space-x-2">
                <input
                  type="number"
                  name="minPrice"
                  value={localFilters.minPrice || ''}
                  onChange={handleFilterChange}
                  placeholder="Min Fiyat"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="maxPrice"
                  value={localFilters.maxPrice || ''}
                  onChange={handleFilterChange}
                  placeholder="Max Fiyat"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {carsToDisplay.map((car) => (
            <CarCard key={car.id} car={car} onBook={handleBooking} />
          ))}
        </div>
        
        {!showAllCars && filteredCars.length > 3 && (
          <div className="text-center mt-12">
            <button 
              onClick={() => setShowAllCars(true)}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
            >
              <CarType className="w-5 h-5 mr-2" />
              Daha Fazla Araç Görüntüle ({filteredCars.length - 3} araç daha)
            </button>
          </div>
        )}
        
        {showAllCars && (
          <div className="text-center mt-12">
            <p className="text-gray-600">
              Toplam {filteredCars.length} araç gösteriliyor
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Fleet;