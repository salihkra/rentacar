import { Car, Booking, Customer, DashboardStats, Campaign, BookingExtra, InsurancePackage, User, Location } from '../types';

export const users: User[] = [
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@autorentpro.com',
    role: 'admin',
    avatar: 'https://randomuser.me/api/portraits/men/50.jpg',
    phone: '+90 533 888 1234'
  },
  {
    id: 'user-1',
    name: 'Mehmet Özkan',
    email: 'mehmet@example.com',
    role: 'user',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    phone: '+90 533 555 6789',
    tcNo: '12345678903',
    address: 'Girne, KKTC'
  }
];

export const campaigns: Campaign[] = [
  {
    id: '1',
    title: 'Yaz Kampanyası',
    description: '7 gün ve üzeri kiralamalarında %20 indirim',
    discount: 20,
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    validUntil: '2024-08-31',
    isActive: true
  },
  {
    id: '2',
    title: 'Hafta Sonu Fırsatı',
    description: 'Cumartesi-Pazar kiralamalarında %15 indirim',
    discount: 15,
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    validUntil: '2024-07-31',
    isActive: true
  }
];

export const bookingExtras: BookingExtra[] = [
  { id: '1', name: 'GPS Navigasyon', price: 15, selected: false },
  { id: '2', name: 'Çocuk Koltuğu', price: 25, selected: false },
  { id: '3', name: 'Ek Sürücü', price: 30, selected: false },
  { id: '4', name: 'Wifi Hotspot', price: 20, selected: false },
  { id: '5', name: 'Bebek Koltuğu', price: 20, selected: false }
];

export const insurancePackages: InsurancePackage[] = [
  {
    id: '1',
    name: 'Temel Sigorta',
    price: 0,
    coverage: ['Zorunlu Trafik Sigortası', 'Kasko (Muafiyet: 2000 TL)']
  },
  {
    id: '2',
    name: 'Kapsamlı Sigorta',
    price: 45,
    coverage: ['Zorunlu Trafik Sigortası', 'Tam Kasko', 'Cam Sigortası', 'Muafiyet İndirimi']
  },
  {
    id: '3',
    name: 'Premium Sigorta',
    price: 75,
    coverage: ['Zorunlu Trafik Sigortası', 'Tam Kasko', 'Cam Sigortası', 'Sıfır Muafiyet', 'Kişisel Eşya Sigortası']
  }
];

