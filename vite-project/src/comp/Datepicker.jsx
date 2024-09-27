import React, { useEffect, useState } from "react";
import { Calendar, globalizeLocalizer } from "react-big-calendar";
import globalize from "globalize";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import axios from "axios";

const localizer = globalizeLocalizer(globalize);

export default function Datepicker() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    person: "",
    second: "",
    title: "",
    start: new Date(),
    end: new Date(),
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/info");
      const formattedEvents = response.data.map((event) => ({
        person: event.person,
        title: event.title,
        second: event.second,
        start: new Date(event.start),
        end: new Date(event.end),
        allDay: false,
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/info",
        newEvent
      );

      const formattedEvent = {
        person: response.data.person,
        title: response.data.title,
        second: response.data.second,
        start: new Date(response.data.start),
        end: new Date(response.data.end),
        allDay: false,
      };

      setEvents((prevEvents) => [...prevEvents, formattedEvent]);
      setNewEvent({
        person: "",
        second: "",
        title: "",
        start: new Date(),
        end: new Date(),
      });
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const Event = ({ event }) => (
    <div className="w-auto h-auto">
      <strong>المنظم: {event.person}</strong> <p>المدعوين: {event.second}</p>
      <strong>العنوان : {event.title}</strong>
    </div>
  );

  return (
    <div className="p-4   bg-[#D4E6E8] ">
      <h1 className="text-xl text-center font-bold mb-4">
        جدول اجتماعات اعضاء تهيئه
      </h1>

      <form className="mb-4 flex    " onSubmit={handleSubmit}>
        <div className="mb-2 ">
          <label>منظم الاجتماع</label>
          <input
            type="text"
            name="person"
            value={newEvent.person}
            onChange={handleInputChange}
            className="border p-2"
            required
          />
        </div>
        <div className="mb-2">
          <label>المدعوون:</label>
          <input
            type="text"
            name="second"
            value={newEvent.second}
            onChange={handleInputChange}
            className="border p-2"
            required
          />
        </div>
        <div className="mb-2">
          <label>عنوان الاجتماع</label>
          <input
            type="text"
            name="title"
            value={newEvent.title}
            onChange={handleInputChange}
            className="border p-2"
            required
          />
        </div>
        <div className="mb-2">
          <label>بداية الاجتماع</label>
          <input
            type="datetime-local"
            name="start"
            value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
            onChange={(e) =>
              setNewEvent({ ...newEvent, start: new Date(e.target.value) })
            }
            className="border p-2"
            required
          />
        </div>
        <div className="mb-2">
          <label>نهاية الاجتماع</label>
          <input
            type="datetime-local"
            name="end"
            value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
            onChange={(e) =>
              setNewEvent({ ...newEvent, end: new Date(e.target.value) })
            }
            className="border p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#40A37F] mt-5 ml-36 flex items-center justify-center h-12 w-32 px-4 py-2 rounded-lg text-white font-semibold shadow-lg hover:bg-[#368C6B] transition-all duration-300 ease-in-out hover:shadow-xl active:scale-95"
        >
          Add Event
        </button>
      </form>

      <div className="mb-4">
        <Calendar
          events={events.map((event) => ({
            person: event.person,
            second: event.second,
            title: event.title,
            start: event.start,
            end: event.end,
          }))}
          step={30}
          timeslots={2}
          localizer={localizer}
          popup
          showAllEvents={true}
          style={{ height: "100vh", backgroundColor: "white" }}
          components={{
            event: Event,
          }}
        />
      </div>
    </div>
  );
}
