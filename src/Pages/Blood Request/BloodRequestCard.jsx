import React from 'react';

const BloodRequestCard = ({req}) => {
       
            
  const { recipientName, bloodgroup, 
donation_date, donation_time,address } = req;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-5 border border-red-100">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {recipientName}
        </h2>
        <span className="px-3 py-1 rounded-full text-sm font-bold bg-red-100 text-red-600">
          {bloodgroup}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-2 text-gray-600">
        <p>
          📍 <span className="font-medium">Location:</span> {address}
        </p>
        <p>
          📅 <span className="font-medium">Date:</span> {donation_date}
        </p>
        <p>
          ⏰ <span className="font-medium">Time:</span> {donation_time}
        </p>
      </div>

      {/* Action */}
      <div className="mt-5">
        <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-xl transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default BloodRequestCard;