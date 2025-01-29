import React from 'react';
import TimeSlot from './TimeSlot';
import { formatDateToYYYYMMDD, isTimeSlotAvailable } from '../utils/dateUtils';

const DateColumn = ({ dateObj, timeSlots, isDisabled, onTimeSlotClick, availabilities }) => {
  const dateStr = formatDateToYYYYMMDD(dateObj.fullDate);
 // console.log(dateObj.fullDate)
  return (
  <div
  className={`border d-grid`}
  style={{
    gridTemplateRows: 'repeat(24, 1fr)',
    backgroundColor: !isDisabled ? '' : '#e2e2e273',// Bootstrap's light gray
    opacity: !isDisabled ? '' : '0.6',
    color: !isDisabled ? '' : '#adb5bd', // Bootstrap's muted gray
    cursor: !isDisabled ? 'pointer' : 'not-allowed',
  }}
>
    {timeSlots.map(time => (
      <TimeSlot
        key={time}
        time={time}
        onClick={() => onTimeSlotClick(dateObj, time)}
        isDisabled={isDisabled}
        isAvailable={isTimeSlotAvailable(dateStr, time, availabilities)}
          dateStr={dateStr}
      />
    ))}
  </div>
);
};

export default DateColumn;