-- Fake Data for RentACar Database
-- Additional sample data for testing and development

-- Additional Locations
INSERT INTO locations (name, address, city, phone, working_hours, status, email, manager, capacity) VALUES
('Lefkoşa Merkez', 'Kızılay Meydanı No: 15, Lefkoşa', 'Lefkoşa', '+90 392 228 1234', '08:00 - 21:00', 'Active', 'lefkosa@autorentpro.com', 'Murat Yıldırım', 35),
('Girne Sahil', 'Deniz Caddesi No: 89, Girne', 'Girne', '+90 392 815 5678', '07:00 - 22:00', 'Active', 'girnesahil@autorentpro.com', 'Elif Korkmaz', 28),
('Gazimağusa Merkez', 'Maraş Caddesi No: 34, Gazimağusa', 'Gazimağusa', '+90 392 366 2345', '08:30 - 20:30', 'Active', 'magusamerkez@autorentpro.com', 'Can Özkan', 22),
('Güzelyurt Sahil', 'Sahil Yolu No: 56, Güzelyurt', 'Güzelyurt', '+90 392 714 6789', '09:00 - 19:00', 'Active', 'guzelyurtsahil@autorentpro.com', 'Selin Demir', 16),
('İskele Merkez', 'Merkez Caddesi No: 78, İskele', 'İskele', '+90 392 371 3456', '08:00 - 18:00', 'Active', 'iskelemerkez@autorentpro.com', 'Burak Yılmaz', 12)
ON CONFLICT (id) DO NOTHING;

