import React from "react";
import moment from "moment";

const FormModal = ({
  show,
  onClose,
  onSubmit,
  newEvent,
  handleInputChange,
  setNewEvent,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label>Organizer</label>
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
            <label>Attendees</label>
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
            <label>Title</label>
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
            <label>Start Time</label>
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
            <label>End Time</label>
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
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Add Event
          </button>
        </form>
        <button className="mt-4 text-red-500" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default FormModal;
