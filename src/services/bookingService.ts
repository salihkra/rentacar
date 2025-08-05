import { supabase } from '../supabase/supabase';
import { Booking } from '../types';
import { carService } from './carService';

export interface CreateBookingData {
  customerId: string;
  customerName: string;
  carId: string; // This is now a UUID that references cars.id
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

export interface UpdateBookingData extends CreateBookingData {
  id: string;
}

export const bookingService = {
  // Helper function to update car availability based on booking status
  async updateCarAvailability(carId: string, isBooked: boolean): Promise<void> {
    try {
      const car = await carService.getCarById(carId);
      if (car) {
        await carService.updateCar(carId, {
          ...car,
          available: !isBooked // Set to false if booked, true if available
        });
      }
    } catch (error) {
      console.error('Error updating car availability:', error);
      // Don't throw error to avoid breaking the booking operation
    }
  },

  // Helper function to check if a car should be available based on its bookings
  async checkAndUpdateCarAvailability(carId: string): Promise<void> {
    try {
      const { data: activeBookings, error } = await supabase
        .from('bookings')
        .select('status')
        .eq('car_id', carId)
        .in('status', ['Pending', 'Active']);

      if (error) {
        console.error('Error checking car bookings:', error);
        return;
      }

      // If there are no active bookings, make the car available
      const hasActiveBookings = activeBookings && activeBookings.length > 0;
      await this.updateCarAvailability(carId, hasActiveBookings);
    } catch (error) {
      console.error('Error in checkAndUpdateCarAvailability:', error);
    }
  },

  // Sync all car availability based on current bookings
  async syncAllCarAvailability(): Promise<void> {
    try {
      // Get all cars
      const cars = await carService.getAllCars();
      
      // For each car, check if it has active bookings
      for (const car of cars) {
        await this.checkAndUpdateCarAvailability(car.id);
      }
    } catch (error) {
      console.error('Error syncing car availability:', error);
    }
  },

  async getAllBookings(): Promise<Booking[]> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          cars:car_id (
            id,
            name,
            brand,
            model,
            plate_number,
            price_per_day
          ),
          customers:customer_id (
            id,
            full_name,
            email,
            phone,
            national_id,
            driver_license_number,
            driver_license_expiry,
            address,
            status,
            registration_date,
            number_of_bookings,
            last_booking_date
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching bookings:', error);
        throw error;
      }

      // Transform snake_case to camelCase
      return (data || []).map(booking => ({
        id: booking.id,
        customerId: booking.customer_id,
        customerName: booking.customer_name,
        customer: booking.customers ? {
          id: booking.customers.id,
          fullName: booking.customers.full_name,
          email: booking.customers.email,
          phone: booking.customers.phone,
          dateOfBirth: booking.customers.date_of_birth,
          nationalId: booking.customers.national_id,
          driverLicenseNumber: booking.customers.driver_license_number,
          driverLicenseExpiry: booking.customers.driver_license_expiry,
          address: booking.customers.address,
          notes: booking.customers.notes,
          status: booking.customers.status,
          registrationDate: booking.customers.registration_date,
          numberOfBookings: booking.customers.number_of_bookings || 0,
          lastBookingDate: booking.customers.last_booking_date
        } : null,
        carId: booking.car_id,
        carName: booking.car_name,
        carPlate: booking.car_plate,
        pickupDate: booking.pickup_date,
        returnDate: booking.return_date,
        pickupTime: booking.pickup_time,
        returnTime: booking.return_time,
        pickupLocation: booking.pickup_location,
        returnLocation: booking.return_location,
        status: booking.status,
        totalAmount: booking.total_amount,
        extras: booking.extras || [],
        insurance: booking.insurance
      }));
    } catch (error) {
      console.error('Error in getAllBookings:', error);
      throw error;
    }
  },

  async getBookingById(id: string): Promise<Booking | null> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          cars:car_id (
            id,
            name,
            brand,
            model,
            plate_number,
            price_per_day
          ),
          customers:customer_id (
            id,
            full_name,
            email,
            phone,
            national_id,
            driver_license_number,
            driver_license_expiry,
            address,
            status,
            registration_date,
            number_of_bookings,
            last_booking_date
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching booking:', error);
        throw error;
      }

      if (!data) return null;

      // Transform snake_case to camelCase
      return {
        id: data.id,
        customerId: data.customer_id,
        customerName: data.customer_name,
        customer: data.customers ? {
          id: data.customers.id,
          fullName: data.customers.full_name,
          email: data.customers.email,
          phone: data.customers.phone,
          dateOfBirth: data.customers.date_of_birth,
          nationalId: data.customers.national_id,
          driverLicenseNumber: data.customers.driver_license_number,
          driverLicenseExpiry: data.customers.driver_license_expiry,
          address: data.customers.address,
          notes: data.customers.notes,
          status: data.customers.status,
          registrationDate: data.customers.registration_date,
          numberOfBookings: data.customers.number_of_bookings || 0,
          lastBookingDate: data.customers.last_booking_date
        } : null,
        carId: data.car_id,
        carName: data.car_name,
        carPlate: data.car_plate,
        pickupDate: data.pickup_date,
        returnDate: data.return_date,
        pickupTime: data.pickup_time,
        returnTime: data.return_time,
        pickupLocation: data.pickup_location,
        returnLocation: data.return_location,
        status: data.status,
        totalAmount: data.total_amount,
        extras: data.extras || [],
        insurance: data.insurance
      };
    } catch (error) {
      console.error('Error in getBookingById:', error);
      throw error;
    }
  },

  async createBooking(bookingData: CreateBookingData): Promise<Booking> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([{
          customer_id: bookingData.customerId,
          customer_name: bookingData.customerName,
          car_id: bookingData.carId,
          car_name: bookingData.carName,
          car_plate: bookingData.carPlate,
          pickup_date: bookingData.pickupDate,
          return_date: bookingData.returnDate,
          pickup_time: bookingData.pickupTime,
          return_time: bookingData.returnTime,
          pickup_location: bookingData.pickupLocation,
          return_location: bookingData.returnLocation,
          status: bookingData.status,
          total_amount: bookingData.totalAmount,
          extras: bookingData.extras,
          insurance: bookingData.insurance
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating booking:', error);
        throw error;
      }

      // Update car availability to "not available" (full)
      await this.updateCarAvailability(bookingData.carId, true);

      // Transform snake_case to camelCase
      return {
        id: data.id,
        customerId: data.customer_id,
        customerName: data.customer_name,
        carId: data.car_id,
        carName: data.car_name,
        carPlate: data.car_plate,
        pickupDate: data.pickup_date,
        returnDate: data.return_date,
        pickupTime: data.pickup_time,
        returnTime: data.return_time,
        pickupLocation: data.pickup_location,
        returnLocation: data.return_location,
        status: data.status,
        totalAmount: data.total_amount,
        extras: data.extras || [],
        insurance: data.insurance
      };
    } catch (error) {
      console.error('Error in createBooking:', error);
      throw error;
    }
  },

  async updateBooking(id: string, bookingData: CreateBookingData): Promise<Booking> {
    try {
      // Get the current booking to check if car has changed
      const currentBooking = await this.getBookingById(id);
      
      const { data, error } = await supabase
        .from('bookings')
        .update({
          customer_id: bookingData.customerId,
          customer_name: bookingData.customerName,
          car_id: bookingData.carId,
          car_name: bookingData.carName,
          car_plate: bookingData.carPlate,
          pickup_date: bookingData.pickupDate,
          return_date: bookingData.returnDate,
          pickup_time: bookingData.pickupTime,
          return_time: bookingData.returnTime,
          pickup_location: bookingData.pickupLocation,
          return_location: bookingData.returnLocation,
          status: bookingData.status,
          total_amount: bookingData.totalAmount,
          extras: bookingData.extras,
          insurance: bookingData.insurance
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating booking:', error);
        throw error;
      }

      // Handle car availability updates
      if (currentBooking) {
        // If car has changed, make the old car available and new car unavailable
        if (currentBooking.carId !== bookingData.carId) {
          await this.updateCarAvailability(currentBooking.carId, false); // Make old car available
          await this.updateCarAvailability(bookingData.carId, true); // Make new car unavailable
        } else {
          // Same car, update availability based on status
          const isBooked = bookingData.status !== 'Cancelled' && bookingData.status !== 'Completed';
          await this.updateCarAvailability(bookingData.carId, isBooked);
        }
      }

      // Transform snake_case to camelCase
      return {
        id: data.id,
        customerId: data.customer_id,
        customerName: data.customer_name,
        carId: data.car_id,
        carName: data.car_name,
        carPlate: data.car_plate,
        pickupDate: data.pickup_date,
        returnDate: data.return_date,
        pickupTime: data.pickup_time,
        returnTime: data.return_time,
        pickupLocation: data.pickup_location,
        returnLocation: data.return_location,
        status: data.status,
        totalAmount: data.total_amount,
        extras: data.extras || [],
        insurance: data.insurance
      };
    } catch (error) {
      console.error('Error in updateBooking:', error);
      throw error;
    }
  },

  async deleteBooking(id: string): Promise<void> {
    try {
      // Get the booking before deleting to know which car to make available
      const booking = await this.getBookingById(id);
      
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting booking:', error);
        throw error;
      }

      // Make the car available again
      if (booking) {
        await this.updateCarAvailability(booking.carId, false);
      }
    } catch (error) {
      console.error('Error in deleteBooking:', error);
      throw error;
    }
  },

  async searchBookings(searchTerm: string): Promise<Booking[]> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          cars:car_id (
            id,
            name,
            brand,
            model,
            plate_number,
            price_per_day
          ),
          customers:customer_id (
            id,
            full_name,
            email,
            phone,
            national_id,
            driver_license_number,
            driver_license_expiry,
            address,
            status,
            registration_date,
            number_of_bookings,
            last_booking_date
          )
        `)
        .or(`customer_name.ilike.%${searchTerm}%,car_name.ilike.%${searchTerm}%,car_plate.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error searching bookings:', error);
        throw error;
      }

      // Transform snake_case to camelCase
      return (data || []).map(booking => ({
        id: booking.id,
        customerId: booking.customer_id,
        customerName: booking.customer_name,
        customer: booking.customers ? {
          id: booking.customers.id,
          fullName: booking.customers.full_name,
          email: booking.customers.email,
          phone: booking.customers.phone,
          dateOfBirth: booking.customers.date_of_birth,
          nationalId: booking.customers.national_id,
          driverLicenseNumber: booking.customers.driver_license_number,
          driverLicenseExpiry: booking.customers.driver_license_expiry,
          address: booking.customers.address,
          notes: booking.customers.notes,
          status: booking.customers.status,
          registrationDate: booking.customers.registration_date,
          numberOfBookings: booking.customers.number_of_bookings || 0,
          lastBookingDate: booking.customers.last_booking_date
        } : null,
        carId: booking.car_id,
        carName: booking.car_name,
        carPlate: booking.car_plate,
        pickupDate: booking.pickup_date,
        returnDate: booking.return_date,
        pickupTime: booking.pickup_time,
        returnTime: booking.return_time,
        pickupLocation: booking.pickup_location,
        returnLocation: booking.return_location,
        status: booking.status,
        totalAmount: booking.total_amount,
        extras: booking.extras || [],
        insurance: booking.insurance
      }));
    } catch (error) {
      console.error('Error in searchBookings:', error);
      throw error;
    }
  },

  async filterBookingsByStatus(status: string): Promise<Booking[]> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          cars:car_id (
            id,
            name,
            brand,
            model,
            plate_number,
            price_per_day
          ),
          customers:customer_id (
            id,
            full_name,
            email,
            phone,
            national_id,
            driver_license_number,
            driver_license_expiry,
            address,
            status,
            registration_date,
            number_of_bookings,
            last_booking_date
          )
        `)
        .eq('status', status)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error filtering bookings by status:', error);
        throw error;
      }

      // Transform snake_case to camelCase
      return (data || []).map(booking => ({
        id: booking.id,
        customerId: booking.customer_id,
        customerName: booking.customer_name,
        customer: booking.customers ? {
          id: booking.customers.id,
          fullName: booking.customers.full_name,
          email: booking.customers.email,
          phone: booking.customers.phone,
          dateOfBirth: booking.customers.date_of_birth,
          nationalId: booking.customers.national_id,
          driverLicenseNumber: booking.customers.driver_license_number,
          driverLicenseExpiry: booking.customers.driver_license_expiry,
          address: booking.customers.address,
          notes: booking.customers.notes,
          status: booking.customers.status,
          registrationDate: booking.customers.registration_date,
          numberOfBookings: booking.customers.number_of_bookings || 0,
          lastBookingDate: booking.customers.last_booking_date
        } : null,
        carId: booking.car_id,
        carName: booking.car_name,
        carPlate: booking.car_plate,
        pickupDate: booking.pickup_date,
        returnDate: booking.return_date,
        pickupTime: booking.pickup_time,
        returnTime: booking.return_time,
        pickupLocation: booking.pickup_location,
        returnLocation: booking.return_location,
        status: booking.status,
        totalAmount: booking.total_amount,
        extras: booking.extras || [],
        insurance: booking.insurance
      }));
    } catch (error) {
      console.error('Error in filterBookingsByStatus:', error);
      throw error;
    }
  },

  async filterBookingsByDateRange(startDate: string, endDate: string): Promise<Booking[]> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          cars:car_id (
            id,
            name,
            brand,
            model,
            plate_number,
            price_per_day
          ),
          customers:customer_id (
            id,
            full_name,
            email,
            phone,
            national_id,
            driver_license_number,
            driver_license_expiry,
            address,
            status,
            registration_date,
            number_of_bookings,
            last_booking_date
          )
        `)
        .gte('pickup_date', startDate)
        .lte('pickup_date', endDate)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error filtering bookings by date range:', error);
        throw error;
      }

      // Transform snake_case to camelCase
      return (data || []).map(booking => ({
        id: booking.id,
        customerId: booking.customer_id,
        customerName: booking.customer_name,
        customer: booking.customers ? {
          id: booking.customers.id,
          fullName: booking.customers.full_name,
          email: booking.customers.email,
          phone: booking.customers.phone,
          dateOfBirth: booking.customers.date_of_birth,
          nationalId: booking.customers.national_id,
          driverLicenseNumber: booking.customers.driver_license_number,
          driverLicenseExpiry: booking.customers.driver_license_expiry,
          address: booking.customers.address,
          notes: booking.customers.notes,
          status: booking.customers.status,
          registrationDate: booking.customers.registration_date,
          numberOfBookings: booking.customers.number_of_bookings || 0,
          lastBookingDate: booking.customers.last_booking_date
        } : null,
        carId: booking.car_id,
        carName: booking.car_name,
        carPlate: booking.car_plate,
        pickupDate: booking.pickup_date,
        returnDate: booking.return_date,
        pickupTime: booking.pickup_time,
        returnTime: booking.return_time,
        pickupLocation: booking.pickup_location,
        returnLocation: booking.return_location,
        status: booking.status,
        totalAmount: booking.total_amount,
        extras: booking.extras || [],
        insurance: booking.insurance
      }));
    } catch (error) {
      console.error('Error in filterBookingsByDateRange:', error);
      throw error;
    }
  },

  async validateCustomerForBooking(customerId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('id, status')
        .eq('id', customerId)
        .single();

      if (error) {
        console.error('Error validating customer:', error);
        return false;
      }

      // Check if customer exists and is active
      return data && data.status === 'Active';
    } catch (error) {
      console.error('Error in validateCustomerForBooking:', error);
      return false;
    }
  },

  async createBookingWithCustomerValidation(bookingData: CreateBookingData, customerId?: string): Promise<Booking> {
    try {
      // If customerId is provided, validate that the customer exists and is active
      if (customerId) {
        const isValidCustomer = await this.validateCustomerForBooking(customerId);
        if (!isValidCustomer) {
          throw new Error('Customer not found or inactive. Please ensure the customer is registered and active.');
        }
      }

      // Proceed with booking creation
      return await this.createBooking(bookingData);
    } catch (error) {
      console.error('Error in createBookingWithCustomerValidation:', error);
      throw error;
    }
  }
}; 