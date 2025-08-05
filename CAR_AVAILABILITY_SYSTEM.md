# Car Availability Management System

## Overview

The car availability management system automatically updates the availability status of vehicles in the fleet based on their booking status. When a vehicle appears in a booking, it is automatically marked as "not available" (full) in the fleet section.

## How It Works

### Automatic Updates

1. **When a booking is created:**
   - The car is automatically marked as unavailable (`available: false`)
   - This prevents double-booking of the same vehicle

2. **When a booking is updated:**
   - If the car changes, the old car becomes available and the new car becomes unavailable
   - If the booking status changes to "Cancelled" or "Completed", the car becomes available again
   - If the booking status is "Pending" or "Active", the car remains unavailable

3. **When a booking is deleted:**
   - The car automatically becomes available again

### Status Logic

- **Available Cars:** `available: true` - Can be booked
- **Unavailable Cars:** `available: false` - Currently booked or out of service

### Booking Status Impact

- **Pending/Active:** Car is unavailable
- **Completed/Cancelled:** Car becomes available

## Implementation Details

### Modified Files

1. **`src/services/bookingService.ts`**
   - Added `updateCarAvailability()` helper function
   - Added `checkAndUpdateCarAvailability()` function
   - Added `syncAllCarAvailability()` function
   - Modified `createBooking()`, `updateBooking()`, and `deleteBooking()` methods

2. **`src/services/carService.ts`**
   - Added `getUnavailableCars()` method
   - Enhanced existing `getAvailableCars()` method

3. **`src/utils/carAvailabilitySync.ts`**
   - Utility functions for manual synchronization
   - Helper functions for getting booked/available cars

### Key Functions

#### `updateCarAvailability(carId: string, isBooked: boolean)`
Updates a car's availability status based on booking status.

#### `checkAndUpdateCarAvailability(carId: string)`
Checks if a car has active bookings and updates its availability accordingly.

#### `syncAllCarAvailability()`
Synchronizes all cars' availability status based on current bookings.

## Usage Examples

### Automatic Updates (No Action Required)
The system works automatically. When you:
- Create a booking → Car becomes unavailable
- Update a booking → Car availability updates based on status
- Delete a booking → Car becomes available

### Manual Synchronization
```typescript
import { carAvailabilitySync } from '../utils/carAvailabilitySync';

// Sync all cars
await carAvailabilitySync.syncAllCars();

// Sync specific car
await carAvailabilitySync.syncCar('car-id-here');

// Get booked cars
const bookedCars = await carAvailabilitySync.getBookedCars();

// Get available cars
const availableCars = await carAvailabilitySync.getAvailableCars();
```

### Fleet Management
```typescript
import { carService } from '../services/carService';

// Get all available cars
const availableCars = await carService.getAvailableCars();

// Get all unavailable cars
const unavailableCars = await carService.getUnavailableCars();

// Get all cars
const allCars = await carService.getAllCars();
```

## Benefits

1. **Prevents Double-Booking:** Cars automatically become unavailable when booked
2. **Real-Time Updates:** Fleet status updates immediately when bookings change
3. **Data Consistency:** Ensures booking data and fleet availability are always in sync
4. **Automatic Recovery:** Cars become available again when bookings are cancelled or completed
5. **Manual Override:** Utility functions allow manual synchronization when needed

## Error Handling

- Car availability updates are non-blocking (don't break booking operations)
- Errors are logged but don't prevent booking creation/updates
- Manual sync functions can be used to fix any inconsistencies

## Maintenance

### Regular Sync (Recommended)
Run a full sync periodically to ensure data consistency:
```typescript
// Run this daily or weekly
await carAvailabilitySync.syncAllCars();
```

### Monitoring
Check for inconsistencies:
```typescript
const bookedCars = await carAvailabilitySync.getBookedCars();
const availableCars = await carAvailabilitySync.getAvailableCars();
console.log(`Booked: ${bookedCars.length}, Available: ${availableCars.length}`);
```

## Database Schema

The system relies on the `available` boolean field in the `cars` table:
- `true` = Available for booking
- `false` = Not available (booked or out of service)

This field is automatically managed by the booking service and should not be manually modified unless necessary. 