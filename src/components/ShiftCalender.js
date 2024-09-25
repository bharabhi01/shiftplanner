import React from "react";
import Calendar from "react-calendar";


const ShiftCalender = ({ shiftData }) => {
  const getWeekNumber = (date) => {
    const firstDay = new Date(date.getFullYear(), 0, 1);
    const dayOfYear = (date - firstDay + 86400000) / 86400000;
    return Math.ceil(dayOfYear / 7);
  };

  const renderShiftOnCalender = ({ date, view }) => {
    if (view === "month") {
      const weekNumber = getWeekNumber(date);
      const shift = shiftData.find((item) => item.shifts.includes(weekNumber));

      if (shift) {
        return (
          <div>
            <strong>{shift.name}</strong>
            <br />
            <em>Backup: {shift.backupName}</em>
          </div>
        );
      }
    }
  };

  return <Calendar tileContent={renderShiftOnCalender} calendarType="US" />;
};

export default ShiftCalender;
