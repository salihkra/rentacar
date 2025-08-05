import { supabase } from '../supabase/supabase';
import { Location } from '../types';

export interface CreateLocationData {
  name: string;
  address: string;
  city: string;
  phone: string;
  workingHours: string;
  status: 'Active' | 'Inactive';
  email?: string;
  manager?: string;
  capacity?: number;
}

export interface UpdateLocationData extends CreateLocationData {
  id: string;
}

export const locationService = {
  // Get all locations
  async getAllLocations(): Promise<Location[]> {
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching locations:', error);
        throw error;
      }

      // Transform snake_case to camelCase
      return (data || []).map(location => ({
        id: location.id,
        name: location.name,
        address: location.address,
        city: location.city,
        phone: location.phone,
        workingHours: location.working_hours,
        status: location.status,
        email: location.email,
        manager: location.manager,
        capacity: location.capacity,
        createdAt: location.created_at,
        updatedAt: location.updated_at
      }));
    } catch (error) {
      console.error('Error in getAllLocations:', error);
      throw error;
    }
  },

  // Get location by ID
  async getLocationById(id: string): Promise<Location | null> {
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching location:', error);
        throw error;
      }

      if (!data) return null;

      // Transform snake_case to camelCase
      return {
        id: data.id,
        name: data.name,
        address: data.address,
        city: data.city,
        phone: data.phone,
        workingHours: data.working_hours,
        status: data.status,
        email: data.email,
        manager: data.manager,
        capacity: data.capacity,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
    } catch (error) {
      console.error('Error in getLocationById:', error);
      throw error;
    }
  },

  // Create new location
  async createLocation(locationData: CreateLocationData): Promise<Location> {
    try {
      const { data, error } = await supabase
        .from('locations')
        .insert([{
          name: locationData.name,
          address: locationData.address,
          city: locationData.city,
          phone: locationData.phone,
          working_hours: locationData.workingHours,
          status: locationData.status,
          email: locationData.email,
          manager: locationData.manager,
          capacity: locationData.capacity
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating location:', error);
        throw error;
      }

      // Transform snake_case to camelCase
      return {
        id: data.id,
        name: data.name,
        address: data.address,
        city: data.city,
        phone: data.phone,
        workingHours: data.working_hours,
        status: data.status,
        email: data.email,
        manager: data.manager,
        capacity: data.capacity,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
    } catch (error) {
      console.error('Error in createLocation:', error);
      throw error;
    }
  },

  // Update location
  async updateLocation(locationData: UpdateLocationData): Promise<Location> {
    try {
      const { data, error } = await supabase
        .from('locations')
        .update({
          name: locationData.name,
          address: locationData.address,
          city: locationData.city,
          phone: locationData.phone,
          working_hours: locationData.workingHours,
          status: locationData.status,
          email: locationData.email,
          manager: locationData.manager,
          capacity: locationData.capacity
        })
        .eq('id', locationData.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating location:', error);
        throw error;
      }

      // Transform snake_case to camelCase
      return {
        id: data.id,
        name: data.name,
        address: data.address,
        city: data.city,
        phone: data.phone,
        workingHours: data.working_hours,
        status: data.status,
        email: data.email,
        manager: data.manager,
        capacity: data.capacity,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
    } catch (error) {
      console.error('Error in updateLocation:', error);
      throw error;
    }
  },

  // Delete location
  async deleteLocation(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('locations')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting location:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error in deleteLocation:', error);
      throw error;
    }
  },

  // Search locations
  async searchLocations(query: string): Promise<Location[]> {
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .or(`name.ilike.%${query}%,city.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error searching locations:', error);
        throw error;
      }

      // Transform snake_case to camelCase
      return (data || []).map(location => ({
        id: location.id,
        name: location.name,
        address: location.address,
        city: location.city,
        phone: location.phone,
        workingHours: location.working_hours,
        status: location.status,
        email: location.email,
        manager: location.manager,
        capacity: location.capacity,
        createdAt: location.created_at,
        updatedAt: location.updated_at
      }));
    } catch (error) {
      console.error('Error in searchLocations:', error);
      throw error;
    }
  },

  // Filter locations by status
  async filterLocationsByStatus(status: 'Active' | 'Inactive'): Promise<Location[]> {
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('status', status)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error filtering locations by status:', error);
        throw error;
      }

      // Transform snake_case to camelCase
      return (data || []).map(location => ({
        id: location.id,
        name: location.name,
        address: location.address,
        city: location.city,
        phone: location.phone,
        workingHours: location.working_hours,
        status: location.status,
        email: location.email,
        manager: location.manager,
        capacity: location.capacity,
        createdAt: location.created_at,
        updatedAt: location.updated_at
      }));
    } catch (error) {
      console.error('Error in filterLocationsByStatus:', error);
      throw error;
    }
  },

  // Filter locations by city
  async filterLocationsByCity(city: string): Promise<Location[]> {
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('city', city)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error filtering locations by city:', error);
        throw error;
      }

      // Transform snake_case to camelCase
      return (data || []).map(location => ({
        id: location.id,
        name: location.name,
        address: location.address,
        city: location.city,
        phone: location.phone,
        workingHours: location.working_hours,
        status: location.status,
        email: location.email,
        manager: location.manager,
        capacity: location.capacity,
        createdAt: location.created_at,
        updatedAt: location.updated_at
      }));
    } catch (error) {
      console.error('Error in filterLocationsByCity:', error);
      throw error;
    }
  }
}; 