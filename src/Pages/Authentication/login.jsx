import { use, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { NavLink } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext';
import { toast } from 'react-toastify';


const Login = () => {

   const [showPass,setShowPass] = useState(false);

   const {signInWithEmail}= use(AuthContext);


const handleLogin=(e)=>{
  e.preventDefault();

  const email= e.target.email.value;
  const password= e.target.password.value;

  console.log(email,password);

  signInWithEmail(email,password)
  .then(result=>{
    console.log(result)    
  })
  .catch(err=>{
    toast.error(err.message)
  })
  

}
    return (
        <div>
            <div>
      <div className="hero my-20 ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Register now!</h1>
          </div>
          <div className="card bg-[#cc7272] w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body  rounded-2xl">
              <form onSubmit={handleLogin}>
                <fieldset className="fieldset">
                  
                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input"
                    placeholder="Email"
                    required
                  />

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


                  <button className="btn mt-4">Login</button>
                </fieldset>
              </form>
              <div className="flex justify-around items-center">
              <p className="label font-bold">New here</p>
              <NavLink className="btn" to="/register">
                Register
              </NavLink>
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