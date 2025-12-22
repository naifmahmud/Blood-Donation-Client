
import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CreateRequest = () => {

    const {user,userStatus}=use(AuthContext);
    const axiosSecure= useAxiosSecure();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [bloodGroup, setBloodGroup] = useState("");
  const [recipientdistrict, setDistrict] = useState("");
  const [recipientupazila, setUpazila] = useState("");

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


  
  
  const handleRegister = async (e) => {
    e.preventDefault();
    
    if(userStatus==='blocked') return toast.warning("your account is blocked ");

    const requester_name = user.displayName;
    const requester_email = user.email;
    const recipientName= e.target.recipient.value;
    const hospital_name= e.target.hospital.value;
    const address= e.target.address.value;
    const donation_date= e.target.date.value;
    const donation_time= e.target.time.value;
    const request_message= e.target.details.value;

    const formData = {
      requester_name,
      requester_email,
      recipientName,
      hospital_name,
      address,
      bloodgroup: bloodGroup,
      recipient_district:recipientdistrict,
      recipient_upazila:recipientupazila,
      donation_date,
      donation_time,
      request_message
    };

    await axiosSecure.post('/requests',formData)
    .then(result=>{
        console.log({success:true,result})        
    })
    .catch(err=>{
        toast.error(err.message)
    })

    e.target.reset();
}

  return (
    <div className="max-w-5xl mx-auto my-12 px-4">
  <div className="rounded-3xl shadow-2xl overflow-hidden bg-linear-to-br from-red-500 via-red-600 to-rose-600">

    {/* Header */}
    <div className="px-8 py-6 text-center text-white border-b border-white/30">
      <h1 className="text-3xl font-bold">
        🩸 Blood Donation Request
      </h1>
      <p className="text-sm text-white/90 mt-1">
        Submit accurate details to get help faster
      </p>
    </div>

    {/* Form Body */}
    <div className="bg-white/95 backdrop-blur p-8 md:p-10">
      <form onSubmit={handleRegister} className="space-y-6">

        {/* Requester Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="label">Requester Name</label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100"
              defaultValue={user.displayName}
              disabled
            />
          </div>

          <div>
            <label className="label">Requester Email</label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100"
              defaultValue={user.email}
              disabled
            />
          </div>
        </div>

        {/* Recipient Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="label">Recipient Name</label>
            <input
              type="text"
              name="recipient"
              className="input input-bordered w-full"
              placeholder="Recipient Name"
              required
            />
          </div>

          <div>
            <label className="label">Hospital Name</label>
            <input
              type="text"
              name="hospital"
              className="input input-bordered w-full"
              placeholder="Hospital Name"
              required
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="label">Full Address</label>
          <input
            type="text"
            name="address"
            className="input input-bordered w-full"
            placeholder="Full Address"
            required
          />
        </div>

        {/* Location & Blood */}
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="label">Blood Group</label>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select</option>
              {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(bg=>(
                <option key={bg}>{bg}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">District</label>
            <select
              className="select select-bordered w-full"
              value={recipientdistrict}
              onChange={(e) => setDistrict(e.target.value)}
              required
            >
              <option value="">Select</option>
              {districts.map(dist => (
                <option key={dist.id} value={dist.name}>
                  {dist.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Upazila</label>
            <select
              className="select select-bordered w-full"
              value={recipientupazila}
              onChange={(e) => setUpazila(e.target.value)}
              required
            >
              <option value="">Select</option>
              {upazilas.map(up => (
                <option key={up.id} value={up.name}>
                  {up.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="label">Donation Date</label>
            <input
              type="date"
              name="date"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">Donation Time</label>
            <input
              type="time"
              name="time"
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        {/* Details */}
        <div>
          <label className="label">Requester Details</label>
          <textarea
            name="details"
            rows={4}
            className="textarea textarea-bordered w-full"
            placeholder="Explain why blood is needed urgently"
            required
          ></textarea>
        </div>

        {/* Submit */}
        <button className="btn w-full bg-linear-to-br from-red-200 via-red-500 to-rose-600 text-white hover:opacity-90">
          🚑 Submit Request
        </button>
      </form>
    </div>
  </div>
</div>

  );
};

export default CreateRequest;
