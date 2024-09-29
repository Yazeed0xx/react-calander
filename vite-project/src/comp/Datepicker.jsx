import React, { useEffect, useState } from "react";
import { Calendar, globalizeLocalizer } from "react-big-calendar";
import globalize from "globalize";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import axios from "axios";
import FormModal from "./Eventmodal";
import Modal from "./Model"; // For event deletion
import EventWithTime from "./EventWithTime"; // Import the custom event component

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
  const [showModal, setShowModal] = useState(false); // For showing event details modal
  const [showFormModal, setShowFormModal] = useState(false); // For showing form modal

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
      setShowFormModal(false); // Close form modal after submitting
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  return (
    <div className="p-4 bg-[#D4E6E8]">
      <h1 className="text-xl text-center w-full font-bold">
        جدول اجتماعات اعضاء تهيئه
      </h1>

      <button
        className="bg-[#40A37F] mt-5 h-12 w-36 px-4 py-2 rounded-lg text-white font-semibold shadow-lg hover:bg-[#368C6B] transition-all duration-300 ease-in-out hover:shadow-xl active:scale-95"
        onClick={() => setShowFormModal(true)}
      >
        Add New Event
      </button>

      <div className="mb-4">
        <Calendar
          events={events}
          step={30}
          timeslots={2}
          localizer={localizer}
          popup
          style={{ height: "100vh", backgroundColor: "white" }}
          onSelectEvent={handleEventSelect}
          components={{
            event: EventWithTime, // Use custom event component
          }}
        />
      </div>

      <FormModal
        show={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSubmit={handleSubmit}
        newEvent={newEvent}
        handleInputChange={handleInputChange}
        setNewEvent={setNewEvent}
      />

      <Modal
        show={showModal}
        event={selectedEvent}
        onClose={() => setShowModal(false)}
        // onDelete={handleDelete}
      />
    </div>
  );
}
