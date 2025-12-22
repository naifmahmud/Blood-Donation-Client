import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const EditRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    recipientName: "",
    recipient_district: "",
    recipient_upazila: "",
    donation_date: "",
    donation_time: "",
    bloodgroup: "",
  });

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => {
        const result = data[2].data;
        setDistricts(result);
      });
  }, []);

  useEffect(() => {
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => {
        const result = data[2].data;
        setUpazilas(result);
      });
  }, []);

  useEffect(() => {
    axiosSecure.get(`/myRequests/${id}`).then((res) => {
      setFormData(res.data);
    });
  }, [axiosSecure, id]);

  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    axiosSecure.patch(`/myRequests/${id}`, formData).then(() => {
      toast.success("Request updated successfully!");
      navigate("/dashboard/myDonationRequests");
    });
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Donation Request</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Recipient Name"
          />

          <div>
            <label className="label">District</label>
            <select
              className="select select-bordered w-full"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
            >
              <option value="">Select District</option>
              {districts.map((dist) => (
                <option key={dist.id} value={dist.name}>
                  {dist.name}
                </option>
              ))}
            </select>
          </div>

          {/* Upazila */}
          <div>
            <label className="label">Upazila</label>
            <select
              className="select select-bordered w-full"
              value={upazila}
              onChange={(e) => setUpazila(e.target.value)}
              required
            >
              <option value="">Select Upazila</option>
              {upazilas.map((up) => (
                <option key={up.id} value={up.name}>
                  {up.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="date"
            name="donation_date"
            value={formData.donation_date}
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          <input
            type="time"
            name="donation_time"
            value={formData.donation_time}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
<div>
          <label className="label">Blood Group</label>
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Blood Group</option>
            {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(bg => (
              <option key={bg}>{bg}</option>
            ))}
          </select>
        </div>

          <button type="submit" className="btn btn-error w-full">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRequest;
