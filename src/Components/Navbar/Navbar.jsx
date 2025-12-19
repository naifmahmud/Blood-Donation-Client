import React, { use } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);
  const links = (
    <>
      
      <li>
        <NavLink to="/bloodRequests">Blood Requests</NavLink>
      </li>
      <li>
        <NavLink to="/search">Search</NavLink>
      </li>
      <li>
        <NavLink to="/funding">Funding</NavLink>
      </li>
      {
        user && <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      }
    </>
  );

  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        toast.warning("User Logged Out");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        <NavLink to="/">
          {" "}
          <a className="btn text-2xl font-bold">
            <p>
              Blood<span className="text-red-500">Bank</span>BD
            </p>
          </a>
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <button className="btn" onClick={handleLogOut}>
            LogOut
          </button>
        ) : (
          <NavLink className="btn" to="/login">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
