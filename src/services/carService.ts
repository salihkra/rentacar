import { supabase } from '../supabase/supabase';
import { Car } from '../types';

export interface CreateCarData {
  name: string;
  model: string;
  year: number;
  mileage: number;
  category: 'Economy' | 'Sports' | 'SUV' | 'Luxury';
  seats: number;
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  pricePerDay: number;
  image?: string;
  images?: string[];
  mpg?: number;
  isPopular?: boolean;
  features?: string[];
  brand: string;
  engineSize?: string;
  trunkCapacity?: string;
  kmLimit?: number;
  location: string;
  available?: boolean;
  plateNumber?: string;
}

export interface UpdateCarData extends CreateCarData {
  id: string;
}

export const carService = {
  async getAllCars(): Promise<Car[]> {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching cars:', error);
        throw error;
      }

      // Transform snake_case to camelCase
      return (data || []).map(car => ({
        id: car.id,
        name: car.name,
        model: car.model,
        year: car.year,
        mileage: car.mileage,
        category: car.category,
        seats: car.seats,
        transmission: car.transmission,
        fuelType: car.fuel_type, // Mapped
        pricePerDay: car.price_per_day, // Mapped
        image: car.image,
        images: car.images || [],
        mpg: car.mpg,
        isPopular: car.is_popular, // Mapped
        features: car.features || [],
        brand: car.brand,
        engineSize: car.engine_size, // Mapped
        trunkCapacity: car.trunk_capacity, // Mapped
        kmLimit: car.km_limit, // Mapped
        location: car.location,
        available: car.available,
        plateNumber: car.plate_number // Mapped
      }));
    } catch (error) {
      console.error('Error in getAllCars:', error);
      throw error;
    }
  },

  async getCarById(id: string): Promise<Car | null> {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching car:', error);
        throw error;
      }

      if (!data) return null;

      // Transform snake_case to camelCase
      return {
        id: data.id,
        name: data.name,
        model: data.model,
        year: data.year,
        mileage: data.mileage,
        category: data.category,
        seats: data.seats,
        transmission: data.transmission,
        fuelType: data.fuel_type,
        pricePerDay: data.price_per_day,
        image: data.image,
        images: data.images || [],
        mpg: data.mpg,
        isPopular: data.is_popular,
        features: data.features || [],
        brand: data.brand,
        engineSize: data.engine_size,
        trunkCapacity: data.trunk_capacity,
        kmLimit: data.km_limit,
        location: data.location,
        available: data.available,
        plateNumber: data.plate_number
      };
    } catch (error) {
      console.error('Error in getCarById:', error);
      throw error;
    }
  },

  async createCar(carData: CreateCarData): Promise<Car> {
    try {
      const { data, error } = await supabase
        .from('cars')
        .insert([{
          name: carData.name,
          model: carData.model,
          year: carData.year,
          mileage: carData.mileage,
          category: carData.category,
          seats: carData.seats,
          transmission: carData.transmission,
          fuel_type: carData.fuelType, // Mapped
          price_per_day: carData.pricePerDay, // Mapped
          image: carData.image,
          images: carData.images,
          mpg: carData.mpg,
          is_popular: carData.isPopular, // Mapped
          features: carData.features,
          brand: carData.brand,
          engine_size: carData.engineSize, // Mapped
          trunk_capacity: carData.trunkCapacity, // Mapped
          km_limit: carData.kmLimit, // Mapped
          location: carData.location,
          available: carData.available,
          plate_number: carData.plateNumber // Mapped
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating car:', error);
        throw error;
      }

      // Transform snake_case to camelCase
      return {
        id: data.id,
        name: data.name,
        model: data.model,
        year: data.year,
        mileage: data.mileage,
        category: data.category,
        seats: data.seats,
        transmission: data.transmission,
        fuelType: data.fuel_type,
        pricePerDay: data.price_per_day,
        image: data.image,
        images: data.images || [],
        mpg: data.mpg,
        isPopular: data.is_popular,
        features: data.features || [],
        brand: data.brand,
        engineSize: data.engine_size,
        trunkCapacity: data.trunk_capacity,
        kmLimit: data.km_limit,
        location: data.location,
        available: data.available,
        plateNumber: data.plate_number
      };
    } catch (error) {
      console.error('Error in createCar:', error);
      throw error;
    }
  },

  async updateCar(id: string, carData: CreateCarData): Promise<Car> {
    try {
      const { data, error } = await supabase
        .from('cars')
        .update({
          name: carData.name,
          model: carData.model,
          year: carData.year,
          mileage: carData.mileage,
          category: carData.category,
          seats: carData.seats,
          transmission: carData.transmission,
          fuel_type: carData.fuelType,
          price_per_day: carData.pricePerDay,
          image: carData.image,
          images: carData.images,
          mpg: carData.mpg,
          is_popular: carData.isPopular,
          features: carData.features,
          brand: carData.brand,
          engine_size: carData.engineSize,
          trunk_capacity: carData.trunkCapacity,
          km_limit: carData.kmLimit,
          location: carData.location,
          available: carData.available,
          plate_number: carData.plateNumber
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating car:', error);
        throw error;
      }

      // Transform snake_case to camelCase
      return {
        id: data.id,
        name: data.name,
        model: data.model,
        year: data.year,
        mileage: data.mileage,
        category: data.category,
        seats: data.seats,
        transmission: data.transmission,
        fuelType: data.fuel_type,
        pricePerDay: data.price_per_day,
        image: data.image,
        images: data.images || [],
        mpg: data.mpg,
        isPopular: data.is_popular,
        features: data.features || [],
        brand: data.brand,
        engineSize: data.engine_size,
        trunkCapacity: data.trunk_capacity,
        kmLimit: data.km_limit,
        location: data.location,
        available: data.available,
        plateNumber: data.plate_number
      };
    } catch (error) {
      console.error('Error in updateCar:', error);
      throw error;
    }
  },

  async deleteCar(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting car:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error in deleteCar:', error);
      throw error;
    }
  },

  async searchCars(searchTerm: string): Promise<Car[]> {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .or(`name.ilike.%${searchTerm}%,brand.ilike.%${searchTerm}%,model.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error searching cars:', error);
        throw error;
      }

      // Transform snake_case to camelCase
      return (data || []).map(car => ({
        id: car.id,
        name: car.name,
        model: car.model,
        year: car.year,
        mileage: car.mileage,
        category: car.category,
        seats: car.seats,
        transmission: car.transmission,
        fuelType: car.fuel_type,
        pricePerDay: car.price_per_day,
        image: car.image,
        images: car.images || [],
        mpg: car.mpg,
        isPopular: car.is_popular,
        features: car.features || [],
        brand: car.brand,
        engineSize: car.engine_size,
        trunkCapacity: car.trunk_capacity,
        kmLimit: car.km_limit,
        location: car.location,
        available: car.available,
        plateNumber: car.plate_number
      }));
    } catch (error) {
      console.error('Error in searchCars:', error);
      throw error;
    }
  },

  async filterCarsByCategory(category: string): Promise<Car[]> {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error filtering cars by category:', error);
        throw error;
      }

      // Transform snake_case to camelCase
      return (data || []).map(car => ({
        id: car.id,
        name: car.name,
        model: car.model,
        year: car.year,
        mileage: car.mileage,
        category: car.category,
        seats: car.seats,
        transmission: car.transmission,
        fuelType: car.fuel_type,
        pricePerDay: car.price_per_day,
        image: car.image,
        images: car.images || [],
        mpg: car.mpg,
        isPopular: car.is_popular,
        features: car.features || [],
        brand: car.brand,
        engineSize: car.engine_size,
        trunkCapacity: car.trunk_capacity,
        kmLimit: car.km_limit,
        location: car.location,
        available: car.available,
        plateNumber: car.plate_number
      }));
    } catch (error) {
      console.error('Error in filterCarsByCategory:', error);
      throw error;
    }
  },

  async getAvailableCars(): Promise<Car[]> {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('available', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching available cars:', error);
        throw error;
      }

      // Transform snake_case to camelCase
      return (data || []).map(car => ({
        id: car.id,
        name: car.name,
        model: car.model,
        year: car.year,
        mileage: car.mileage,
        category: car.category,
        seats: car.seats,
        transmission: car.transmission,
        fuelType: car.fuel_type,
        pricePerDay: car.price_per_day,
        image: car.image,
        images: car.images || [],
        mpg: car.mpg,
        isPopular: car.is_popular,
        features: car.features || [],
        brand: car.brand,
        engineSize: car.engine_size,
        trunkCapacity: car.trunk_capacity,
        kmLimit: car.km_limit,
        location: car.location,
        available: car.available,
        plateNumber: car.plate_number
      }));
    } catch (error) {
      console.error('Error in getAvailableCars:', error);
      throw error;
    }
  },

  async getUnavailableCars(): Promise<Car[]> {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('available', false)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching unavailable cars:', error);
        throw error;
      }

      // Transform snake_case to camelCase
      return (data || []).map(car => ({
        id: car.id,
        name: car.name,
        model: car.model,
        year: car.year,
        mileage: car.mileage,
        category: car.category,
        seats: car.seats,
        transmission: car.transmission,
        fuelType: car.fuel_type,
        pricePerDay: car.price_per_day,
        image: car.image,
        images: car.images || [],
        mpg: car.mpg,
        isPopular: car.is_popular,
        features: car.features || [],
        brand: car.brand,
        engineSize: car.engine_size,
        trunkCapacity: car.trunk_capacity,
        kmLimit: car.km_limit,
        location: car.location,
        available: car.available,
        plateNumber: car.plate_number
      }));
    } catch (error) {
      console.error('Error in getUnavailableCars:', error);
      throw error;
    }
  }
}; 