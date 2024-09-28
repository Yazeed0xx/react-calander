import React, { useEffect, useState } from "react";
import { Calendar, globalizeLocalizer } from "react-big-calendar";
import globalize from "globalize";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import axios from "axios";
import Modal from "./Model";

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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
        _id: event._id,
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
        _id: response.data._id,
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

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/api/info/${eventId}`);
      setEvents(events.filter((event) => event._id !== eventId));
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  return (
    <div className="p-4 bg-[#D4E6E8]">
      <h1 className="text-xl text-center w-full font-bold ">
        جدول اجتماعات اعضاء تهيئه
      </h1>

      <form className="mb-4 flex gap-3 max-md:w-20" onSubmit={handleSubmit}>
        <div>
          <label>منظم الاجتماع</label>
          <input
            type="text"
            name="person"
            value={newEvent.person}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label>المدعوون:</label>
          <input
            type="text"
            name="second"
            value={newEvent.second}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label>عنوان الاجتماع</label>
          <input
            type="text"
            name="title"
            value={newEvent.title}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label>بداية الاجتماع</label>
          <input
            type="datetime-local"
            name="start"
            value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
            onChange={(e) =>
              setNewEvent({ ...newEvent, start: new Date(e.target.value) })
            }
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label>نهاية الاجتماع</label>
          <input
            type="datetime-local"
            name="end"
            value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
            onChange={(e) =>
              setNewEvent({ ...newEvent, end: new Date(e.target.value) })
            }
            className="border p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#40A37F] mt-5 h-12 w-36 px-4 py-2 rounded-lg text-white font-semibold shadow-lg hover:bg-[#368C6B] transition-all duration-300 ease-in-out hover:shadow-xl active:scale-95"
        >
          Add Event
        </button>
      </form>

      <div className="mb-4">
        <Calendar
          events={events}
          step={30}
          timeslots={2}
          localizer={localizer}
          popup
          style={{ height: "100vh", backgroundColor: "white" }}
          onSelectEvent={handleEventSelect}
        />
      </div>

      <Modal
        show={showModal}
        event={selectedEvent}
        onClose={() => setShowModal(false)}
        onDelete={handleDelete}
      />
    </div>
  );
}
