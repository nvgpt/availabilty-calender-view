# Calendar Scheduling System

A modern, responsive scheduling interface built with React and Tailwind CSS that provides enterprise-level scheduling capabilities.

## Features

- 📅 Flexible time slot intervals (15/30/45/60 minutes)
- 🔄 Real-time availability management
- 📱 Responsive weekly view with intuitive navigation
- ⏰ Visual indicators for current time and occupied slots
- ♿ Accessibility-focused implementation
- 🎯 Hover states and interactive elements

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

## Data Format

### Availability Data

The system expects availability data in the following JSON format:

```json
{
  "availabilities": [
    {
      "availability_date": "2024-12-08",        // Date in YYYY-MM-DD format
      "availability_start_time": "06:30:00",     // Start time in HH:mm:ss format
      "availability_end_time": "07:00:00"        // End time in HH:mm:ss format
    }
  ]
}
```

#### Requirements:
- `availability_date`: Must be a valid date string in YYYY-MM-DD format
- `availability_start_time`: Must be a valid time string in HH:mm:ss format
- `availability_end_time`: Must be a valid time string in HH:mm:ss format and greater than start_time

Example of multiple availabilities:
```json
{
  "availabilities": [
    {
      "availability_date": "2024-12-08",
      "availability_start_time": "06:30:00",
      "availability_end_time": "07:00:00"
    },
    {
      "availability_date": "2024-12-08",
      "availability_start_time": "09:00:00",
      "availability_end_time": "09:30:00"
    }
  ]
}
```

### Time Slot Configuration

The system supports different time slot intervals:
- 15 minutes (96 slots per day)
- 30 minutes (48 slots per day)
- 45 minutes (32 slots per day)
- 60 minutes (24 slots per day)

To configure the time slot interval, modify the `interval` variable in `App.jsx`:

```javascript
const interval = 15; // Can be 15, 30, 45, or 60
```

## Component Structure

```
App
├── DateColumn (×7 days)
│   └── TimeSlot (dynamic based on interval)
│       ├── Availability Indicator
│       ├── Current Time Marker
│       └── Hover State
```

## Key Functions

### Time Slot Generation
```javascript
const timeSlots = (() => {
  const slots = [];
  const totalMinutesInDay = 24 * 60;
  const slotsCount = totalMinutesInDay / interval;
  
  for (let i = 0; i < slotsCount; i++) {
    const totalMinutes = i * interval;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    slots.push(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`);
  }
  
  return slots;
})();
```

### Availability Checking
```javascript
const isTimeSlotAvailable = (dateStr, timeSlot, availabilities) => {
  return availabilities.some(slot => {
    if (slot.availability_date !== dateStr) {
      return false;
    }

    const slotMinutes = timeToMinutes(timeSlot);
    const startMinutes = timeToMinutes(slot.availability_start_time.substring(0, 5));
    const endMinutes = timeToMinutes(slot.availability_end_time.substring(0, 5));

    return slotMinutes >= startMinutes && slotMinutes <= endMinutes;
  });
};
```
## Source code
The source code is in src folder and it also has the package.json file in it.

## Styling

The project uses Tailwind CSS for styling. Key classes:
- Grid layout: `grid grid-cols-7`
- Time slot styling: `border-b h-6 transition-colors`
- Hover states: `hover:bg-blue-50`
- Occupied slots: `bg-blue-600`

## Accessibility

The calendar implements ARIA attributes for better accessibility:
- Role attributes for semantic structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader friendly time slot information

## Browser Support

Supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
