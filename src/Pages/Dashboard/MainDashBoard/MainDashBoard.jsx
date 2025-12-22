import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { FaUsers, FaHandHoldingHeart, FaTint } from "react-icons/fa";
import { toast } from "react-toastify";


const MainDashBoard = () => {
  const { user,role } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
 
  const [stats,setStats]=useState({
    totalUsers:0,
    totalFunding:0,
    totalRequests:0,
  })

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/myRequests/recent/${user.email}`)

      .then((res) => setRequests(res.data.result));
  }, [axiosSecure, user.email]);

  useEffect(()=>{
    axiosSecure.get("/dashboard/stats").then(res=>
    setStats(res.data)
    )
  },[axiosSecure])

  // console.log(stats);
  const handleDelete = (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this request?"
  );

  if (!confirmDelete) return;

  axiosSecure
    .delete(`/myRequests/${id}`)
    .then(() => {
      setRequests((prev) => prev.filter((req) => req._id !== id));
      alert("Request deleted successfully");
    })
    .catch((err) => {
      console.error(err);
      toast.success("Failed to delete request");
    });
};

  

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

        
        { 
        role === 'donor' &&
          <div>
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

                        <button onClick={()=>{handleDelete(req._id)}} className="btn btn-xs btn-outline btn-error">
                          Delete
                        </button>

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
        }
        {
         role === 'admin' &&
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      
      {/* Total Donors */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition">
        <div className="p-4 rounded-full bg-red-100 text-red-500 text-3xl">
          <FaUsers />
        </div>
        <div>
          <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
          <p className="text-gray-500 font-medium">Total Donors</p>
        </div>
      </div>

      {/* Total Funding */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition">
        <div className="p-4 rounded-full bg-green-100 text-green-600 text-3xl">
          <FaHandHoldingHeart />
        </div>
        <div>
          <h3 className="text-2xl font-bold">
            ৳ {stats.totalFunding.toLocaleString()}
          </h3>
          <p className="text-gray-500 font-medium">Total Funding</p>
        </div>
      </div>

      {/* Total Blood Requests */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition">
        <div className="p-4 rounded-full bg-red-200 text-red-700 text-3xl">
          <FaTint />
        </div>
        <div>
          <h3 className="text-2xl font-bold">{stats.totalRequests}</h3>
          <p className="text-gray-500 font-medium">
            Blood Donation Requests
          </p>
        </div>
      </div>

    </div>
        }
      </div>
    </div>
  );
};

export default MainDashBoard;
