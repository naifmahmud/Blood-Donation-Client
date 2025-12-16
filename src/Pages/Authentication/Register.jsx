import React, { use, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../Contexts/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { updateProfile } from "firebase/auth";
import axios from "axios";

const Register = () => {

  // const [districts,setDistricts]=useState([]);
  
  // useEffect(()=>{
  //   fetch('/districts.json')
  // .then(res=> res.json())
  // .then(data=> {
  //   const result= data[2].data;
  //   setDistricts(result)
  // })
  // },[districts])
  // console.log(districts);
  
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

    // console.log(bloodGroup);

    
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
        <div className="card bg-[#cc7272] w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body  rounded-2xl">
            <form onSubmit={handleRegister}>
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="input"
                  placeholder="Name"
                  required
                />

                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                  required
                />

                <label className="label">Photo</label>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">select a Photo</legend>
                  <input type="file" className="file-input" name="photo" />
                </fieldset>

                {/* Blood */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Blood Group</legend>
                  <select value={bloodGroup} 
                  onChange={(e)=>setBloodGroup(e.target.value)}
                  className="select"
                  required
                  >
                    <option disabled={true}>Select a Blood Group</option>
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
                  <legend className="fieldset-legend">District</legend>
                  <select  
                  className="select"
                  value={district} 
                  onChange={(e)=>setDistrict(e.target.value)}
                  >
                    <option disabled={true}>Select a District</option>
                    <option>Dhaka</option>
                  </select>
                </fieldset>

                {/* Upazillas */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Upazila</legend>
                  <select  
                  className="select"
                  value={upazila}
                  onChange={(e)=>setUpazila(e.target.value)}>
                    <option disabled={true}>Select a Upazila</option>
                    <option>Khilkhet</option>
                  </select>
                </fieldset>

                <label className="label">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    className="input"
                    placeholder="Password"
                    required
                  />
                  <p
                    onClick={() => {
                      setShowPass(!showPass);
                    }}
                    className="absolute right-6 top-4 "
                  >
                    {showPass ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                  </p>
                </div>

                <label className="label">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPass ? "text" : "password"}
                    name="confirmPassword"
                    className="input"
                    placeholder="Confirm Password"
                    required
                  />
                  <p
                    onClick={() => {
                      setShowConfirmPass(!showConfirmPass);
                    }}
                    className="absolute right-6 top-4 "
                  >
                    {showConfirmPass ? <FaEyeSlash></FaEyeSlash> : <FaEye />}
                  </p>
                </div>

                <div>
                  <a className="label link link-hover">Forgot password?</a>
                </div>
                <button className="btn mt-4">Register</button>
              </fieldset>
            </form>
            <div className="flex justify-around items-center">
              <p className="label font-bold">Have an account login!</p>
              <NavLink className="btn" to="/login">
                Login
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
