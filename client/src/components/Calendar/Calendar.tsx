import React, { useState } from 'react';

function Calendar() {
  const [calendars, setCalendars] = useState([]);

  const fetchCalendar = () => {
    fetch('/api/calendar')
      .then((res) => res.json())
      .then((calendars) => setCalendars(calendars));
  };

  return (
    <div>
      <div>
        {calendars &&
          calendars.map(({ title, settings, events }) => (
            <div>
              <h3>title: {title}</h3>
              <h3>settings: {JSON.stringify(settings)}</h3>
              <h3>events: {JSON.stringify(events)}</h3>
            </div>
          ))}
      </div>
      <button onClick={fetchCalendar}>Fetch Calendar Data</button>
    </div>
  );
}

export default Calendar;
