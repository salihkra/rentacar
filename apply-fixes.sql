-- Fix for Foreign Key Relationship Issue
-- Run this script in your Supabase SQL editor to fix the customer_id foreign key issue

-- First, drop the existing bookings table (this will also drop any foreign key constraints)
DROP TABLE IF EXISTS bookings CASCADE;

-- Recreate the bookings table with proper foreign key relationships
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
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;

-- Re-insert the sample booking data with proper references
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