import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import SearchForm from './components/SearchForm';
import Fleet from './components/Fleet';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import CRMDashboard from './components/dashboard/CRMDashboard';
import LoginModal from './components/LoginModal';
import CarDetailModal from './components/CarDetailModal';
import ReservationModal from './components/ReservationModal';
import UserPanel from './components/UserPanel';
import Footer from './components/Footer';
import { Car, BookingExtra, InsurancePackage, SearchFilters, User } from './types';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [filters, setFilters] = useState<SearchFilters | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [isSearching, setIsSearching] = useState(false);
  const [showCRM, setShowCRM] = useState(false);
  const [showUserPanel, setShowUserPanel] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showCarDetail, setShowCarDetail] = useState(false);
  const [showReservation, setShowReservation] = useState(false);
  const [reservationData, setReservationData] = useState<{
    car: Car | null;
    extras: BookingExtra[];
    insurance: InsurancePackage;
    totalDays: number;
  } | null>(null);

  const handleDashboardClick = () => {
    if (currentUser?.role === 'admin') {
      setShowCRM(true);
      setShowUserPanel(false);
      setActiveTab('');
    }
  };

  const handleUserPanelClick = () => {
    if (currentUser?.role === 'user') {
      setShowUserPanel(true);
      setShowCRM(false);
      setActiveTab('');
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setShowCRM(false);
    setShowUserPanel(false);
    if (tab === 'home') {
      setIsSearching(false);
      setFilters(null);
    }
  };

  const handleCarSelect = (car: Car) => {
    setSelectedCar(car);
    setShowCarDetail(true);
  };

  const handleReservation = (carId: string, extras: BookingExtra[], insurance: InsurancePackage, totalDays: number) => {
    const car = selectedCar;
    if (car) {
      setReservationData({ car, extras, insurance, totalDays });
      setShowCarDetail(false);
      setShowReservation(true);
    }
  };

  const handleReservationConfirm = (bookingData: any) => {
    console.log('Rezervasyon onaylandı:', bookingData);
    setShowReservation(false);
    setReservationData(null);
    // Burada rezervasyon verilerini backend'e gönderebilirsiniz
    alert('Rezervasyonunuz başarıyla oluşturuldu!');
  };

  const handleSearch = (searchFilters: SearchFilters) => {
    setFilters(searchFilters);
    setIsSearching(true);
  };

  const handleLocationSelect = (location: string) => {
    setFilters({
      pickupLocation: location,
      returnLocation: '',
      pickupDate: '',
      returnDate: '',
      pickupTime: '10:00',
      returnTime: '10:00',
    });
    setIsSearching(true);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowCRM(false);
    setShowUserPanel(false);
    setActiveTab('home');
  };

  const renderMainContent = () => {
    if (showCRM && currentUser?.role === 'admin') {
      return <CRMDashboard />;
    }
    
    if (showUserPanel && currentUser?.role === 'user') {
      return <UserPanel currentUser={currentUser} />;
    }

    if (isSearching) {
      return (
        <main>
          <div className="pt-16">
            <SearchForm onSearch={handleSearch} />
            <Fleet onCarSelect={handleCarSelect} filters={filters} showAll={true} />
          </div>
        </main>
      );
    }

    return (
      <main>
        <Hero onRentNow={() => setIsSearching(true)} onLocationSelect={handleLocationSelect} />
        <SearchForm onSearch={handleSearch} />
        <Fleet onCarSelect={handleCarSelect} filters={filters} showAll={false} />
        <WhyChooseUs />
        <Testimonials />
      </main>
    );
  };

  useEffect(() => {
    if (isSearching) {
      window.scrollTo(0, 0);
    }
  }, [isSearching]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onLoginClick={() => setShowLoginModal(true)}
        onDashboardClick={handleDashboardClick}
        onUserPanelClick={handleUserPanelClick}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      
      {renderMainContent()}
      
      {!showCRM && !showUserPanel && <Footer />}
      
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
      
      <CarDetailModal
        car={selectedCar}
        isOpen={showCarDetail}
        onClose={() => setShowCarDetail(false)}
        onReserve={handleReservation}
      />
      
      {reservationData && (
        <ReservationModal
          isOpen={showReservation}
          onClose={() => setShowReservation(false)}
          car={reservationData.car}
          extras={reservationData.extras}
          insurance={reservationData.insurance}
          totalDays={reservationData.totalDays}
          onConfirm={handleReservationConfirm}
        />
      )}
    </div>
  );
}

export default App;