export const cars: Car[] = [
  {
    id: '1',
    name: 'Toyota Corolla',
    model: '2023 Model',
    year: 2023,
    mileage: 12000,
    category: 'Economy',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    pricePerDay: 180,
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    images: [
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    ],
    mpg: 42,
    isPopular: true,
    features: ['Klima', 'Bluetooth', 'Geri Görüş Kamerası', 'ABS', 'Airbag'],
    brand: 'Toyota',
    engineSize: '1.6L',
    trunkCapacity: '470L',
    kmLimit: 300,
    location: 'Girne',
    available: true
  },
  {
    id: '2',
    name: 'Ford Mustang',
    model: '2023 Model',
    year: 2023,
    mileage: 8500,
    category: 'Sports',
    seats: 4,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    pricePerDay: 350,
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    images: [
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    ],
    mpg: 22,
    features: ['Klima', 'Spor Modu', 'Premium Ses Sistemi', 'Deri Döşeme'],
    brand: 'Ford',
    engineSize: '5.0L V8',
    trunkCapacity: '380L',
    kmLimit: 250,
    location: 'Lefkoşa',
    available: true
  },
  {
    id: '3',
    name: 'Chevrolet Suburban',
    model: '2023 Model',
    year: 2023,
    mileage: 15000,
    category: 'SUV',
    seats: 8,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    pricePerDay: 280,
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    images: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    ],
    mpg: 18,
    features: ['Klima', '4WD', 'Üçüncü Sıra Koltuk', '7 Kişilik'],
    brand: 'Chevrolet',
    engineSize: '5.3L V8',
    trunkCapacity: '1130L',
    kmLimit: 400,
    location: 'Gazimağusa',
    available: true
  },
  {
    id: '4',
    name: 'BMW 3 Series',
    model: '2023 Model',
    year: 2023,
    mileage: 5000,
    category: 'Luxury',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    pricePerDay: 420,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    ],
    mpg: 35,
    features: ['Klima', 'Deri Döşeme', 'Sunroof', 'Premium Ses Sistemi', 'Navigasyon'],
    brand: 'BMW',
    engineSize: '2.0L Turbo',
    trunkCapacity: '480L',
    kmLimit: 350,
    location: 'İskele',
    available: true
  },
  {
    id: '5',
    name: 'Volkswagen Golf',
    model: '2023 Model',
    year: 2023,
    mileage: 18000,
    category: 'Economy',
    seats: 5,
    transmission: 'Manual',
    fuelType: 'Petrol',
    pricePerDay: 160,
    image: 'https://images.unsplash.com/photo-1606016159991-8b5d5c6e0b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    images: [
      'https://images.unsplash.com/photo-1606016159991-8b5d5c6e0b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    ],
    mpg: 38,
    features: ['Klima', 'Bluetooth', 'USB Bağlantısı', 'ABS'],
    brand: 'Volkswagen',
    engineSize: '1.4L TSI',
    trunkCapacity: '380L',
    kmLimit: 300,
    location: 'Girne',
    available: true
  },
  {
    id: '6',
    name: 'Mercedes C-Class',
    model: '2023 Model',
    year: 2023,
    mileage: 7500,
    category: 'Luxury',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    pricePerDay: 450,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    ],
    mpg: 40,
    isPopular: true,
    features: ['Klima', 'Deri Döşeme', 'Navigasyon', 'Sunroof', 'Premium Ses', 'Otomatik Park'],
    brand: 'Mercedes',
    engineSize: '2.0L Turbo',
    trunkCapacity: '455L',
    kmLimit: 350,
    location: 'Lefkoşa',
    available: true
  },
  {
    id: '7',
    name: 'Audi Q5',
    model: '2023 Model',
    year: 2023,
    mileage: 12500,
    category: 'SUV',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    pricePerDay: 380,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    ],
    mpg: 28,
    features: ['Klima', 'Quattro 4WD', 'Deri Döşeme', 'Navigasyon', 'Geri Görüş Kamerası'],
    brand: 'Audi',
    engineSize: '2.0L TFSI',
    trunkCapacity: '550L',
    kmLimit: 350,
    location: 'Gazimağusa',
    available: true
  },
  {
    id: '8',
    name: 'Renault Clio',
    model: '2023 Model',
    year: 2023,
    mileage: 22000,
    category: 'Economy',
    seats: 5,
    transmission: 'Manual',
    fuelType: 'Petrol',
    pricePerDay: 140,
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    images: [
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    ],
    mpg: 45,
    features: ['Klima', 'Bluetooth', 'USB Bağlantısı'],
    brand: 'Renault',
    engineSize: '1.0L TCe',
    trunkCapacity: '300L',
    kmLimit: 250,
    location: 'İskele',
    available: true
  },
  {
    id: '9',
    name: 'Ford Focus',
    model: '2023 Model',
    year: 2023,
    mileage: 16000,
    category: 'Economy',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    pricePerDay: 170,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    images: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    ],
    mpg: 40,
    features: ['Klima', 'Bluetooth', 'Geri Görüş Kamerası', 'Cruise Control'],
    brand: 'Ford',
    engineSize: '1.5L EcoBoost',
    trunkCapacity: '375L',
    kmLimit: 300,
    location: 'Girne',
    available: true
  },
  {
    id: '10',
    name: 'BMW X3',
    model: '2023 Model',
    year: 2023,
    mileage: 9000,
    category: 'SUV',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    pricePerDay: 400,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    ],
    mpg: 32,
    isPopular: true,
    features: ['Klima', 'xDrive 4WD', 'Deri Döşeme', 'Panoramik Sunroof', 'Harman Kardon Ses'],
    brand: 'BMW',
    engineSize: '2.0L TwinPower',
    trunkCapacity: '550L',
    kmLimit: 400,
    location: 'Lefkoşa',
    available: true
  },
  {
    id: '11',
    name: 'Toyota Camry',
    model: '2023 Model',
    year: 2023,
    mileage: 11000,
    category: 'Luxury',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    pricePerDay: 320,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    ],
    mpg: 52,
    features: ['Klima', 'Hibrit Motor', 'Deri Döşeme', 'Navigasyon', 'Wireless Charging'],
    brand: 'Toyota',
    engineSize: '2.5L Hybrid',
    trunkCapacity: '428L',
    kmLimit: 350,
    location: 'Gazimağusa',
    available: true
  },
  {
    id: '12',
    name: 'Chevrolet Camaro',
    model: '2023 Model',
    year: 2023,
    mileage: 6500,
    category: 'Sports',
    seats: 4,
    transmission: 'Manual',
    fuelType: 'Petrol',
    pricePerDay: 380,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    ],
    mpg: 20,
    features: ['Klima', 'Spor Modu', 'Brembo Frenler', 'Performance Exhaust', 'Recaro Koltuklar'],
    brand: 'Chevrolet',
    engineSize: '6.2L V8',
    trunkCapacity: '270L',
    kmLimit: 250,
    location: 'İskele',
    available: true
  },
  {
    id: '13',
    name: 'Mercedes GLE',
    model: '2023 Model',
    year: 2023,
    mileage: 8000,
    category: 'SUV',
    seats: 7,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    pricePerDay: 480,
    image: 'https://images.unsplash.com/photo-1606016159991-8b5d5c6e0b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    images: [
      'https://images.unsplash.com/photo-1606016159991-8b5d5c6e0b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    ],
    mpg: 30,
    features: ['Klima', '4MATIC 4WD', 'Üçüncü Sıra', 'Burmester Ses', 'Massage Koltuklar', 'Air Suspension'],
    brand: 'Mercedes',
    engineSize: '3.0L V6 Turbo',
    trunkCapacity: '630L',
    kmLimit: 400,
    location: 'Girne',
    available: true
  },
  {
    id: '14',
    name: 'Audi A4',
    model: '2023 Model',
    year: 2023,
    mileage: 13500,
    category: 'Luxury',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    pricePerDay: 360,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    ],
    mpg: 35,
    features: ['Klima', 'Quattro 4WD', 'Virtual Cockpit', 'Bang & Olufsen Ses', 'Matrix LED'],
    brand: 'Audi',
    engineSize: '2.0L TFSI',
    trunkCapacity: '460L',
    kmLimit: 350,
    location: 'Lefkoşa',
    available: true
  },
  {
    id: '15',
    name: 'Volkswagen Passat',
    model: '2023 Model',
    year: 2023,
    mileage: 19000,
    category: 'Economy',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    pricePerDay: 200,
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    images: [
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    ],
    mpg: 45,
    features: ['Klima', 'Navigasyon', 'Adaptive Cruise Control', 'Lane Assist'],
    brand: 'Volkswagen',
    engineSize: '2.0L TDI',
    trunkCapacity: '586L',
    kmLimit: 350,
    location: 'Gazimağusa',
    available: true
  },
  {
    id: '16',
    name: 'Ford Explorer',
    model: '2023 Model',
    year: 2023,
    mileage: 14000,
    category: 'SUV',
    seats: 7,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    pricePerDay: 320,
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    images: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    ],
    mpg: 24,
    features: ['Klima', 'AWD', 'Üçüncü Sıra Koltuk', 'SYNC 4A', 'Co-Pilot360'],
    brand: 'Ford',
    engineSize: '2.3L EcoBoost',
    trunkCapacity: '510L',
    kmLimit: 400,
    location: 'İskele',
    available: true
  },
  {
    id: '17',
    name: 'Renault Megane',
    model: '2023 Model',
    year: 2023,
    mileage: 17500,
    category: 'Economy',
    seats: 5,
    transmission: 'Manual',
    fuelType: 'Petrol',
    pricePerDay: 155,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    images: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    ],
    mpg: 42,
    features: ['Klima', 'Bluetooth', 'Touchscreen', 'Cruise Control'],
    brand: 'Renault',
    engineSize: '1.3L TCe',
    trunkCapacity: '434L',
    kmLimit: 300,
    location: 'Girne',
    available: true
  },
  {
    id: '18',
    name: 'BMW 5 Series',
    model: '2023 Model',
    year: 2023,
    mileage: 6000,
    category: 'Luxury',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    pricePerDay: 520,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    ],
    mpg: 48,
    isPopular: true,
    features: ['Klima', 'Hibrit Motor', 'Gesture Control', 'Harman Kardon', 'Comfort Access', 'Head-Up Display'],
    brand: 'BMW',
    engineSize: '2.0L Hybrid',
    trunkCapacity: '530L',
    kmLimit: 400,
    location: 'Lefkoşa',
    available: true
  },
  {
    id: '19',
    name: 'Chevrolet Tahoe',
    model: '2023 Model',
    year: 2023,
    mileage: 10500,
    category: 'SUV',
    seats: 8,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    pricePerDay: 350,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    ],
    mpg: 16,
    features: ['Klima', '4WD', 'Üçüncü Sıra', 'Bose Ses Sistemi', 'Wireless Charging', 'Tow Package'],
    brand: 'Chevrolet',
    engineSize: '5.3L V8',
    trunkCapacity: '722L',
    kmLimit: 450,
    location: 'Gazimağusa',
    available: true
  },
  {
    id: '20',
    name: 'Audi RS6',
    model: '2023 Model',
    year: 2023,
    mileage: 4500,
    category: 'Sports',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    pricePerDay: 650,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    ],
    mpg: 22,
    features: ['Klima', 'Quattro Sport', 'Carbon Fiber', 'Sport Exhaust', 'RS Sport Suspension', 'Bang & Olufsen'],
    brand: 'Audi',
    engineSize: '4.0L V8 Twin-Turbo',
    trunkCapacity: '565L',
    kmLimit: 300,
    location: 'İskele',
    available: true
  }
];

