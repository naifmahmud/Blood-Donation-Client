
import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import useAxios from "../../../hooks/useAxios";
import { toast } from "react-toastify";

const CreateRequest = () => {
    const {user}=use(AuthContext);

    const axiosInstance=useAxios();
    

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

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

  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const requester_name = user.displayName;
    const requester_email = user.email;
    const recipientName= e.target.recipient.value;
    const hospital_name= e.target.hospital.value;
    const address= e.target.address.value;

    const formData = {
      requester_name,
      requester_email,
      recipientName,
      hospital_name,
      address,
      bloodgroup: bloodGroup,
      district,
      upazila,
    };

    axiosInstance.post('/requests',formData)
    .then(result=>{
        console.log({success:true,result})        
    })
    .catch(err=>{
        toast.error(err.message)
    })

    e.target.reset();
}

  return (
    <div className="card bg-[#cc7272] shrink-0 shadow-2xl mx-auto my-10 w-2xl">
      <div className="card-body rounded-2xl ">
        <form onSubmit={handleRegister}>
          <fieldset className="fieldset">
            <label className="label">Recipient Name</label>
            <input
              type="text"
              name="recipient"
              className="input w-full"
              placeholder="Recipient Name"
              required
            />
             <label className="label">Hospital Name</label>
            <input
              type="text"
              name="hospital"
              className="input w-full"
              placeholder="Hospital Name"
              required
            />
            <label className="label">Full Address</label>
            <input
              type="text"
              name="address"
              className="input w-full"
              placeholder="Full Address"
              required
            />

            {/* Blood */}
            <fieldset className="fieldset">
              <legend className="label">Blood Group</legend>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="select w-full"
                required
              >
                <option value={''}>Select a Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </fieldset>

            {/* Districts */}
            <fieldset className="fieldset">
              <legend className="label">District</legend>
              <select
                className="select w-full"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
              >
                <option value={''}>Select a District</option>
                {districts.map((dist) => {
                  return (
                    <option key={dist.id} value={dist.name}>
                      {dist.name}
                    </option>
                  );
                })}
              </select>
            </fieldset>

            {/* Upazillas */}
            <fieldset className="fieldset">
              <legend className="label">Upazila</legend>
              <select
                className="select w-full"
                value={upazila}
                onChange={(e) => setUpazila(e.target.value)}
                required
              >
                <option value={''}>Select a Upazila</option>
                {upazilas.map((upazil) => {
                  return (
                    <option key={upazil.id} value={upazil.name}>
                      {upazil.name}
                    </option>
                  );
                })}
              </select>

            </fieldset>

            <textarea name="details" rows={5} cols={10} className="bg-white rounded-xl p-2" placeholder="Write why you need blood" required></textarea>

            <button className="btn mt-4">Request</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default CreateRequest;