-- Additional Cars
INSERT INTO cars (name, model, year, mileage, category, seats, transmission, fuel_type, price_per_day, image, images, mpg, is_popular, features, brand, engine_size, trunk_capacity, km_limit, location, available, plate_number) VALUES
('Audi A4', '2023 Model', 2023, 7500, 'Luxury', 5, 'Automatic', 'Petrol', 420.00, 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', '["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"]', 34, true, '["Klima", "Premium Ses Sistemi", "Deri Döşeme", "Sürüş Asistanları", "LED Farlar"]', 'Audi', '2.0L Turbo', '460L', 350, 'Lefkoşa', true, 'KK 2222'),
('Volkswagen Golf', '2023 Model', 2023, 9500, 'Economy', 5, 'Manual', 'Diesel', 170.00, 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', '["https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"]', 45, false, '["Klima", "Bluetooth", "ABS", "Airbag", "Dijital Gösterge"]', 'Volkswagen', '1.6L TDI', '380L', 300, 'Gazimağusa', true, 'KK 3333'),
('Nissan Qashqai', '2023 Model', 2023, 12000, 'SUV', 5, 'Automatic', 'Petrol', 220.00, 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', '["https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"]', 28, true, '["Klima", "4WD", "Yüksek Oturma", "Geniş Bagaj", "Güvenlik Sistemleri"]', 'Nissan', '1.3L Turbo', '430L', 350, 'Girne', true, 'KK 4444'),
('Hyundai i20', '2023 Model', 2023, 6000, 'Economy', 5, 'Manual', 'Petrol', 140.00, 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', '["https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"]', 40, false, '["Klima", "Bluetooth", "ABS", "Airbag", "Yakıt Tasarrufu"]', 'Hyundai', '1.0L Turbo', '350L', 300, 'Güzelyurt', true, 'KK 5555'),
('Peugeot 3008', '2023 Model', 2023, 8000, 'SUV', 5, 'Automatic', 'Diesel', 240.00, 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', '["https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"]', 32, false, '["Klima", "4WD", "Premium İç Mekan", "Sürüş Asistanları"]', 'Peugeot', '1.5L BlueHDi', '520L', 350, 'İskele', true, 'KK 6666'),
('Skoda Octavia', '2023 Model', 2023, 11000, 'Economy', 5, 'Automatic', 'Petrol', 190.00, 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', '["https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"]', 38, true, '["Klima", "Bluetooth", "ABS", "Airbag", "Geniş İç Mekan"]', 'Skoda', '1.5L TSI', '590L', 300, 'Lefkoşa', true, 'KK 7777'),
('Renault Clio', '2023 Model', 2023, 7000, 'Economy', 5, 'Manual', 'Petrol', 150.00, 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', '["https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"]', 42, false, '["Klima", "Bluetooth", "ABS", "Airbag", "Kompakt Boyut"]', 'Renault', '1.0L TCe', '300L', 300, 'Gazimağusa', true, 'KK 8888'),
('Opel Corsa', '2023 Model', 2023, 9000, 'Economy', 5, 'Manual', 'Petrol', 145.00, 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', '["https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"]', 41, false, '["Klima", "Bluetooth", "ABS", "Airbag", "Yakıt Tasarrufu"]', 'Opel', '1.2L', '309L', 300, 'Girne', true, 'KK 9999');

-- Additional Customers
INSERT INTO customers (full_name, email, phone, date_of_birth, national_id, driver_license_number, driver_license_expiry, address, notes, status, registration_date, number_of_bookings, last_booking_date) VALUES
('Murat Yıldırım', 'murat.yildirim@email.com', '+90 538 111 2222', '1987-05-18', '11111111111', 'G111111111', '2025-08-20', 'Kızılay Meydanı No: 25, Lefkoşa, KKTC', 'Business customer, prefers automatic', 'Active', '2023-06-12', 6, '2024-07-30'),
('Elif Korkmaz', 'elif.korkmaz@email.com', '+90 539 222 3333', '1993-08-14', '22222222222', 'H222222222', '2026-02-10', 'Deniz Caddesi No: 12, Girne, KKTC', 'Frequent weekend renter', 'Active', '2023-07-05', 9, '2024-08-02'),
('Can Özkan', 'can.ozkan@email.com', '+90 540 333 4444', '1989-12-03', '33333333333', 'I333333333', '2024-12-25', 'Maraş Caddesi No: 45, Gazimağusa, KKTC', 'Prefers SUV vehicles', 'Active', '2023-08-20', 4, '2024-06-28'),
('Selin Demir', 'selin.demir@email.com', '+90 541 444 5555', '1991-03-27', '44444444444', 'J444444444', '2025-05-15', 'Sahil Yolu No: 78, Güzelyurt, KKTC', 'Student, budget conscious', 'Active', '2023-09-10', 3, '2024-07-15'),
('Burak Yılmaz', 'burak.yilmaz@email.com', '+90 542 555 6666', '1986-11-08', '55555555555', 'K555555555', '2026-01-30', 'Merkez Caddesi No: 34, İskele, KKTC', 'Family trips, needs large vehicles', 'Active', '2023-10-05', 7, '2024-08-01'),
('Deniz Arslan', 'deniz.arslan@email.com', '+90 543 666 7777', '1994-07-22', '66666666666', 'L666666666', '2025-09-12', 'Atatürk Caddesi No: 67, Girne, KKTC', 'Luxury car enthusiast', 'Active', '2023-11-15', 11, '2024-07-25'),
('Gizem Kaya', 'gizem.kaya@email.com', '+90 544 777 8888', '1990-01-15', '77777777777', 'M777777777', '2024-11-30', 'Cumhuriyet Meydanı No: 89, Lefkoşa, KKTC', 'International driver license', 'Active', '2023-12-01', 5, '2024-06-20'),
('Emre Çelik', 'emre.celik@email.com', '+90 545 888 9999', '1988-04-30', '88888888888', 'N888888888', '2026-03-25', 'Sahil Caddesi No: 23, Gazimağusa, KKTC', 'Sports car lover', 'Active', '2024-01-10', 8, '2024-07-28'),
('Merve Özkan', 'merve.ozkan@email.com', '+90 546 999 0000', '1992-09-05', '99999999999', 'O999999999', '2025-07-18', 'Ana Caddesi No: 56, İskele, KKTC', 'New customer, first time renter', 'Active', '2024-02-15', 1, '2024-08-03'),
('Kaan Demir', 'kaan.demir@email.com', '+90 547 000 1111', '1985-06-12', '00000000000', 'P000000000', '2026-04-08', 'Üniversite Kampüsü No: 12, Güzelyurt, KKTC', 'Academic staff, regular customer', 'Active', '2024-03-01', 4, '2024-07-22');

-- Additional Bookings (using the new customers and cars)
INSERT INTO bookings (customer_id, customer_name, car_id, car_name, car_plate, pickup_date, return_date, pickup_time, return_time, pickup_location, return_location, status, total_amount) 
SELECT 
c.id, c.full_name, car.id, car.name, car.plate_number, '2024-08-05', '2024-08-07', '10:00', '10:00', 'Lefkoşa', 'Lefkoşa', 'Completed', 840.00
FROM customers c, cars car WHERE c.full_name = 'Murat Yıldırım' AND car.name = 'Audi A4' LIMIT 1;

INSERT INTO bookings (customer_id, customer_name, car_id, car_name, car_plate, pickup_date, return_date, pickup_time, return_time, pickup_location, return_location, status, total_amount) 
SELECT 
c.id, c.full_name, car.id, car.name, car.plate_number, '2024-08-10', '2024-08-12', '14:00', '14:00', 'Girne', 'Girne', 'Active', 340.00
FROM customers c, cars car WHERE c.full_name = 'Elif Korkmaz' AND car.name = 'Volkswagen Golf' LIMIT 1;

INSERT INTO bookings (customer_id, customer_name, car_id, car_name, car_plate, pickup_date, return_date, pickup_time, return_time, pickup_location, return_location, status, total_amount) 
SELECT 
c.id, c.full_name, car.id, car.name, car.plate_number, '2024-08-15', '2024-08-18', '09:00', '09:00', 'Gazimağusa', 'Gazimağusa', 'Pending', 660.00
FROM customers c, cars car WHERE c.full_name = 'Can Özkan' AND car.name = 'Nissan Qashqai' LIMIT 1;

INSERT INTO bookings (customer_id, customer_name, car_id, car_name, car_plate, pickup_date, return_date, pickup_time, return_time, pickup_location, return_location, status, total_amount) 
SELECT 
c.id, c.full_name, car.id, car.name, car.plate_number, '2024-08-20', '2024-08-22', '11:00', '11:00', 'Güzelyurt', 'Güzelyurt', 'Active', 280.00
FROM customers c, cars car WHERE c.full_name = 'Selin Demir' AND car.name = 'Hyundai i20' LIMIT 1;

INSERT INTO bookings (customer_id, customer_name, car_id, car_name, car_plate, pickup_date, return_date, pickup_time, return_time, pickup_location, return_location, status, total_amount) 
SELECT 
c.id, c.full_name, car.id, car.name, car.plate_number, '2024-08-25', '2024-08-28', '16:00', '16:00', 'İskele', 'İskele', 'Pending', 720.00
FROM customers c, cars car WHERE c.full_name = 'Burak Yılmaz' AND car.name = 'Peugeot 3008' LIMIT 1;

INSERT INTO bookings (customer_id, customer_name, car_id, car_name, car_plate, pickup_date, return_date, pickup_time, return_time, pickup_location, return_location, status, total_amount) 
SELECT 
c.id, c.full_name, car.id, car.name, car.plate_number, '2024-09-01', '2024-09-03', '08:00', '08:00', 'Girne', 'Lefkoşa', 'Pending', 570.00
FROM customers c, cars car WHERE c.full_name = 'Deniz Arslan' AND car.name = 'Skoda Octavia' LIMIT 1;

INSERT INTO bookings (customer_id, customer_name, car_id, car_name, car_plate, pickup_date, return_date, pickup_time, return_time, pickup_location, return_location, status, total_amount) 
SELECT 
c.id, c.full_name, car.id, car.name, car.plate_number, '2024-09-05', '2024-09-07', '13:00', '13:00', 'Lefkoşa', 'Lefkoşa', 'Active', 300.00
FROM customers c, cars car WHERE c.full_name = 'Gizem Kaya' AND car.name = 'Renault Clio' LIMIT 1;

INSERT INTO bookings (customer_id, customer_name, car_id, car_name, car_plate, pickup_date, return_date, pickup_time, return_time, pickup_location, return_location, status, total_amount) 
SELECT 
c.id, c.full_name, car.id, car.name, car.plate_number, '2024-09-10', '2024-09-12', '10:00', '10:00', 'Gazimağusa', 'Gazimağusa', 'Pending', 290.00
FROM customers c, cars car WHERE c.full_name = 'Emre Çelik' AND car.name = 'Opel Corsa' LIMIT 1;

INSERT INTO bookings (customer_id, customer_name, car_id, car_name, car_plate, pickup_date, return_date, pickup_time, return_time, pickup_location, return_location, status, total_amount) 
SELECT 
c.id, c.full_name, car.id, car.name, car.plate_number, '2024-09-15', '2024-09-17', '15:00', '15:00', 'İskele', 'İskele', 'Active', 420.00
FROM customers c, cars car WHERE c.full_name = 'Merve Özkan' AND car.name = 'BMW 3 Series' LIMIT 1;

INSERT INTO bookings (customer_id, customer_name, car_id, car_name, car_plate, pickup_date, return_date, pickup_time, return_time, pickup_location, return_location, status, total_amount) 
SELECT 
c.id, c.full_name, car.id, car.name, car.plate_number, '2024-09-20', '2024-09-23', '12:00', '12:00', 'Güzelyurt', 'Güzelyurt', 'Pending', 760.00
FROM customers c, cars car WHERE c.full_name = 'Kaan Demir' AND car.name = 'Mercedes C-Class' LIMIT 1; 