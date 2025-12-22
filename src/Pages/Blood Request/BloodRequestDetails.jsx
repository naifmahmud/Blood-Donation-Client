import React, { useContext, useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { useParams } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext';

const BloodRequestDetails = () => {

    const {id}=useParams();
    const {user}=useContext(AuthContext);
    const [request,setRequest]=useState([]);
    const [openModal,setOpenModal]=useState(false);
    const axiosInstance=useAxios();


    useEffect(()=>{

    axiosInstance.get(`/allRequests/${id}`)
    .then(res=>setRequest(res.data.result))
    },[id,axiosInstance])


    const handleConfirmDonation=async()=>{
        const donationInfo={
            requester_name: user.displayName,
            requester_email: user.email
        }

        const res= await axiosInstance.patch(`/allRequests/${id}/donation`,donationInfo)
        if(res.data.success){
            setRequest({...request,donation_status:"inprogress"});
            setOpenModal(false);
        }
    }


    return (
        <div className="max-w-3xl mx-auto my-10 bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Blood Donation Request Details
      </h2>

      {/* Request Information */}
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <p><b>Recipient Name:</b> {request.recipientName}</p>
        <p><b>Blood Group:</b> {request.bloodgroup}</p>
        <p><b>Hospital:</b> {request.hospital_name}</p>
        <p><b>Address:</b> {request.address}</p>
        <p><b>District:</b> {request.recipient_district}</p>
        <p><b>Upazila:</b> {request.recipient_upazila}</p>
        <p><b>Date:</b> {request.donation_date}</p>
        <p><b>Time:</b> {request.donation_time}</p>
        <p className="md:col-span-2">
          <b>Details:</b> {request.request_message}
        </p>
        <p>
          <b>Status:</b>{" "}
          <span className="text-yellow-600 font-semibold">
            {request.donation_status}
          </span>
        </p>
      </div>

      {/* Donate Button */}
      {request.donation_status === "pending" && (
        <button
          onClick={() => setOpenModal(true)}
          className="btn btn-error w-full mt-6"
        >
          Donate Blood
        </button>
      )}

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4 text-red-600">
              Confirm Donation
            </h3>

            <div className="space-y-3">
              <div>
                <label className="label">Donor Name</label>
                <input
                  type="text"
                  value={user.displayName}
                  disabled
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">Donor Email</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpenModal(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDonation}
                className="btn btn-error"
              >
                Confirm Donation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    );
};

export default BloodRequestDetails;