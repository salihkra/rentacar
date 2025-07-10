export interface Car {
  id: string;
  name: string;
  model: string;
  year: number;
  mileage: number;
  category: 'Economy' | 'Sports' | 'SUV' | 'Luxury';
  seats: number;
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  pricePerDay: number;
  image: string;
  images: string[];
  mpg: number;
  isPopular?: boolean;
  features: string[];
  brand: string;
  engineSize: string;
  trunkCapacity: string;
  kmLimit: number;
  location: string;
  available: boolean;
}

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  carId: string;
  carName: string;
  pickupDate: string;
  returnDate: string;
  pickupTime: string;
  returnTime: string;
  pickupLocation: string;
  returnLocation: string;
  status: 'Active' | 'Completed' | 'Cancelled' | 'Pending';
  totalAmount: number;
  extras: BookingExtra[];
  insurance: InsurancePackage;
}

export interface BookingExtra {
  id: string;
  name: string;
  price: number;
  selected: boolean;
}

export interface InsurancePackage {
  id: string;
  name: string;
  price: number;
  coverage: string[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  totalRentals: number;
  isRegistered: boolean;
  tcNo?: string;
  address?: string;
}

export interface DashboardStats {
  totalBookings: number;
  revenue: number;
  newCustomers: number;
  availableCars: number;
  bookingsTrend: number;
  revenueTrend: number;
  customersTrend: number;
}

export interface SearchFilters {
  pickupDate: string;
  returnDate: string;
  pickupTime: string;
  returnTime: string;
  pickupLocation: string;
  returnLocation: string;
  brand?: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
  transmission?: string;
  fuelType?: string;
  category?: string;
  kmLimit?: number;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  discount: number;
  image: string;
  validUntil: string;
  isActive: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
  phone?: string;
  tcNo?: string;
  address?: string;
}