export const bookings: Booking[] = [
  {
    id: 'AR-1001',
    customerId: '1',
    customerName: 'Ahmet Yılmaz',
    carId: '1',
    carName: 'Toyota Corolla',
    pickupDate: '2024-07-12',
    returnDate: '2024-07-15',
    pickupTime: '10:00',
    returnTime: '10:00',
    pickupLocation: 'Girne',
    returnLocation: 'Girne',
    status: 'Active',
    totalAmount: 540,
    extras: [
      { id: '1', name: 'GPS Navigasyon', price: 15, selected: true }
    ],
    insurance: insurancePackages[1]
  },
  {
    id: 'AR-1000',
    customerId: '2',
    customerName: 'Ayşe Demir',
    carId: '2',
    carName: 'Ford Mustang',
    pickupDate: '2024-07-10',
    returnDate: '2024-07-12',
    pickupTime: '14:00',
    returnTime: '14:00',
    pickupLocation: 'Lefkoşa',
    returnLocation: 'Lefkoşa',
    status: 'Completed',
    totalAmount: 700,
    extras: [],
    insurance: insurancePackages[0]
  }
];

export const customers: Customer[] = [
  {
    id: '1',
    fullName: 'Ahmet Yılmaz',
    email: 'ahmet.yilmaz@email.com',
    phone: '+90 532 123 4567',
    dateOfBirth: '1985-03-15',
    nationalId: '12345678901',
    driverLicenseNumber: 'A123456789',
    driverLicenseExpiry: '2025-12-31',
    address: 'Atatürk Caddesi No: 45, Girne, KKTC',
    notes: 'Preferred luxury vehicles',
    status: 'Active',
    registrationDate: '2023-01-15',
    numberOfBookings: 8,
    lastBookingDate: '2024-07-20'
  },
  {
    id: '2',
    fullName: 'Fatma Demir',
    email: 'fatma.demir@email.com',
    phone: '+90 533 987 6543',
    dateOfBirth: '1990-07-22',
    nationalId: '98765432109',
    driverLicenseNumber: 'B987654321',
    driverLicenseExpiry: '2026-06-15',
    address: 'Cumhuriyet Meydanı No: 12, Lefkoşa, KKTC',
    notes: 'Frequent business traveler',
    status: 'Active',
    registrationDate: '2023-03-10',
    numberOfBookings: 12,
    lastBookingDate: '2024-08-01'
  },
  {
    id: '3',
    fullName: 'Mehmet Kaya',
    email: 'mehmet.kaya@email.com',
    phone: '+90 534 555 1234',
    dateOfBirth: '1988-11-08',
    nationalId: '55566677788',
    driverLicenseNumber: 'C555666777',
    driverLicenseExpiry: '2024-09-30',
    address: 'Sahil Caddesi No: 78, Gazimağusa, KKTC',
    notes: 'Prefers automatic transmission',
    status: 'Active',
    registrationDate: '2023-05-20',
    numberOfBookings: 5,
    lastBookingDate: '2024-06-15'
  },
  {
    id: '4',
    fullName: 'Ayşe Özkan',
    email: 'ayse.ozkan@email.com',
    phone: '+90 535 777 8888',
    dateOfBirth: '1992-04-12',
    nationalId: '11122233344',
    driverLicenseNumber: 'D111222333',
    driverLicenseExpiry: '2025-03-20',
    address: 'Ana Caddesi No: 23, İskele, KKTC',
    notes: 'Student discount eligible',
    status: 'Inactive',
    registrationDate: '2023-02-28',
    numberOfBookings: 3,
    lastBookingDate: '2024-01-10'
  },
  {
    id: '5',
    fullName: 'Ali Çelik',
    email: 'ali.celik@email.com',
    phone: '+90 536 999 0000',
    dateOfBirth: '1983-09-25',
    nationalId: '99988877766',
    driverLicenseNumber: 'E999888777',
    driverLicenseExpiry: '2026-01-15',
    address: 'Üniversite Kampüsü, Güzelyurt, KKTC',
    notes: 'VIP customer, premium service',
    status: 'Active',
    registrationDate: '2023-04-05',
    numberOfBookings: 15,
    lastBookingDate: '2024-08-05'
  },
  {
    id: '6',
    fullName: 'Zeynep Arslan',
    email: 'zeynep.arslan@email.com',
    phone: '+90 537 444 5555',
    dateOfBirth: '1995-12-03',
    nationalId: '44455566677',
    driverLicenseNumber: 'F444555666',
    driverLicenseExpiry: '2024-11-30',
    address: 'Deniz Caddesi No: 67, Girne, KKTC',
    notes: 'New driver, requires assistance',
    status: 'Active',
    registrationDate: '2024-01-10',
    numberOfBookings: 2,
    lastBookingDate: '2024-07-25'
  }
];

