import React from "react";
import { NavLink } from "react-router";

const login = () => {
  return (
    <div>
      <div className="hero my-20 ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Register now!</h1>
          </div>
          <div className="card bg-[#cc7272] w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body  rounded-2xl">
              <form onSubmit={""}>
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
  );
};

export default login;
