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
      
      <div className="max-w-4xl mx-auto my-10 px-4">
  <div className="rounded-3xl shadow-2xl bg-linear-to-r from-red-400 via-red-500 to-rose-500 p-1">
    <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6">
      
      {/* Title */}
      <h2 className="text-center text-white text-xl font-semibold mb-6">
        Find Blood Donors
      </h2>

      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
      >
        {/* Blood Group */}
        <div className="form-control">
          <label className="label text-white font-medium">
            Blood Group
          </label>
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="select select-bordered w-full bg-white"
          >
            <option value="">Select Blood Group</option>
            {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(bg => (
              <option key={bg}>{bg}</option>
            ))}
          </select>
        </div>

        {/* District */}
        <div className="form-control">
          <label className="label text-white font-medium">
            District
          </label>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="select select-bordered w-full bg-white"
          >
            <option value="">Select District</option>
            {districts.map(dist => (
              <option key={dist.id} value={dist.name}>
                {dist.name}
              </option>
            ))}
          </select>
        </div>

        {/* Upazila */}
        <div className="form-control">
          <label className="label text-white font-medium">
            Upazila
          </label>
          <select
            value={upazila}
            onChange={(e) => setUpazila(e.target.value)}
            className="select select-bordered w-full bg-white"
          >
            <option value="">Select Upazila</option>
            {upazilas.map(up => (
              <option key={up.id} value={up.name}>
                {up.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <button className="btn bg-white text-red-600 hover:bg-red-600 hover:text-white w-full ">
          🔍 Search
        </button>
      </form>
    </div>
  </div>
</div>


      {
        hasSearch && <div >
        <h1 className="rounded-xl shadow-2xl bg-linear-to-r from-red-400 via-red-500 to-rose-500 p-2 text-white text-center w-2xs mx-auto">Blood Requests Found 🔍"<span className="text-xl font-semibold ">{bloodRequest.length}</span>"</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 my-10 mx-auto">
          
          {bloodRequest.map((req) =><SearchRequest req={req} key={req._id}></SearchRequest>)}
        </div>
      </div>
        
      }
    </div>
  );
};

export default Search;
