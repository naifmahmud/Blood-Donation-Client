import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { user,role } = useContext(AuthContext);
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
    console.log(editData)
    


    axiosSecure.patch("/update/user/profile", editData)
    .then(res=>
        console.log(res.data)
    )
    
  };

  return (
    <div className="lg:w-2xl bg-linear-to-r from-red-300 via-red-400 to-red-500 mx-auto rounded-3xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/20 backdrop-blur border-b border-white/30">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Profile Information
          </h2>
          <p className="text-xs text-white/80">Update your {role} details</p>
        </div>

        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className="btn btn-sm bg-white text-red-500 hover:bg-red-500 hover:text-white"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      {/* Body */}
      <div className="card-body bg-linear-to-r from-red-250 via-red-400 to-red-600 rounded-t-3xl">
        <form onSubmit={handleEditProfile}>
          <div className="form-control">
            <label className="label">Name</label>
            <br />
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName}
              disabled={!isEditing}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">Email</label>
            <br />
            <input
              type="email"
              defaultValue={user?.email}
              disabled
              className="input input-bordered bg-gray-100 cursor-not-allowed w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">Profile Photo</label>
            <br />
            <input
              type="file"
              name="photo"
              disabled={!isEditing}
              className="file-input file-input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">Blood Group</label>
            <br />
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              disabled={!isEditing}
              className="select select-bordered w-full"
              
            >
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg}>{bg}</option>
              ))}
            </select>
          </div>

          {/* District */}
          <div className="form-control">
            <label className="label">District</label>
            <br />
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

          <div className="form-control">
            <label className="label">Upazila</label>
            <br />
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

          {isEditing && (
            <button className="btn btn-primary w-full mt-6">
              Save Changes
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
