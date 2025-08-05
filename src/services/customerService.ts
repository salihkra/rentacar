import { supabase } from '../supabase/supabase';
import { Customer } from '../types';

export interface CreateCustomerData {
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
}

export interface UpdateCustomerData extends CreateCustomerData {
  id: string;
}

export const customerService = {
  async getAllCustomers(): Promise<Customer[]> {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching customers:', error);
        throw error;
      }

      // Transform snake_case to camelCase
      return (data || []).map(customer => ({
        id: customer.id,
        fullName: customer.full_name,
        email: customer.email,
        phone: customer.phone,
        dateOfBirth: customer.date_of_birth,
        nationalId: customer.national_id,
        driverLicenseNumber: customer.driver_license_number,
        driverLicenseExpiry: customer.driver_license_expiry,
        address: customer.address,
        notes: customer.notes,
        status: customer.status,
        registrationDate: customer.registration_date,
        numberOfBookings: customer.number_of_bookings || 0,
        lastBookingDate: customer.last_booking_date
      }));
    } catch (error) {
      console.error('Error in getAllCustomers:', error);
      throw error;
    }
  },

  async getCustomerById(id: string): Promise<Customer | null> {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching customer:', error);
        throw error;
      }

      if (!data) return null;

      // Transform snake_case to camelCase
      return {
        id: data.id,
        fullName: data.full_name,
        email: data.email,
        phone: data.phone,
        dateOfBirth: data.date_of_birth,
        nationalId: data.national_id,
        driverLicenseNumber: data.driver_license_number,
        driverLicenseExpiry: data.driver_license_expiry,
        address: data.address,
        notes: data.notes,
        status: data.status,
        registrationDate: data.registration_date,
        numberOfBookings: data.number_of_bookings || 0,
        lastBookingDate: data.last_booking_date
      };
    } catch (error) {
      console.error('Error in getCustomerById:', error);
      throw error;
    }
  },

  async createCustomer(customerData: CreateCustomerData): Promise<Customer> {
    try {
      const { data, error } = await supabase
        .from('customers')
        .insert([{
          full_name: customerData.fullName,
          email: customerData.email,
          phone: customerData.phone,
          date_of_birth: customerData.dateOfBirth,
          national_id: customerData.nationalId,
          driver_license_number: customerData.driverLicenseNumber,
          driver_license_expiry: customerData.driverLicenseExpiry,
          address: customerData.address,
          notes: customerData.notes,
          status: customerData.status,
          registration_date: new Date().toISOString().split('T')[0],
          number_of_bookings: 0
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating customer:', error);
        throw error;
      }

      // Transform snake_case to camelCase
      return {
        id: data.id,
        fullName: data.full_name,
        email: data.email,
        phone: data.phone,
        dateOfBirth: data.date_of_birth,
        nationalId: data.national_id,
        driverLicenseNumber: data.driver_license_number,
        driverLicenseExpiry: data.driver_license_expiry,
        address: data.address,
        notes: data.notes,
        status: data.status,
        registrationDate: data.registration_date,
        numberOfBookings: data.number_of_bookings || 0,
        lastBookingDate: data.last_booking_date
      };
    } catch (error) {
      console.error('Error in createCustomer:', error);
      throw error;
    }
  },

  async updateCustomer(id: string, customerData: CreateCustomerData): Promise<Customer> {
    try {
      const { data, error } = await supabase
        .from('customers')
        .update({
          full_name: customerData.fullName,
          email: customerData.email,
          phone: customerData.phone,
          date_of_birth: customerData.dateOfBirth,
          national_id: customerData.nationalId,
          driver_license_number: customerData.driverLicenseNumber,
          driver_license_expiry: customerData.driverLicenseExpiry,
          address: customerData.address,
          notes: customerData.notes,
          status: customerData.status
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating customer:', error);
        throw error;
      }

      // Transform snake_case to camelCase
      return {
        id: data.id,
        fullName: data.full_name,
        email: data.email,
        phone: data.phone,
        dateOfBirth: data.date_of_birth,
        nationalId: data.national_id,
        driverLicenseNumber: data.driver_license_number,
        driverLicenseExpiry: data.driver_license_expiry,
        address: data.address,
        notes: data.notes,
        status: data.status,
        registrationDate: data.registration_date,
        numberOfBookings: data.number_of_bookings || 0,
        lastBookingDate: data.last_booking_date
      };
    } catch (error) {
      console.error('Error in updateCustomer:', error);
      throw error;
    }
  },

  async deleteCustomer(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting customer:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error in deleteCustomer:', error);
      throw error;
    }
  },

  async searchCustomers(searchTerm: string): Promise<Customer[]> {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .or(`full_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,phone.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error searching customers:', error);
        throw error;
      }

      // Transform snake_case to camelCase
      return (data || []).map(customer => ({
        id: customer.id,
        fullName: customer.full_name,
        email: customer.email,
        phone: customer.phone,
        dateOfBirth: customer.date_of_birth,
        nationalId: customer.national_id,
        driverLicenseNumber: customer.driver_license_number,
        driverLicenseExpiry: customer.driver_license_expiry,
        address: customer.address,
        notes: customer.notes,
        status: customer.status,
        registrationDate: customer.registration_date,
        numberOfBookings: customer.number_of_bookings || 0,
        lastBookingDate: customer.last_booking_date
      }));
    } catch (error) {
      console.error('Error in searchCustomers:', error);
      throw error;
    }
  },

  async filterCustomersByStatus(status: string): Promise<Customer[]> {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('status', status)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error filtering customers by status:', error);
        throw error;
      }

      // Transform snake_case to camelCase
      return (data || []).map(customer => ({
        id: customer.id,
        fullName: customer.full_name,
        email: customer.email,
        phone: customer.phone,
        dateOfBirth: customer.date_of_birth,
        nationalId: customer.national_id,
        driverLicenseNumber: customer.driver_license_number,
        driverLicenseExpiry: customer.driver_license_expiry,
        address: customer.address,
        notes: customer.notes,
        status: customer.status,
        registrationDate: customer.registration_date,
        numberOfBookings: customer.number_of_bookings || 0,
        lastBookingDate: customer.last_booking_date
      }));
    } catch (error) {
      console.error('Error in filterCustomersByStatus:', error);
      throw error;
    }
  },

  async findCustomerByEmail(email: string): Promise<Customer | null> {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned
          return null;
        }
        console.error('Error finding customer by email:', error);
        throw error;
      }

      if (!data) return null;

      // Transform snake_case to camelCase
      return {
        id: data.id,
        fullName: data.full_name,
        email: data.email,
        phone: data.phone,
        dateOfBirth: data.date_of_birth,
        nationalId: data.national_id,
        driverLicenseNumber: data.driver_license_number,
        driverLicenseExpiry: data.driver_license_expiry,
        address: data.address,
        notes: data.notes,
        status: data.status,
        registrationDate: data.registration_date,
        numberOfBookings: data.number_of_bookings || 0,
        lastBookingDate: data.last_booking_date
      };
    } catch (error) {
      console.error('Error in findCustomerByEmail:', error);
      throw error;
    }
  },

  async findCustomerByNationalId(nationalId: string): Promise<Customer | null> {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('national_id', nationalId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned
          return null;
        }
        console.error('Error finding customer by national ID:', error);
        throw error;
      }

      if (!data) return null;

      // Transform snake_case to camelCase
      return {
        id: data.id,
        fullName: data.full_name,
        email: data.email,
        phone: data.phone,
        dateOfBirth: data.date_of_birth,
        nationalId: data.national_id,
        driverLicenseNumber: data.driver_license_number,
        driverLicenseExpiry: data.driver_license_expiry,
        address: data.address,
        notes: data.notes,
        status: data.status,
        registrationDate: data.registration_date,
        numberOfBookings: data.number_of_bookings || 0,
        lastBookingDate: data.last_booking_date
      };
    } catch (error) {
      console.error('Error in findCustomerByNationalId:', error);
      throw error;
    }
  },

  async findCustomerByPhone(phone: string): Promise<Customer | null> {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('phone', phone)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned
          return null;
        }
        console.error('Error finding customer by phone:', error);
        throw error;
      }

      if (!data) return null;

      // Transform snake_case to camelCase
      return {
        id: data.id,
        fullName: data.full_name,
        email: data.email,
        phone: data.phone,
        dateOfBirth: data.date_of_birth,
        nationalId: data.national_id,
        driverLicenseNumber: data.driver_license_number,
        driverLicenseExpiry: data.driver_license_expiry,
        address: data.address,
        notes: data.notes,
        status: data.status,
        registrationDate: data.registration_date,
        numberOfBookings: data.number_of_bookings || 0,
        lastBookingDate: data.last_booking_date
      };
    } catch (error) {
      console.error('Error in findCustomerByPhone:', error);
      throw error;
    }
  }
}; 