export const dashboardStats: DashboardStats = {
  totalBookings: 142,
  revenue: 45280,
  newCustomers: 28,
  availableCars: 18,
  bookingsTrend: 12.5,
  revenueTrend: 8.3,
  customersTrend: -2.1
};

export const locationNames = [
  'Girne',
  'Lefkoşa',
  'Gazimağusa',
  'İskele',
  'Güzelyurt'
];

export const brands = [
  'Toyota',
  'Ford',
  'Chevrolet',
  'BMW',
  'Mercedes',
  'Audi',
  'Volkswagen',
  'Renault'
];

export const faqData = [
  {
    question: 'Araç kiralama için hangi belgeler gerekli?',
    answer: 'Geçerli ehliyet, kimlik belgesi ve kredi kartı gereklidir. Yabancı ülke vatandaşları için pasaport ve uluslararası ehliyet gerekebilir.'
  },
  {
    question: 'Yaş sınırı var mı?',
    answer: 'Minimum 21 yaş ve en az 1 yıl ehliyet sahibi olma şartı vardır. 25 yaş altı sürücüler için ek ücret uygulanabilir.'
  },
  {
    question: 'İptal politikası nasıl?',
    answer: 'Rezervasyon tarihinden 24 saat öncesine kadar ücretsiz iptal edilebilir. Daha sonraki iptallerde günlük ücretin %50\'si tahsil edilir.'
  },
  {
    question: 'Yakıt politikası nedir?',
    answer: 'Araçlar full yakıt ile teslim edilir ve full yakıt ile iade edilmelidir. Eksik yakıt için ek ücret tahsil edilir.'
  },
  {
    question: 'Hasar durumunda ne yapmalıyım?',
    answer: 'Derhal firmamızı arayın ve kaza tutanağı düzenleyin. Sigorta kapsamındaki hasarlar için muafiyet tutarı uygulanır.'
  }
];

