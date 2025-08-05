import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Eye, X, Save, Upload } from 'lucide-react';
import { Car } from '../../types';
import { carService } from '../../services/carService';

interface CarManagementProps {
  onCarDataChange: (cars: Car[]) => void;
}

// CarForm bileşeni CarManagement dışına taşındı
interface CarFormProps {
  formData: Partial<Car>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Car>>>;
  handleFeatureToggle: (feature: string) => void;
  availableFeatures: string[];
}

const CarForm: React.FC<CarFormProps> = ({ formData, setFormData, handleFeatureToggle, availableFeatures }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Araç Adı *</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Marka *</label>
        <input
          type="text"
          required
          value={formData.brand}
          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Model *</label>
        <input
          type="text"
          required
          value={formData.model}
          onChange={(e) => setFormData({ ...formData, model: e.target.value })}
          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Yıl *</label>
        <input
          type="number"
          required
          min="2000"
          max="2025"
          value={formData.year}
          onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || 0 })} // parseInt sonrası NaN kontrolü
          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Kilometre</label>
        <input
          type="number"
          min="0"
          value={formData.mileage}
          onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) || 0 })} // parseInt sonrası NaN kontrolü
          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Kategori *</label>
        <select
          required
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value as Car['category'] })}
          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Economy">Ekonomik</option>
          <option value="SUV">SUV</option>
          <option value="Luxury">Lüks</option>
          <option value="Sports">Spor</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Koltuk Sayısı *</label>
        <input
          type="number"
          required
          min="2"
          max="8"
          value={formData.seats}
          onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) || 0 })} // parseInt sonrası NaN kontrolü
          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Vites *</label>
        <select
          required
          value={formData.transmission}
          onChange={(e) => setFormData({ ...formData, transmission: e.target.value as Car['transmission'] })}
          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Automatic">Otomatik</option>
          <option value="Manual">Manuel</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Yakıt Türü *</label>
        <select
          required
          value={formData.fuelType}
          onChange={(e) => setFormData({ ...formData, fuelType: e.target.value as Car['fuelType'] })}
          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Petrol">Benzin</option>
          <option value="Diesel">Dizel</option>
          <option value="Electric">Elektrik</option>
          <option value="Hybrid">Hibrit</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Günlük Fiyat (₺) *</label>
        <input
          type="number"
          required
          min="0"
          value={formData.pricePerDay}
          onChange={(e) => setFormData({ ...formData, pricePerDay: parseInt(e.target.value) || 0 })} // parseInt sonrası NaN kontrolü
          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Motor Hacmi</label>
        <input
          type="text"
          value={formData.engineSize}
          onChange={(e) => setFormData({ ...formData, engineSize: e.target.value })}
          placeholder="2.0L"
          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Bagaj Kapasitesi</label>
        <input
          type="text"
          value={formData.trunkCapacity}
          onChange={(e) => setFormData({ ...formData, trunkCapacity: e.target.value })}
          placeholder="500L"
          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Günlük KM Limiti</label>
        <input
          type="number"
          min="0"
          value={formData.kmLimit}
          onChange={(e) => setFormData({ ...formData, kmLimit: parseInt(e.target.value) || 0 })} // parseInt sonrası NaN kontrolü
          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Yakıt Tüketimi (L/100km)</label>
        <input
          type="number"
          min="0"
          step="0.1"
          value={formData.mpg}
          onChange={(e) => setFormData({ ...formData, mpg: parseFloat(e.target.value) || 0 })} // parseFloat sonrası NaN kontrolü
          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Lokasyon *</label>
        <select
          required
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Girne">Girne</option>
          <option value="Lefkoşa">Lefkoşa</option>
          <option value="Gazimağusa">Gazimağusa</option>
          <option value="İskele">İskele</option>
        </select>
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Araç Resmi URL</label>
      <input
        type="url"
        value={formData.image}
        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        placeholder="https://example.com/car-image.jpg"
        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">Özellikler</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {availableFeatures.map((feature) => (
          <label key={feature} className="flex items-center">
            <input
              type="checkbox"
              checked={formData.features?.includes(feature) || false}
              onChange={() => handleFeatureToggle(feature)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
            />
            <span className="text-sm">{feature}</span>
          </label>
        ))}
      </div>
    </div>

    <div className="flex items-center space-x-4">
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={formData.isPopular || false}
          onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
        />
        <span className="text-sm font-medium">Popüler Araç</span>
      </label>
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={formData.available || false}
          onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
        />
        <span className="text-sm font-medium">Müsait</span>
      </label>
    </div>
  </div>
);


