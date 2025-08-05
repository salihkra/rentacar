    -- Create locations table
    CREATE TABLE IF NOT EXISTS locations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    working_hours VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
    email VARCHAR(255),
    manager VARCHAR(255),
    capacity INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Create index for better performance
    CREATE INDEX IF NOT EXISTS idx_locations_city ON locations(city);
    CREATE INDEX IF NOT EXISTS idx_locations_status ON locations(status);
    CREATE INDEX IF NOT EXISTS idx_locations_created_at ON locations(created_at);

    -- Insert sample data
    INSERT INTO locations (name, address, city, phone, working_hours, status, email, manager, capacity) VALUES
    ('Girne Merkez Şube', 'Atatürk Caddesi No: 45, Girne', 'Girne', '+90 392 815 1234', '08:00 - 20:00', 'Active', 'girne@autorentpro.com', 'Ahmet Yılmaz', 25),
    ('Lefkoşa Havalimanı', 'Ercan Havalimanı Terminal Binası, Lefkoşa', 'Lefkoşa', '+90 392 600 5678', '06:00 - 23:00', 'Active', 'airport@autorentpro.com', 'Fatma Demir', 40),
    ('Gazimağusa Sahil', 'Sahil Caddesi No: 78, Gazimağusa', 'Gazimağusa', '+90 392 366 9012', '09:00 - 19:00', 'Active', 'magusa@autorentpro.com', 'Mehmet Özkan', 20),
    ('İskele Şube', 'Ana Caddesi No: 23, İskele', 'İskele', '+90 392 371 3456', '08:30 - 18:30', 'Inactive', 'iskele@autorentpro.com', 'Ayşe Kaya', 15),
    ('Güzelyurt Merkez', 'Cumhuriyet Meydanı No: 12, Güzelyurt', 'Güzelyurt', '+90 392 714 7890', '08:00 - 19:00', 'Active', 'guzelyurt@autorentpro.com', 'Hasan Yıldız', 18),
    ('Girne Üniversitesi', 'Üniversite Kampüsü, Girne', 'Girne', '+90 392 650 2345', '07:00 - 22:00', 'Active', 'university@autorentpro.com', 'Zeynep Arslan', 30)
    ON CONFLICT (id) DO NOTHING;

    -- Create function to automatically update updated_at timestamp
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
    END;
    $$ language 'plpgsql';

    -- Drop existing trigger if it exists, then create new one
    DROP TRIGGER IF EXISTS update_locations_updated_at ON locations;
    CREATE TRIGGER update_locations_updated_at 
        BEFORE UPDATE ON locations 
        FOR EACH ROW 
        EXECUTE FUNCTION update_updated_at_column();

    -- Drop existing cars table if it exists (to ensure correct structure)
    DROP TABLE IF EXISTS cars CASCADE;

    -- Create cars table
    CREATE TABLE cars (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    year INTEGER NOT NULL,
    mileage INTEGER NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('Economy', 'Sports', 'SUV', 'Luxury')),
    seats INTEGER NOT NULL,
    transmission VARCHAR(50) NOT NULL CHECK (transmission IN ('Automatic', 'Manual')),
    fuel_type VARCHAR(50) NOT NULL CHECK (fuel_type IN ('Petrol', 'Diesel', 'Electric', 'Hybrid')),
    price_per_day DECIMAL(10,2) NOT NULL,
    image TEXT,
    images JSONB,
    mpg INTEGER,
    is_popular BOOLEAN DEFAULT false,
    features JSONB,
    brand VARCHAR(255) NOT NULL,
    engine_size VARCHAR(50),
    trunk_capacity VARCHAR(50),
    km_limit INTEGER DEFAULT 300,
    location VARCHAR(255) NOT NULL,
    available BOOLEAN DEFAULT true,
    plate_number VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Create indexes for cars table
    CREATE INDEX idx_cars_category ON cars(category);
    CREATE INDEX idx_cars_brand ON cars(brand);
    CREATE INDEX idx_cars_location ON cars(location);
    CREATE INDEX idx_cars_available ON cars(available);
    CREATE INDEX idx_cars_created_at ON cars(created_at);

    -- Insert sample car data (let PostgreSQL generate UUIDs automatically)
    INSERT INTO cars (name, model, year, mileage, category, seats, transmission, fuel_type, price_per_day, image, images, mpg, is_popular, features, brand, engine_size, trunk_capacity, km_limit, location, available, plate_number) VALUES
    ('Toyota Corolla', '2023 Model', 2023, 12000, 'Economy', 5, 'Automatic', 'Petrol', 180.00, 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', '["https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80", "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80", "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"]', 42, true, '["Klima", "Bluetooth", "Geri Görüş Kamerası", "ABS", "Airbag"]', 'Toyota', '1.6L', '470L', 300, 'Girne', true, 'KK 1234'),
    ('Ford Mustang', '2023 Model', 2023, 8500, 'Sports', 4, 'Automatic', 'Petrol', 350.00, 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', '["https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80", "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"]', 22, false, '["Klima", "Spor Modu", "Premium Ses Sistemi", "Deri Döşeme"]', 'Ford', '5.0L V8', '380L', 250, 'Lefkoşa', true, 'KK 5678'),
    ('Chevrolet Suburban', '2023 Model', 2023, 15000, 'SUV', 8, 'Automatic', 'Petrol', 280.00, 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', '["https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"]', 18, false, '["Klima", "4WD", "Üçüncü Sıra Koltuk", "7 Kişilik"]', 'Chevrolet', '5.3L V8', '1130L', 400, 'Gazimağusa', true, 'KK 9012'),
    ('BMW 3 Series', '2023 Model', 2023, 5000, 'Luxury', 5, 'Automatic', 'Petrol', 450.00, 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', '["https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"]', 35, true, '["Klima", "Premium Ses Sistemi", "Deri Döşeme", "Sürüş Asistanları"]', 'BMW', '2.0L Turbo', '480L', 350, 'Girne', true, 'KK 3456'),
    ('Honda Civic', '2023 Model', 2023, 8000, 'Economy', 5, 'Manual', 'Petrol', 160.00, 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', '["https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"]', 38, false, '["Klima", "Bluetooth", "ABS", "Airbag"]', 'Honda', '1.5L', '420L', 300, 'Güzelyurt', true, 'KK 7890'),
    ('Mercedes C-Class', '2023 Model', 2023, 3000, 'Luxury', 5, 'Automatic', 'Petrol', 500.00, 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', '["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"]', 32, true, '["Klima", "Premium Ses Sistemi", "Deri Döşeme", "Sürüş Asistanları", "Panoramik Tavan"]', 'Mercedes', '2.0L Turbo', '455L', 400, 'Lefkoşa', true, 'KK 1111');

    -- Drop existing trigger if it exists, then create new one
    DROP TRIGGER IF EXISTS update_cars_updated_at ON cars;
    CREATE TRIGGER update_cars_updated_at 
        BEFORE UPDATE ON cars 
        FOR EACH ROW 
        EXECUTE FUNCTION update_updated_at_column();

    -- Drop existing customers table if it exists (to ensure correct structure)
    DROP TABLE IF EXISTS customers CASCADE;

    -- Create customers table
    CREATE TABLE customers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    national_id VARCHAR(50) NOT NULL UNIQUE,
    driver_license_number VARCHAR(50) NOT NULL,
    driver_license_expiry DATE NOT NULL,
    address TEXT NOT NULL,
    notes TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
    registration_date DATE NOT NULL DEFAULT CURRENT_DATE,
    number_of_bookings INTEGER DEFAULT 0,
    last_booking_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Create indexes for customers table
    CREATE INDEX idx_customers_email ON customers(email);
    CREATE INDEX idx_customers_phone ON customers(phone);
    CREATE INDEX idx_customers_status ON customers(status);
    CREATE INDEX idx_customers_registration_date ON customers(registration_date);
    CREATE INDEX idx_customers_created_at ON customers(created_at);

    -- Insert sample customer data
    INSERT INTO customers (full_name, email, phone, date_of_birth, national_id, driver_license_number, driver_license_expiry, address, notes, status, registration_date, number_of_bookings, last_booking_date) VALUES
    ('Ahmet Yılmaz', 'ahmet.yilmaz@email.com', '+90 532 123 4567', '1985-03-15', '12345678901', 'A123456789', '2025-12-31', 'Atatürk Caddesi No: 45, Girne, KKTC', 'Preferred luxury vehicles', 'Active', '2023-01-15', 8, '2024-07-20'),
    ('Fatma Demir', 'fatma.demir@email.com', '+90 533 987 6543', '1990-07-22', '98765432109', 'B987654321', '2026-06-15', 'Cumhuriyet Meydanı No: 12, Lefkoşa, KKTC', 'Frequent business traveler', 'Active', '2023-03-10', 12, '2024-08-01'),
    ('Mehmet Kaya', 'mehmet.kaya@email.com', '+90 534 555 1234', '1988-11-08', '55566677788', 'C555666777', '2024-09-30', 'Sahil Caddesi No: 78, Gazimağusa, KKTC', 'Prefers automatic transmission', 'Active', '2023-05-20', 5, '2024-06-15'),
    ('Ayşe Özkan', 'ayse.ozkan@email.com', '+90 535 777 8888', '1992-04-12', '11122233344', 'D111222333', '2025-03-20', 'Ana Caddesi No: 23, İskele, KKTC', 'Student discount eligible', 'Inactive', '2023-02-28', 3, '2024-01-10'),
    ('Ali Çelik', 'ali.celik@email.com', '+90 536 999 0000', '1983-09-25', '99988877766', 'E999888777', '2026-01-15', 'Üniversite Kampüsü, Güzelyurt, KKTC', 'VIP customer, premium service', 'Active', '2023-04-05', 15, '2024-08-05'),
    ('Zeynep Arslan', 'zeynep.arslan@email.com', '+90 537 444 5555', '1995-12-03', '44455566677', 'F444555666', '2024-11-30', 'Deniz Caddesi No: 67, Girne, KKTC', 'New driver, requires assistance', 'Active', '2024-01-10', 2, '2024-07-25');

    -- Create trigger to automatically update updated_at for customers
    CREATE TRIGGER update_customers_updated_at 
        BEFORE UPDATE ON customers 
        FOR EACH ROW 
        EXECUTE FUNCTION update_updated_at_column();

    -- Drop existing bookings table if it exists (to ensure correct structure)
    DROP TABLE IF EXISTS bookings CASCADE;

    -- Create bookings table with proper foreign key relationships
    CREATE TABLE bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
    customer_name VARCHAR(255) NOT NULL,
    car_id UUID NOT NULL REFERENCES cars(id) ON DELETE RESTRICT,
    car_name VARCHAR(255) NOT NULL,
    car_plate VARCHAR(50),
    pickup_date DATE NOT NULL,
    return_date DATE NOT NULL,
    pickup_time VARCHAR(10) NOT NULL,
    return_time VARCHAR(10) NOT NULL,
    pickup_location VARCHAR(255) NOT NULL,
    return_location VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Active', 'Completed', 'Cancelled')),
    total_amount DECIMAL(10,2) NOT NULL,
    extras JSONB,
    insurance JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Create indexes for better performance
    CREATE INDEX idx_bookings_customer_id ON bookings(customer_id);
    CREATE INDEX idx_bookings_car_id ON bookings(car_id);
    CREATE INDEX idx_bookings_status ON bookings(status);
    CREATE INDEX idx_bookings_pickup_date ON bookings(pickup_date);
    CREATE INDEX idx_bookings_created_at ON bookings(created_at);

    -- Create trigger to automatically update updated_at for bookings
    CREATE TRIGGER update_bookings_updated_at 
        BEFORE UPDATE ON bookings 
        FOR EACH ROW 
        EXECUTE FUNCTION update_updated_at_column();

    -- Disable Row Level Security (RLS) for testing
    ALTER TABLE locations DISABLE ROW LEVEL SECURITY;
    ALTER TABLE cars DISABLE ROW LEVEL SECURITY;
    ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
    ALTER TABLE customers DISABLE ROW LEVEL SECURITY;

    -- Insert sample booking data with proper references to customers and cars
    INSERT INTO bookings (customer_id, customer_name, car_id, car_name, car_plate, pickup_date, return_date, pickup_time, return_time, pickup_location, return_location, status, total_amount) 
    SELECT 
    c.id, c.full_name, car.id, 'BMW 3 Series', 'KK 3456', '2024-08-01', '2024-08-03', '10:00', '10:00', 'Girne', 'Girne', 'Completed', 600.00
    FROM customers c, cars car WHERE c.full_name = 'Ahmet Yılmaz' AND car.name = 'BMW 3 Series' AND car.brand = 'BMW' LIMIT 1;

    INSERT INTO bookings (customer_id, customer_name, car_id, car_name, car_plate, pickup_date, return_date, pickup_time, return_time, pickup_location, return_location, status, total_amount) 
    SELECT 
    c.id, c.full_name, car.id, 'Mercedes C-Class', 'KK 1111', '2024-08-05', '2024-08-07', '14:00', '14:00', 'Lefkoşa', 'Lefkoşa', 'Active', 800.00
    FROM customers c, cars car WHERE c.full_name = 'Fatma Demir' AND car.name = 'Mercedes C-Class' AND car.brand = 'Mercedes' LIMIT 1;

    INSERT INTO bookings (customer_id, customer_name, car_id, car_name, car_plate, pickup_date, return_date, pickup_time, return_time, pickup_location, return_location, status, total_amount) 
    SELECT 
    c.id, c.full_name, car.id, 'Ford Mustang', 'KK 5678', '2024-08-10', '2024-08-12', '09:00', '09:00', 'Gazimağusa', 'Gazimağusa', 'Pending', 500.00
    FROM customers c, cars car WHERE c.full_name = 'Mehmet Kaya' AND car.name = 'Ford Mustang' AND car.brand = 'Ford' LIMIT 1;

    INSERT INTO bookings (customer_id, customer_name, car_id, car_name, car_plate, pickup_date, return_date, pickup_time, return_time, pickup_location, return_location, status, total_amount) 
    SELECT 
    c.id, c.full_name, car.id, 'Toyota Corolla', 'KK 1234', '2024-08-15', '2024-08-18', '11:00', '11:00', 'İskele', 'Girne', 'Active', 900.00
    FROM customers c, cars car WHERE c.full_name = 'Ayşe Özkan' AND car.name = 'Toyota Corolla' AND car.brand = 'Toyota' LIMIT 1;

    INSERT INTO bookings (customer_id, customer_name, car_id, car_name, car_plate, pickup_date, return_date, pickup_time, return_time, pickup_location, return_location, status, total_amount) 
    SELECT 
    c.id, c.full_name, car.id, 'Honda Civic', 'KK 7890', '2024-08-20', '2024-08-22', '16:00', '16:00', 'Güzelyurt', 'Güzelyurt', 'Pending', 400.00
    FROM customers c, cars car WHERE c.full_name = 'Ali Çelik' AND car.name = 'Honda Civic' AND car.brand = 'Honda' LIMIT 1;

    INSERT INTO bookings (customer_id, customer_name, car_id, car_name, car_plate, pickup_date, return_date, pickup_time, return_time, pickup_location, return_location, status, total_amount) 
    SELECT 
    c.id, c.full_name, car.id, 'Chevrolet Suburban', 'KK 9012', '2024-08-25', '2024-08-28', '08:00', '08:00', 'Girne', 'Lefkoşa', 'Pending', 750.00
    FROM customers c, cars car WHERE c.full_name = 'Ahmet Yılmaz' AND car.name = 'Chevrolet Suburban' AND car.brand = 'Chevrolet' LIMIT 1; 