import React, { useState } from "react";
import "./Calendar.css"; // styling ke liye

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  // current month
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear();

  // Days of week
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Dates array (1 - 30 just for demo)
  const dates = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="calendar-container">
      <h3>{currentMonth} {currentYear}</h3>
      <div className="calendar-grid">
        {days.map((day) => (
          <div key={day} className="day-header">{day}</div>
        ))}
        {dates.map((day) => (
          <div
            key={day}
            className={`date-cell ${selectedDate.getDate() === day ? "selected" : ""}`}
            onClick={() => handleDateClick(new Date(currentYear, new Date().getMonth(), day))}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