export const locations: Location[] = [
  {
    id: '1',
    name: 'Girne Merkez Şube',
    address: 'Atatürk Caddesi No: 45, Girne',
    city: 'Girne',
    phone: '+90 392 815 1234',
    workingHours: '08:00 - 20:00',
    status: 'Active',
    email: 'girne@autorentpro.com',
    manager: 'Ahmet Yılmaz',
    capacity: 25,
    createdAt: '2024-01-15',
    updatedAt: '2024-07-01'
  },
  {
    id: '2',
    name: 'Lefkoşa Havalimanı',
    address: 'Ercan Havalimanı Terminal Binası, Lefkoşa',
    city: 'Lefkoşa',
    phone: '+90 392 600 5678',
    workingHours: '06:00 - 23:00',
    status: 'Active',
    email: 'airport@autorentpro.com',
    manager: 'Fatma Demir',
    capacity: 40,
    createdAt: '2024-02-10',
    updatedAt: '2024-06-15'
  },
  {
    id: '3',
    name: 'Gazimağusa Sahil',
    address: 'Sahil Caddesi No: 78, Gazimağusa',
    city: 'Gazimağusa',
    phone: '+90 392 366 9012',
    workingHours: '09:00 - 19:00',
    status: 'Active',
    email: 'magusa@autorentpro.com',
    manager: 'Mehmet Özkan',
    capacity: 20,
    createdAt: '2024-03-05',
    updatedAt: '2024-07-10'
  },
  {
    id: '4',
    name: 'İskele Şube',
    address: 'Ana Caddesi No: 23, İskele',
    city: 'İskele',
    phone: '+90 392 371 3456',
    workingHours: '08:30 - 18:30',
    status: 'Inactive',
    email: 'iskele@autorentpro.com',
    manager: 'Ayşe Kaya',
    capacity: 15,
    createdAt: '2024-04-12',
    updatedAt: '2024-06-20'
  },
  {
    id: '5',
    name: 'Güzelyurt Merkez',
    address: 'Cumhuriyet Meydanı No: 12, Güzelyurt',
    city: 'Güzelyurt',
    phone: '+90 392 714 7890',
    workingHours: '08:00 - 19:00',
    status: 'Active',
    email: 'guzelyurt@autorentpro.com',
    manager: 'Hasan Yıldız',
    capacity: 18,
    createdAt: '2024-05-20',
    updatedAt: '2024-07-05'
  },
  {
    id: '6',
    name: 'Girne Üniversitesi',
    address: 'Üniversite Kampüsü, Girne',
    city: 'Girne',
    phone: '+90 392 650 2345',
    workingHours: '07:00 - 22:00',
    status: 'Active',
    email: 'university@autorentpro.com',
    manager: 'Zeynep Arslan',
    capacity: 30,
    createdAt: '2024-06-01',
    updatedAt: '2024-07-12'
  }
];