import React from "react";

const SearchRequest = ({ req }) => {
  const {
    bloodgroup,
    donation_date,
    donation_status,
    donation_time,
    hospital_name,
    recipientName,
    recipient_district,
    recipient_upazila,
    requester_email,
    request_message,
    requester_name,
  } = req;

  return (
    <div>
      <div className="max-w-md bg-red-50 hover:bg-red-100 rounded-2xl shadow-xl p-6 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-red-500 text-2xl">🩸</span>
            <h2 className="text-2xl font-bold text-red-500">{bloodgroup}</h2>
          </div>

          <span className="bg-gray-100 text-gray-700 text-sm px-4 py-1 rounded-full shadow">
            {donation_status}
          </span>
        </div>

        {/* Recipient */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-red-400">👤</span>
            <div>
              <p className="text-gray-500 text-sm">Recipient</p>
              <p className="font-semibold">{recipientName}</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3">
            <span className="text-red-400">📍</span>
            <div>
              <p className="text-gray-500 text-sm">Location</p>
              <p className="font-semibold">
                {recipient_district},{recipient_upazila}
              </p>
            </div>
          </div>

          {/* Hospital */}
          <div className="flex items-start gap-3">
            <span className="text-red-400">🏥</span>
            <div>
              <p className="text-gray-500 text-sm">Hospital</p>
              <p className="font-semibold">{hospital_name}</p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-red-400">📅</span>
              <span className="font-medium">{donation_date}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-400">⏰</span>
              <span className="font-medium">{donation_time}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 space-y-2 bg-gray-50 shadow-2xl rounded-xl p-4">
          <p className="text-sm text-gray-600">
            👤 Requested by:{" "}
            <span className="font-semibold">{requester_name}</span>
          </p>
          <p className="text-sm text-blue-600">✉ {requester_email}</p>
          <p className="text-sm italic text-gray-500">💬 {request_message}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchRequest;
