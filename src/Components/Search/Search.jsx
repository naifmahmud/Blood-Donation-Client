import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const Search = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const axiosInstance = useAxios();

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

  const handleSearch = async (e) => {
    e.preventDefault();

    const formData = {
      bloodGroup,
      district,
      upazila,
    };
    console.log(formData);

    axiosInstance
      .get("/search", {
        params: {
          bloodGroup,
          district,
          upazila,
        },
      })
      .then((res) => console.log(res.data));

    e.target.reset();
  };

  return (
    <div className="card bg-red-400 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body  rounded-2xl">
        <form onSubmit={handleSearch}>
          {/* Blood */}
          <fieldset className="fieldset">
            <legend className="label">Blood Group</legend>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="select"
              required
            >
              <option value="">Select a Blood Group</option>
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
              className="select"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
            >
              <option value="">Select a District</option>
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
              className="select"
              value={upazila}
              onChange={(e) => setUpazila(e.target.value)}
              required
            >
              <option value="">Select a Upazila</option>
              {upazilas.map((upazil) => {
                return (
                  <option key={upazil.id} value={upazil.name}>
                    {upazil.name}
                  </option>
                );
              })}
            </select>
          </fieldset>
          <button className="btn">Search</button>
        </form>
      </div>
    </div>
  );
};

export default Search;
