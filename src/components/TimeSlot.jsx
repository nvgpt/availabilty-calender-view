import React from 'react';
const TimeSlot = ({ time, onClick, isDisabled, isAvailable, dateStr }) => {
  const formattedTime = time.padStart(5, '0');
  const isCurrentTimeSlot = () => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    return dateStr === today && time === currentTime;
  };
  return (
    <div 
    onClick={isDisabled ? undefined : onClick}
    className="relative border-bottom h-6 transition-colors relative border-b h-6 transition-colors group hover:bg-blue-50 cursor-pointer"
    style={{
      backgroundColor: isAvailable ? '#fff' : '#4ab9ea',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      height:'24px',
    }}  >
    {isCurrentTimeSlot() && (
      <div className="position-absolute start-0 w-100 d-flex align-items-center">
        <div style={{'height': '0.125rem', 'width': '100%', 'background-color': '#ef4444'}}></div>
         <Clock className="position-absolute end-0 text-danger" style="width: 1rem; height: 1rem;" /> 
      </div>
    )}
    <div className="opacity-0 group-hover:opacity-100 absolute z-10 bg-gray-800 text-white text-xs rounded px-2 py-1 left-1/2 transform -translate-x-1/2 -translate-y-8"
      >
    {formattedTime}
    </div>
</div>
  )
};
export default TimeSlot;