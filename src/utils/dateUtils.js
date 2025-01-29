export const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const dayNames = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

export const getWeekDates = (date, days) => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());

  return days.map((_, index) => {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + index);
    return {
      date: currentDate.getDate(),
      month: currentDate.getMonth(),
      year: currentDate.getFullYear(),
      fullDate: currentDate
    };
  });
};

export const formatDateToYYYYMMDD = (date) => {
  return date.toISOString().split('T')[0];
};

const timeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

export const isTimeSlotAvailable = (dateStr, timeSlot, availabilities) => {
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