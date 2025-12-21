import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import SearchRequest from "./SearchRequest";

const Search = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [bloodRequest, setBloodRequest] = useState([]);
  const [hasSearch,setHasSearch]=useState(false);
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

    setHasSearch(true);
    axiosInstance
      .get("/search", {
        params: {
          bloodGroup,
          district,
          upazila,
        },
      })
      .then((res) => setBloodRequest(res.data));

    e.target.reset();
  };


  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-5">Find Donor Requests</h1>
      <div className="card bg-red-400 w-full md:w-2xl mx-auto shrink-0 shadow-2xl my-10">
        <div className="card-body rounded-2xl flex justify-center md:items-center">
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row  md:items-end gap-4 p-2"
          >
            {/* Blood */}
            <fieldset className="fieldset">
              <legend className="label">Blood Group</legend>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="select w-full"
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
                className="select w-full"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                
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
                className="select w-full"
                value={upazila}
                onChange={(e) => setUpazila(e.target.value)}
                
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

            <fieldset className="">
              <button className="btn w-full">Search</button>
            </fieldset>
          </form>
        </div>
      </div>

      {
        hasSearch && <div >
        <h1 className="text-2xl font-bold text-center my-10">Blood Requests Found 🔍"<span className="text-xl font-semibold text-red-500">{bloodRequest.length}</span>"</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
          
          {bloodRequest.map((req) =><SearchRequest req={req} key={req._id}></SearchRequest>)}
        </div>
      </div>
        
      }
    </div>
  );
};

export default Search;
