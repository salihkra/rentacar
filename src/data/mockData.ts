import { Car, Booking, Customer, DashboardStats, Campaign, BookingExtra, InsurancePackage } from '../types';

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
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    phone: '+90 533 123 4567',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    totalRentals: 3,
    isRegistered: true,
    tcNo: '12345678901',
    address: 'Girne, KKTC'
  },
  {
    id: '2',
    name: 'Ayşe Demir',
    email: 'ayse@example.com',
    phone: '+90 533 234 5678',
    avatar: 'https://randomuser.me/api/portraits/women/43.jpg',
    totalRentals: 5,
    isRegistered: true,
    tcNo: '12345678902',
    address: 'Lefkoşa, KKTC'
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

export const locations = [
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