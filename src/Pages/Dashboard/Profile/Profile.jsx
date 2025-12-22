import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { user, role } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
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

  const handleEditProfile = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = user?.email || "";
    const photo = e.target.photo;
    const file = photo.files[0];

    // send photo to imbb
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_YOUR_CLIENT_API_KEY
      }`,
      { image: file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const photo_URL = response.data.data.display_url;

    const editData = {
      name,
      email,
      photo_URL,
      bloodgroup: bloodGroup,
      district,
      upazila,
    };
    console.log(editData);

    axiosSecure
      .patch("/update/user/profile", editData)
      .then((res) => console.log(res.data));
  };

  return (
    <div className="max-w-4xl mx-auto my-12 px-4">
      <div className="relative rounded-3xl shadow-2xl overflow-hidden bg-linear-to-br from-red-500 via-red-600 to-rose-600">
        {/* Header */}
        <div className="px-8 py-6 flex items-center justify-between text-white border-b border-white/20">
          <div>
            <h2 className="text-2xl font-bold">Profile Information</h2>
            <p className="text-sm text-white/90">
              Update your{" "}
              <span className="inline-flex items-center px-3 py-1 ml-1 rounded-full bg-white text-red-600 font-semibold text-xs shadow">
                {role}
              </span>{" "}
              details
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className={`px-5 py-2 rounded-full font-medium transition 
          ${
            isEditing
              ? "bg-white text-red-600 hover:bg-red-100"
              : "bg-white/20 hover:bg-white/30"
          }`}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>

        {/* Body */}
        <div className="bg-white/95 backdrop-blur-xl p-8 md:p-10">
          <form
            onSubmit={handleEditProfile}
            className="grid md:grid-cols-2 gap-6"
          >
            {/* Name */}
            <div>
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                defaultValue={user?.displayName}
                disabled={!isEditing}
                className={`input input-bordered w-full 
              ${!isEditing && "bg-gray-100 cursor-not-allowed"}`}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                defaultValue={user?.email}
                disabled
                className="input input-bordered w-full bg-gray-200 cursor-not-allowed"
              />
            </div>

            {/* Photo */}
            <div className="md:col-span-2">
              <label className="label">Profile Photo</label>
              <input
                type="file"
                name="photo"
                disabled={!isEditing}
                className={`file-input file-input-bordered w-full
              ${!isEditing && "opacity-60 cursor-not-allowed"}`}
              />
            </div>

            {/* Blood Group */}
            <div>
              <label className="label">Blood Group</label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                disabled={!isEditing}
                className="select select-bordered w-full"
              >
                <option value="">Select Blood Group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (bg) => (
                    <option key={bg}>{bg}</option>
                  )
                )}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="label">District</label>
              <select
                className="select select-bordered w-full"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                disabled={!isEditing}
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
            <div className="md:col-span-2">
              <label className="label">Upazila</label>
              <select
                className="select select-bordered w-full"
                value={upazila}
                onChange={(e) => setUpazila(e.target.value)}
                disabled={!isEditing}
              >
                <option value="">Select Upazila</option>
                {upazilas.map((up) => (
                  <option key={up.id} value={up.name}>
                    {up.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit */}
            {isEditing && (
              <div className="md:col-span-2">
                <button className="btn w-full bg-linear-to-br from-red-200 via-red-500 to-rose-600 text-white hover:opacity-90">
                  💾 Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
