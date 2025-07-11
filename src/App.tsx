import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import SearchForm from './components/SearchForm';
import CarCard from './components/CarCard';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import ContactSupport from './components/ContactSupport';
import Footer from './components/Footer';
import CarDetailModal from './components/CarDetailModal';
import ReservationModal from './components/ReservationModal';
import LoginModal from './components/LoginModal';
import UserPanel from './components/UserPanel';
import CRMDashboard from './components/dashboard/CRMDashboard';
import { cars } from './data/mockData';
import { Car, SearchFilters, BookingExtra, InsurancePackage, User } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showCarDetail, setShowCarDetail] = useState(false);
  const [showReservation, setShowReservation] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showUserPanel, setShowUserPanel] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [reservationData, setReservationData] = useState<{
    extras: BookingExtra[];
    insurance: InsurancePackage;
    totalDays: number;
  } | null>(null);

  const handleSearch = (filters: SearchFilters) => {
    let filtered = cars;

    if (filters.pickupLocation) {
      filtered = filtered.filter(car => car.location === filters.pickupLocation);
    }

    if (filters.category) {
      filtered = filtered.filter(car => car.category === filters.category);
    }

    if (filters.transmission) {
      filtered = filtered.filter(car => car.transmission === filters.transmission);
    }

    if (filters.fuelType) {
      filtered = filtered.filter(car => car.fuelType === filters.fuelType);
    }

    if (filters.minPrice) {
      filtered = filtered.filter(car => car.pricePerDay >= filters.minPrice!);
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(car => car.pricePerDay <= filters.maxPrice!);
    }

    setFilteredCars(filtered);
    
    // Scroll to fleet section
    const fleetSection = document.getElementById('fleet');
    if (fleetSection) {
      fleetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCarBook = (carId: string) => {
    const car = cars.find(c => c.id === carId);
    if (car) {
      setSelectedCar(car);
      setShowCarDetail(true);
    }
  };

  const handleReserve = (carId: string, extras: BookingExtra[], insurance: InsurancePackage, totalDays: number) => {
    const car = cars.find(c => c.id === carId);
    if (car) {
      setSelectedCar(car);
      setReservationData({ extras, insurance, totalDays });
      setShowCarDetail(false);
      setShowReservation(true);
    }
  };

  const handleReservationConfirm = (bookingData: any) => {
    console.log('Booking confirmed:', bookingData);
    alert('Rezervasyonunuz başarıyla oluşturuldu! Rezervasyon numaranız: AR-' + Date.now());
    setShowReservation(false);
    setSelectedCar(null);
    setReservationData(null);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowUserPanel(false);
    setShowDashboard(false);
    setActiveTab('home');
  };

  const handleRentNow = () => {
    const fleetSection = document.getElementById('fleet');
    if (fleetSection) {
      fleetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLocationSelect = (location: string) => {
    handleSearch({ 
      pickupLocation: location,
      returnLocation: location,
      pickupDate: '',
      returnDate: '',
      pickupTime: '10:00',
      returnTime: '10:00'
    });
  };

  const handleDashboardClick = () => {
    setShowDashboard(true);
    setShowUserPanel(false);
    setActiveTab('dashboard');
  };

  const handleUserPanelClick = () => {
    setShowUserPanel(true);
    setShowDashboard(false);
    setActiveTab('user-panel');
  };

  // Show dashboard if admin user clicked dashboard
  if (showDashboard && currentUser?.role === 'admin') {
    return <CRMDashboard />;
  }

  // Show user panel if user clicked user panel
  if (showUserPanel && currentUser?.role === 'user') {
    return <UserPanel currentUser={currentUser} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLoginClick={() => setShowLogin(true)}
        onDashboardClick={handleDashboardClick}
        onUserPanelClick={handleUserPanelClick}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      
      <Hero onRentNow={handleRentNow} onLocationSelect={handleLocationSelect} />
      <SearchForm onSearch={handleSearch} />
      
      {/* Fleet Section */}
      <section id="fleet" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold mb-2 inline-block">OUR FLEET</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Perfect Car</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From economy cars to luxury vehicles, we have the perfect car for every occasion and budget.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} onBook={handleCarBook} />
            ))}
          </div>
          
          {filteredCars.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No cars found matching your criteria.</p>
              <button 
                onClick={() => setFilteredCars(cars)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
              >
                Show All Cars
              </button>
            </div>
          )}
        </div>
      </section>

      <WhyChooseUs />
      <Testimonials />
      
      <section id="contact">
        <ContactSupport />
      </section>
      
      <Footer />

      {/* Modals */}
      <CarDetailModal
        car={selectedCar}
        isOpen={showCarDetail}
        onClose={() => {
          setShowCarDetail(false);
          setSelectedCar(null);
        }}
        onReserve={handleReserve}
      />

      <ReservationModal
        isOpen={showReservation}
        onClose={() => {
          setShowReservation(false);
          setSelectedCar(null);
          setReservationData(null);
        }}
        car={selectedCar}
        extras={reservationData?.extras || []}
        insurance={reservationData?.insurance || { id: '1', name: 'Temel Sigorta', price: 0, coverage: [] }}
        totalDays={reservationData?.totalDays || 1}
        onConfirm={handleReservationConfirm}
      />

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default App;