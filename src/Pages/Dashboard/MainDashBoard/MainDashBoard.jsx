import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
const MainDashBoard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);

  console.log(user);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/myRequests/recent/${user.email}`)

      .then((res) => setRequests(res.data.result));
  }, [axiosSecure, user.email]);

  console.log(requests);

  return (
    <div>
      <div className="p-6">
        {/* Welcome Section */}
        <div className="bg-linear-to-r from-red-500 to-rose-600 text-white rounded-2xl p-6 shadow-lg">
          <h1 className="text-2xl font-bold">
            Welcome, {user?.displayName} 👋
          </h1>
          <p className="text-sm opacity-90">Thank you for being a lifesaver</p>
        </div>

        {/* Recent Requests */}
        {requests.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-semibold mb-4">
              My Recent Donation Requests
            </h2>

            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead className="bg-red-100">
                  <tr>
                    <th>Recipient</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Blood</th>
                    <th>Status</th>
                    <th>Donor Info</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {requests.map((req) => (
                    <tr key={req._id}>
                      <td>{req.recipientName}</td>
                      <td className="text-xs">
                        {req.recipient_district}, {req.recipient_upazila}
                      </td>
                      <td className="text-xs">{req.donation_date}</td>
                      <td>{req.donation_time}</td>
                      <td className="font-bold text-red-600">
                        {req.bloodgroup}
                      </td>

                      {/* Status */}
                      <td>
                        <span
                          className={`badge ${
                            req.donation_status === "pending"
                              ? "badge-warning"
                              : req.donation_status === "inprogress"
                              ? "badge-info"
                              : req.donation_status === "done"
                              ? "badge-success"
                              : "badge-error"
                          }`}
                        >
                          {req.donation_status}
                        </span>

                        {/* Done / Cancel buttons */}
                        {req.donation_status === "inprogress" && (
                          <div className="flex gap-2 mt-2">
                            <button className="btn btn-xs btn-success">
                              Done
                            </button>
                            <button className="btn btn-xs btn-error">
                              Cancel
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Donor Info */}
                      <td>
                        {req.donation_status === "inprogress" ? (
                          <div className="text-xs">
                            <p>{req.requester_name}</p>
                            <p>{req.requester_email}</p>
                          </div>
                        ) : (
                          "-"
                        )}
                      </td>

                      {/* Actions */}
                      <td className="flex gap-1">
                        <Link
                          to={`/dashboard/edit-request/${req._id}`}
                          className="btn btn-xs btn-outline"
                        >
                          Edit
                        </Link>

                        <button className="btn btn-xs btn-outline btn-error">
                          Delete
                        </button>

                        <Link
                          to={`/dashboard/request-details/${req._id}`}
                          className="btn btn-xs btn-outline btn-info"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* View All */}
            <div className="text-center mt-6">
              <Link
                to="/dashboard/myDonationRequests"
                className="btn btn-error"
              >
                View My All Requests
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainDashBoard;
