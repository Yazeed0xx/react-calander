// EventWithTime.js
import React from "react";
import moment from "moment";

const EventWithTime = ({ event }) => {
  return (
    <span>
      <strong>{event.title}</strong> {/* Format the start time as HH:mm */}
      <span>
        {moment(event.start).format("HH:mm")} -{" "}
        {moment(event.end).format("HH:mm")}
      </span>
    </span>
  );
};

export default EventWithTime;
