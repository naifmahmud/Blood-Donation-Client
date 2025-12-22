import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyDonationRequests = () => {
  const [request, setRequest] = useState([]);
  const [totalRequest, setTotalRequest] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [status,setStatus]=useState("all");
  const axiosSecure = useAxiosSecure();


  useEffect(() => {
    axiosSecure
      .get(`/allRequests?&status=${status}`)
      .then((res) => {
        setRequest(res.data);
        setTotalRequest(res.data);
      });
  }, [axiosSecure,status]);

  console.log(request);

const numberOfPages =
  totalRequest && itemsPerPage
    ? Math.ceil(totalRequest / itemsPerPage)
    : 0;

const pages = numberOfPages
  ? [...Array(numberOfPages).keys()].map((page) => page + 1)
  : [];

  console.log(pages);
  

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Filter Section */}
<div className="flex justify-between items-center mb-4">
  <h2 className="text-lg font-bold text-gray-700">
    My Donation Requests
  </h2>

  <select
    value={status}
    onChange={(e) => {
      setStatus(e.target.value);
      setCurrentPage(1); // reset page on filter change
    }}
    className="select select-bordered select-sm max-w-xs"
  >
    <option value="all">All Status</option>
    <option value="pending">Pending</option>
    <option value="inprogress">In Progress</option>
    <option value="done">Done</option>
    <option value="canceled">Canceled</option>
  </select>
</div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* Head */}
          <thead className="bg-red-100 text-red-600">
            <tr>
              <th>#</th>
              <th>Recipient</th>
              <th>Location</th>
              <th>Date & Time</th>
              <th>Blood</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {request.map((req, index) => (
              <tr key={req._id} className="hover">
                {/* Index */}
                <td className="font-semibold">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>

                {/* Recipient */}
                <td>
                  <p className="font-semibold text-gray-800">
                    {req.recipientName}
                  </p>
                </td>

                {/* Location */}
                <td>
                  <p className="font-medium">{req.recipient_district}</p>
                  <p className="text-sm text-gray-500">
                    {req.recipient_upazila}
                  </p>
                </td>

                {/* Date & Time */}
                <td>
                  <p>{req.donation_date}</p>
                  <p className="text-sm text-gray-500">{req.donation_time}</p>
                </td>

                {/* Blood Group */}
                <td>
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 font-semibold text-sm">
                    {req.bloodgroup}
                  </span>
                </td>

                {/* Actions */}
                <td className="flex gap-2 justify-center">
                  <button className="btn btn-sm btn-outline btn-info">
                    ✏️ Edit
                  </button>
                  <button className="btn btn-sm btn-outline btn-error">
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default MyDonationRequests;