const CarManagement: React.FC<CarManagementProps> = ({ onCarDataChange }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [carToDelete, setCarToDelete] = useState<Car | null>(null);

  const [formData, setFormData] = useState<Partial<Car>>({
    name: '',
    model: '',
    year: new Date().getFullYear(),
    mileage: 0,
    category: 'Economy',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    pricePerDay: 0,
    image: '',
    images: [],
    mpg: 0,
    isPopular: false,
    features: [],
    brand: '',
    engineSize: '',
    trunkCapacity: '',
    kmLimit: 300,
    location: 'Girne',
    available: true
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await carService.getAllCars();
        setCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || car.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const resetForm = () => {
    setFormData({
      name: '',
      model: '',
      year: new Date().getFullYear(),
      mileage: 0,
      category: 'Economy',
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      pricePerDay: 0,
      image: '',
      images: [],
      mpg: 0,
      isPopular: false,
      features: [],
      brand: '',
      engineSize: '',
      trunkCapacity: '',
      kmLimit: 300,
      location: 'Girne',
      available: true
    });
  };

  const handleAddCar = () => {
    setShowAddModal(true);
    resetForm();
  };

  const handleEditCar = (car: Car) => {
    setSelectedCar(car);
    setFormData(car);
    setShowEditModal(true);
  };

  const handleDeleteCar = (car: Car) => {
    setCarToDelete(car);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (carToDelete) {
      try {
        await carService.deleteCar(carToDelete.id);
        const updatedCars = cars.filter(car => car.id !== carToDelete.id);
        setCars(updatedCars);
        onCarDataChange(updatedCars);
      } catch (error) {
        console.error('Error deleting car:', error);
      }
      setShowDeleteConfirm(false);
      setCarToDelete(null);
    }
  };

const handleSaveCar = async () => {
  // formData'yı kopyalayarak başlayın
  let dataToSave = { ...formData };

  // Eğer ana resim URL'si varsa ve images dizisi boşsa, ilk resmi images dizisine ekle
  if (dataToSave.image && (!dataToSave.images || dataToSave.images.length === 0)) {
    dataToSave.images = [dataToSave.image];
  } else if (dataToSave.image && dataToSave.images && !dataToSave.images.includes(dataToSave.image)) {
    // Eğer ana resim URL'si images dizisinde yoksa, ekle
    dataToSave.images = [dataToSave.image, ...dataToSave.images];
  }

  try {
    if (showAddModal) {
      const newCar = await carService.createCar(dataToSave as any);
      const updatedCars = [...cars, newCar];
      setCars(updatedCars);
      onCarDataChange(updatedCars);
      alert('Araç başarıyla eklendi!');
      setShowAddModal(false);
    } else if (showEditModal && selectedCar) {
      const updatedCar = await carService.updateCar(selectedCar.id, dataToSave as any);
      const updatedCars = cars.map(car => car.id === selectedCar.id ? updatedCar : car);
      setCars(updatedCars);
      onCarDataChange(updatedCars);
      alert('Araç başarıyla güncellendi!');
      setShowEditModal(false);
    }
  } catch (error) {
    console.error('Error saving car:', error);
    alert('Araç kaydedilirken bir hata oluştu: ' + (error as Error).message);
  }
  
  resetForm();
  setSelectedCar(null);
};
  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => {
      const features = prev.features || [];
      if (features.includes(feature)) {
        return { ...prev, features: features.filter((f) => f !== feature) };
      } else {
        return { ...prev, features: [...features, feature] };
      }
    });
  };

  const availableFeatures = React.useMemo(() => [
    'Klima', 'Bluetooth', 'GPS', 'Geri Görüş Kamerası', 'ABS', 'Airbag',
    'Deri Döşeme', 'Sunroof', 'Premium Ses Sistemi', 'Navigasyon',
    'Cruise Control', 'Otomatik Park', 'Spor Modu', '4WD', 'Hibrit Motor'
  ], []);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Araç Yönetimi</h2>
        <button
          onClick={handleAddCar}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors inline-flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Yeni Araç Ekle
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Araç adı veya marka ile ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
            >
              <option value="">Tüm Kategoriler</option>
              <option value="Economy">Ekonomik</option>
              <option value="SUV">SUV</option>
              <option value="Luxury">Lüks</option>
              <option value="Sports">Spor</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cars Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Araç
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fiyat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lokasyon
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCars.map((car) => (
                <tr key={car.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-12 h-8 object-cover rounded mr-4"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{car.name}</div>
                        <div className="text-sm text-gray-500">{car.brand} • {car.model}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      car.category === 'Economy' ? 'bg-blue-100 text-blue-800' :
                      car.category === 'SUV' ? 'bg-green-100 text-green-800' :
                      car.category === 'Luxury' ? 'bg-purple-100 text-purple-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {car.category === 'Economy' ? 'Ekonomik' :
                       car.category === 'SUV' ? 'SUV' :
                       car.category === 'Luxury' ? 'Lüks' : 'Spor'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₺{car.pricePerDay}/gün
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {car.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      car.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {car.available ? 'Müsait' : 'Dolu'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditCar(car)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Düzenle"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCar(car)}
                        className="text-red-600 hover:text-red-900"
                        title="Sil"
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
        {filteredCars.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Araç bulunamadı.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">
                    {showAddModal ? 'Yeni Araç Ekle' : 'Araç Düzenle'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                      resetForm();
                    }}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="bg-white px-6 py-6 max-h-[70vh] overflow-y-auto">
                {/* CarForm'u bu şekilde çağırın */}
                <CarForm
                  formData={formData}
                  setFormData={setFormData}
                  handleFeatureToggle={handleFeatureToggle}
                  availableFeatures={availableFeatures}
                />
              </div>
              <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium"
                >
                  İptal
                </button>
                <button
                  onClick={handleSaveCar}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {showAddModal ? 'Araç Ekle' : 'Değişiklikleri Kaydet'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && carToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-6 py-6">
                <div className="flex items-center mb-4">
                  <div className="bg-red-100 p-3 rounded-full mr-4">
                    <Trash2 className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Araç Sil</h3>
                    <p className="text-gray-600">Bu işlem geri alınamaz.</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6">
                  <strong>{carToDelete.name}</strong> aracını silmek istediğinizden emin misiniz?
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setCarToDelete(null);
                    }}
                    className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium"
                  >
                    İptal
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarManagement;