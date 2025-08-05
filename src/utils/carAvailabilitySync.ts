import { bookingService } from '../services/bookingService';

/**
 * Utility functions for managing car availability synchronization
 */
export const carAvailabilitySync = {
  /**
   * Sync all car availability based on current bookings
   * This ensures that car availability status matches their booking status
   */
  async syncAllCars(): Promise<void> {
    try {
      console.log('Starting car availability sync...');
      await bookingService.syncAllCarAvailability();
      console.log('Car availability sync completed successfully');
    } catch (error) {
      console.error('Error during car availability sync:', error);
      throw error;
    }
  },

  /**
   * Check and update availability for a specific car
   * @param carId - The ID of the car to check
   */
  async syncCar(carId: string): Promise<void> {
    try {
      console.log(`Syncing car availability for car ID: ${carId}`);
      await bookingService.checkAndUpdateCarAvailability(carId);
      console.log(`Car availability sync completed for car ID: ${carId}`);
    } catch (error) {
      console.error(`Error syncing car availability for car ID ${carId}:`, error);
      throw error;
    }
  },

  /**
   * Get cars that are currently booked (not available)
   */
  async getBookedCars(): Promise<string[]> {
    try {
      const allBookings = await bookingService.getAllBookings();
      const activeBookings = allBookings.filter(
        booking => booking.status === 'Pending' || booking.status === 'Active'
      );
      return [...new Set(activeBookings.map(booking => booking.carId))];
    } catch (error) {
      console.error('Error getting booked cars:', error);
      throw error;
    }
  },

  /**
   * Get cars that are currently available
   */
  async getAvailableCars(): Promise<string[]> {
    try {
      const { carService } = await import('../services/carService');
      const allCars = await carService.getAllCars();
      const bookedCarIds = await this.getBookedCars();
      
      return allCars
        .filter(car => !bookedCarIds.includes(car.id))
        .map(car => car.id);
    } catch (error) {
      console.error('Error getting available cars:', error);
      throw error;
    }
  }
}; 