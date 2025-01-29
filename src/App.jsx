import React, { useState, useEffect } from 'react';
import DateColumn from './components/DateColumn';
import { monthNames, dayNames, getWeekDates } from './utils/dateUtils';
import { availabilities } from './data/availabilities';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Configure the interval in minutes (15, 30, 45, or 60)
  const interval = 30; // You can change this to 15, 30, 45, or 60
  
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(prev => new Date(prev));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  const handleTimeSlotClick = (dateObj, time) => {
    const dayName = dayNames[dateObj.fullDate.getDay()];
    const formattedDate = `${dayName}, ${dateObj.date} ${monthNames[dateObj.month]} ${dateObj.year}`;
    const message = `Selected: ${formattedDate} at ${time}`;
    setSelectedSlot(message);
  };

  const weekDates = getWeekDates(currentDate, days);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getDateRangeString = () => {
    const firstDate = weekDates[0].date;
    const lastDate = weekDates[6].date;
    const month = monthNames[weekDates[0].month];
    const year = weekDates[0].year;
    
    if (weekDates[0].month !== weekDates[6].month) {
      return `${firstDate} ${monthNames[weekDates[0].month]} - ${lastDate} ${monthNames[weekDates[6].month]} ${year}`;
    }
    
    return `${firstDate}-${lastDate} ${month} ${year}`;
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-center p-4">
        <button 
          onClick={() => navigateWeek(-1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          aria-label="Previous Week"
        >
          Previous Week
        </button>
        <div className="text-center">
          <h2 className="text-xl font-bold">
            {getDateRangeString()}
          </h2>
          {selectedSlot && (
            <p className="text-sm text-gray-600 mt-1">{selectedSlot}</p>
          )}
        </div>
        <button 
          onClick={() => navigateWeek(1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          aria-label="Next Week"
        >
          Next Week
        </button>
      </div>

      <div className="flex" role="row">
        <div className="w-20" role="columnheader"></div>
        {weekDates.map((dateObj, index) => (
          <div 
            key={index} 
            className="flex-1 text-center p-2 border-b"
            role="columnheader"
          >
            {days[index]} {dateObj.date}
          </div>
        ))}
      </div>

      <div className="flex flex-1">
        <div className="w-20 border-r" role="rowheader">
          {timeSlots.map(time => (
            <div 
              key={time} 
              className="h-6 flex items-center justify-center text-sm border-b"
            >
              {time}
            </div>
          ))}
        </div>

        <div className="flex-1 grid grid-cols-7 overflow-auto" role="grid">
          {weekDates.map((dateObj, index) => (
            <DateColumn
              key={index}
              dateObj={dateObj}
              timeSlots={timeSlots}
              isDisabled={dateObj.fullDate < today}
              onTimeSlotClick={handleTimeSlotClick}
              availabilities={availabilities}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;