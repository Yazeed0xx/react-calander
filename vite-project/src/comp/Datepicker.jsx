import React, { useEffect, useState } from "react";

import { Calendar, globalizeLocalizer } from "react-big-calendar";
import globalize from "globalize";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = globalizeLocalizer(globalize);

export default function Datepicker() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState([
    {
      person: "dd",
      second: "dddd",
      title: "ss",
      start: new Date(),
      end: new Date(),
    },
  ]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Calendar</h1>

      <form className="mb-4">
        <div className="mb-2">
          <label>Person:</label>
          <input type="text" className="border p-2" required />
        </div>
        <div className="mb-2">
          <label>Title:</label>
          <input type="text" className="border p-2" required />
        </div>
        <div className="mb-2">
          <label>Start Date:</label>
          <input type="datetime-local" className="border p-2" required />
        </div>
        <div className="mb-2">
          <label>End Date:</label>
          <input type="datetime-local" className="border p-2" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">
          Add Event
        </button>
      </form>

      <div className="mb-4">
        <Calendar
          events={newEvent}
          localizer={localizer}
          style={{ height: 900 }}
        />
      </div>
    </div>
  );
}
