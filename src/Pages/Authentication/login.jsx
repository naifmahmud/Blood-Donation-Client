import { use, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [showPass, setShowPass] = useState(false);

  const { signInWithEmail } = use(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmail(email, password)
      .then((result) => {
        console.log(result);
        navigate(location.state || "/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div>
      <div>
        <div className="hero my-20 ">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center">
              <h1 className="text-5xl font-bold">Login now!</h1>
            </div>
            <div className="min-h-screen flex items-center justify-center px-4">
              <div className="w-full max-w-4xl grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl">
                {/* Left Side – Branding */}
                <div className="hidden md:flex flex-col justify-center items-center bg-linear-to-br from-red-500 via-red-600 to-rose-600 p-10 text-white">
                  <h2 className="text-4xl font-bold mb-3">Welcome Back</h2>
                  <p className="text-white/90 text-center">
                    Login to continue saving lives as a blood donor
                  </p>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2966/2966484.png"
                    alt="login"
                    className="w-36 mt-8 opacity-90"
                  />
                </div>

                {/* Right Side – Login Form */}
                <div className="bg-white p-8 md:p-10">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Login to Your Account
                  </h3>

                  <form onSubmit={handleLogin} className="space-y-5">
                    {/* Email */}
                    <div>
                      <label className="label">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="input input-bordered w-full"
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <label className="label">Password</label>
                      <div className="relative">
                        <input
                          type={showPass ? "text" : "password"}
                          name="password"
                          className="input input-bordered w-full pr-12"
                          placeholder="Enter your password"
                          required
                        />
                        <span
                          onClick={() => setShowPass(!showPass)}
                          className="absolute right-4 top-3 cursor-pointer text-gray-500 hover:text-red-500"
                        >
                          {showPass ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </div>

                    {/* Forgot password */}
                    <div className="text-right">
                      <a className="text-sm text-red-500 hover:underline cursor-pointer">
                        Forgot password?
                      </a>
                    </div>

                    {/* Submit */}
                    <button className="btn w-full bg-linear-to-br from-red-200 via-red-500 to-rose-600 text-white hover:opacity-90">
                      Login
                    </button>
                  </form>

                  {/* Footer */}
                  <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">New here?</p>
                    <NavLink
                      to="/register"
                      className="text-red-500 font-semibold hover:underline"
                    >
                      Create an account
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
