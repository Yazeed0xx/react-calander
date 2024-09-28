import React from "react";

export default function Modal({ show, event, onClose, onDelete }) {
  if (!show || !event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
        <p>
          <strong>المنظم:</strong> {event.person}
        </p>
        <p>
          <strong>المدعوون:</strong> {event.second}
        </p>
        <p>
          <strong>بداية ااجتماع:</strong> {event.start.toLocaleString()}
        </p>
        <p>
          <strong>نهاية الاجتماع:</strong> {event.end.toLocaleString()}
        </p>

        <div className="mt-4 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg"
          >
            اغلاق
          </button>

          {/* Delete button */}
          <button
            onClick={() => onDelete(event._id)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            حذف الاجتماع{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
