import React, { useState } from 'react';
import { MapPin, Calendar, Search, Clock } from 'lucide-react';
import { locationNames } from '../data/mockData';
import { SearchFilters } from '../types';

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  // Get current date and 3 days from now
  const today = new Date();
  const threeDaysLater = new Date();
  threeDaysLater.setDate(today.getDate() + 3);
  
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState<SearchFilters>({
    pickupLocation: '',
    returnLocation: '',
    pickupDate: formatDate(today),
    returnDate: formatDate(threeDaysLater),
    pickupTime: '10:00',
    returnTime: '10:00',
  });

  const timeOptions = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(formData);
  };

  const handleQuickFilter = (filter: Partial<SearchFilters>) => {
    onSearch({
      ...formData,
      ...filter,
    });
  };

  return (
    <section className="relative z-10 -mt-10 md:-mt-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Mükemmel Aracınızı Bulun</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Location and Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <select
                  value={formData.pickupLocation}
                  onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  required
                >
                  <option value="">Teslim Alma Yeri</option>
                  {locationNames.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
                <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
              
              <div className="relative">
                <select
                  value={formData.returnLocation}
                  onChange={(e) => setFormData({ ...formData, returnLocation: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  required
                >
                  <option value="">Teslim Etme Yeri</option>
                  {locationNames.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
                <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
              
              <div className="relative">
                <input
                  type="date"
                  value={formData.pickupDate}
                  onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
                <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <label className="absolute left-10 top-1 text-xs text-blue-600 pointer-events-none">
                  Teslim Alma Tarihi
                </label>
              </div>
              
              <div className="relative">
                <input
                  type="date"
                  value={formData.returnDate}
                  onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min={formData.pickupDate || new Date().toISOString().split('T')[0]}
                  required
                />
                <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <label className="absolute left-10 top-1 text-xs text-blue-600 pointer-events-none">
                  Teslim Etme Tarihi
                </label>
              </div>
            </div>
            
            {/* Time Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <select
                  value={formData.pickupTime}
                  onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <Clock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <label className="absolute left-10 top-1 text-xs text-blue-600 pointer-events-none">
                  Teslim Alma Saati
                </label>
              </div>
              
              <div className="relative">
                <select
                  value={formData.returnTime}
                  onChange={(e) => setFormData({ ...formData, returnTime: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <Clock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <label className="absolute left-10 top-1 text-xs text-blue-600 pointer-events-none">
                  Teslim Etme Saati
                </label>
              </div>
              
              <div className="flex items-end">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg w-full h-full font-semibold shadow-md transition-colors flex items-center justify-center"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Araç Ara
                </button>
              </div>
            </div>
          </form>
          
          {/* Quick filters */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Hızlı Filtreler</h3>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => handleQuickFilter({ category: 'Economy' })} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors">
                Ekonomik Araçlar
              </button>
              <button onClick={() => handleQuickFilter({ category: 'SUV' })} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition-colors">
                SUV Araçlar
              </button>
              <button onClick={() => handleQuickFilter({ category: 'Luxury' })} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors">
                Lüks Araçlar
              </button>
              <button onClick={() => handleQuickFilter({ transmission: 'Automatic' })} className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm hover:bg-yellow-200 transition-colors">
                Otomatik Vites
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchForm;