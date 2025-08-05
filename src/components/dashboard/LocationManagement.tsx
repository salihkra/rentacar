import React, { useState, useMemo, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, MapPin, Phone, Clock, Mail, User, Calendar, Loader2 } from 'lucide-react';
import { Location } from '../../types';
import { locationService, CreateLocationData } from '../../services/locationService';
import LocationModal from './LocationModal';

interface LocationManagementProps {
  onBackToHome?: () => void;
}

const LocationManagement: React.FC<LocationManagementProps> = ({ onBackToHome }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);

  // Load locations on component mount
  useEffect(() => {
    loadLocations();
  }, []);

  // Get unique cities for filter
  const cities = useMemo(() => {
    const citySet = new Set(locations.map(location => location.city));
    return Array.from(citySet).sort();
  }, [locations]);

  // Filter locations based on search and filters
  const filteredLocations = useMemo(() => {
    return locations.filter(location => {
      const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           location.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || location.status === statusFilter;
      const matchesCity = cityFilter === 'all' || location.city === cityFilter;
      
      return matchesSearch && matchesStatus && matchesCity;
    });
  }, [locations, searchTerm, statusFilter, cityFilter]);

  const loadLocations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await locationService.getAllLocations();
      setLocations(data);
    } catch (err) {
      setError('Lokasyonlar yüklenirken hata oluştu');
      console.error('Error loading locations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLocation = () => {
    setEditingLocation(null);
    setShowModal(true);
  };

  const handleEditLocation = (location: Location) => {
    setEditingLocation(location);
    setShowModal(true);
  };

  const handleDeleteLocation = async (locationId: string) => {
    if (window.confirm('Bu lokasyonu silmek istediğinizden emin misiniz?')) {
      try {
        await locationService.deleteLocation(locationId);
        setLocations(locations.filter(loc => loc.id !== locationId));
      } catch (err) {
        setError('Lokasyon silinirken hata oluştu');
        console.error('Error deleting location:', err);
      }
    }
  };

  const handleSaveLocation = async (locationData: CreateLocationData) => {
    try {
      if (editingLocation) {
        // Update existing location
        const updatedLocation = await locationService.updateLocation({
          ...locationData,
          id: editingLocation.id
        });
        setLocations(locations.map(loc => 
          loc.id === editingLocation.id ? updatedLocation : loc
        ));
      } else {
        // Add new location
        const newLocation = await locationService.createLocation(locationData);
        setLocations([newLocation, ...locations]);
      }
      setShowModal(false);
      setEditingLocation(null);
      setError(null);
    } catch (err) {
      setError(editingLocation ? 'Lokasyon güncellenirken hata oluştu' : 'Lokasyon eklenirken hata oluştu');
      console.error('Error saving location:', err);
    }
  };

  return (
    <div className="py-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lokasyon Yönetimi</h1>
            <p className="text-gray-600 mt-1">Rental lokasyonlarını yönetin ve düzenleyin</p>
          </div>
          <button
            onClick={handleAddLocation}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors inline-flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Yeni Lokasyon
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Lokasyon ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="Active">Aktif</option>
                <option value="Inactive">Pasif</option>
              </select>
            </div>

            {/* City Filter */}
            <div>
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tüm Şehirler</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setCityFilter('all');
              }}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Filtreleri Temizle
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="h-5 w-5 text-red-400">⚠️</div>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
            <div className="flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              <span className="ml-3 text-gray-600">Lokasyonlar yükleniyor...</span>
            </div>
          </div>
        )}

                {/* Locations Table */}
        {!loading && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lokasyon
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İletişim
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Çalışma Saatleri
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Durum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kapasite
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLocations.map((location) => (
                    <tr key={location.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{location.name}</div>
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {location.address}
                          </div>
                          <div className="text-sm text-gray-500">{location.city}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {location.phone}
                        </div>
                        {location.email && (
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <Mail className="w-4 h-4 mr-1" />
                            {location.email}
                          </div>
                        )}
                        {location.manager && (
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <User className="w-4 h-4 mr-1" />
                            {location.manager}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {location.workingHours}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          location.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {location.status === 'Active' ? 'Aktif' : 'Pasif'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {location.capacity || '-'} araç
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditLocation(location)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteLocation(location.id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredLocations.length === 0 && (
              <div className="text-center py-12">
                <MapPin className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Lokasyon bulunamadı</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Arama kriterlerinize uygun lokasyon bulunmuyor.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Toplam Lokasyon</p>
                <p className="text-2xl font-semibold text-gray-900">{locations.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="h-3 w-3 bg-green-600 rounded-full"></div>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Aktif Lokasyon</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {locations.filter(loc => loc.status === 'Active').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                  <div className="h-3 w-3 bg-red-600 rounded-full"></div>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pasif Lokasyon</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {locations.filter(loc => loc.status === 'Inactive').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Şehir Sayısı</p>
                <p className="text-2xl font-semibold text-gray-900">{cities.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Modal */}
      {showModal && (
        <LocationModal
          location={editingLocation}
          onSave={handleSaveLocation}
          onClose={() => {
            setShowModal(false);
            setEditingLocation(null);
          }}
        />
      )}
    </div>
  );
};

export default LocationManagement; 