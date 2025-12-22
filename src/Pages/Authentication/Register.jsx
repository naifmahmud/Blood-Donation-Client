import React, { use, useEffect, useState } from "react";
import {NavLink, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../Contexts/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { updateProfile } from "firebase/auth";
import axios from "axios";

const Register = () => {

  const [districts,setDistricts]=useState([]);
  const [upazilas,setUpazilas]=useState([]);
  
  useEffect(()=>{
    fetch('/districts.json')
  .then(res=> res.json())
  .then(data=> {
    const result= data[2].data;
    setDistricts(result)
  })
  },[])

  useEffect(()=>{
    fetch('/upazilas.json')
    .then(res=> res.json())
    .then(data=> {
      const result= data[2].data;
      setUpazilas(result);
    })
  },[])
  
  const { createUserWithEmail, setUser } = use(AuthContext);

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [bloodGroup,setBloodGroup]= useState('');
  const [district,setDistrict]= useState('');
  const [upazila,setUpazila]= useState('');

  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  const handleRegister = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo;
    const file = photo.files[0];
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    
    if (password !== confirmPassword) {
      return toast.error("Password not matched❌");
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return toast.error(
        "Must include uppercase, lowercase, and be ≥ 6 characters"
      );
    }

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

    const formData = {
      name,
      email,
      password,
      photo_URL,
      bloodgroup:bloodGroup,
      district,
      upazila
    };

    createUserWithEmail(email, password)
      .then((result) => {
        const currenUser = result.user;
        console.log(result);

        updateProfile(currenUser, {
          displayName: name,
          photoURL: photo_URL,
        }).then(() => {
          setUser(result.user);
          axios
            .post("http://localhost:5000/users", formData)
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err.message);
            });
        });
        navigate("/");
      })

      .catch((error) => {
        toast.error(error.message);
      });

    e.target.reset();
  };

  return (
    <div className="hero my-20 ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Register now!</h1>
        </div>
        <div className="min-h-screen flex items-center justify-center px-4">
  <div className="w-full max-w-4xl grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl">

    {/* Left Side – Branding */}
    <div className="hidden md:flex flex-col justify-center items-center bg-linear-to-br from-red-500 via-red-600 to-rose-600 p-10 text-white">
      <h2 className="text-4xl font-bold mb-4">Become a Donor</h2>
      <p className="text-white/90 text-center leading-relaxed">
        Your blood donation can save lives.  
        Join our trusted donor community today.
      </p>
      <img
        src="https://cdn-icons-png.flaticon.com/512/2966/2966484.png"
        alt="donor"
        className="w-40 mt-8 opacity-90"
      />
    </div>

    {/* Right Side – Form */}
    <div className="bg-white p-8 md:p-10">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Create Account
      </h3>

      <form onSubmit={handleRegister} className="space-y-4">

        {/* Name */}
        <div>
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            className="input input-bordered w-full"
            placeholder="Your name"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input input-bordered w-full"
            placeholder="Your email"
            required
          />
        </div>

        {/* Photo */}
        <div>
          <label className="label">Profile Photo</label>
          <input type="file" className="file-input file-input-bordered w-full" name="photo" />
        </div>

        {/* Blood Group */}
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

        {/* District */}
        <div>
          <label className="label">District</label>
          <select
            className="select select-bordered w-full"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            required
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
        <div>
          <label className="label">Upazila</label>
          <select
            className="select select-bordered w-full"
            value={upazila}
            onChange={(e) => setUpazila(e.target.value)}
            required
          >
            <option value="">Select Upazila</option>
            {upazilas.map(up => (
              <option key={up.id} value={up.name}>
                {up.name}
              </option>
            ))}
          </select>
        </div>

        {/* Password */}
        <div>
          <label className="label">Password</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              className="input input-bordered w-full pr-12"
              placeholder="Password"
              required
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-3 cursor-pointer text-gray-500"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="label">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPass ? "text" : "password"}
              name="confirmPassword"
              className="input input-bordered w-full pr-12"
              placeholder="Confirm password"
              required
            />
            <span
              onClick={() => setShowConfirmPass(!showConfirmPass)}
              className="absolute right-4 top-3 cursor-pointer text-gray-500"
            >
              {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* Submit */}
        <button className="btn w-full bg-linear-to-br from-red-200 via-red-500 to-rose-600 text-white hover:opacity-90 mt-4">
          Register
        </button>
      </form>

      {/* Footer */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Already have an account?
        </p>
        <NavLink to="/login" className="text-red-500 font-semibold hover:underline">
          Login here
        </NavLink>
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default Register;
