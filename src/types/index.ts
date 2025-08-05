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
  customer?: Customer | null;
  carId: string;
  carName: string;
  carPlate?: string;
  pickupDate: string;
  returnDate: string;
  pickupTime: string;
  returnTime: string;
  pickupLocation: string;
  returnLocation: string;
  status: 'Pending' | 'Active' | 'Completed' | 'Cancelled';
  totalAmount: number;
  extras?: Array<{ id: string; name: string; price: number; selected: boolean }>;
  insurance?: { id: string; name: string; price: number; coverage: string[] };
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
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationalId: string;
  driverLicenseNumber: string;
  driverLicenseExpiry: string;
  address: string;
  notes?: string;
  status: 'Active' | 'Inactive';
  registrationDate: string;
  numberOfBookings: number;
  lastBookingDate?: string;
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

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  workingHours: string;
  status: 'Active' | 'Inactive';
  email?: string;
  manager?: string;
  capacity?: number;
  createdAt: string;
  updatedAt: string;
}