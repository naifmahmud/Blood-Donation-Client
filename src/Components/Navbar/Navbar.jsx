import React, { use } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);
  const links = (
    <>
      
      <li>
        <NavLink to="/search">Search</NavLink>
      </li>
      {user && (
                <li>
                  <NavLink className={({isActive})=>isActive?'text-red-500':'font-semibold'} to="/funding">Funding</NavLink>
                </li>
              )}
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
        <ul className="menu menu-horizontal px-1">
          <li>
        <NavLink className={({isActive})=>isActive?'text-red-500':'font-semibold'} to="/bloodRequests">Blood Requests</NavLink>
      </li>
      {user && (
                <li>
                  <NavLink className={({isActive})=>isActive?'text-red-500':'font-semibold'} to="/funding">Funding</NavLink>
                </li>
              )}
        </ul>
      </div>
      {/* <div className="navbar-end"> */}
      <div className="navbar-end mr-5">
        {user ? (
          <div className="dropdown relative">
            <div
              tabIndex={0}
              role="button"
              className="btn-ghost cursor-pointer"
            >
              <img
                src={user.photoURL}
                className="w-14 h-14 rounded-2xl"
                alt=""
              />
            </div>
            <ul
              tabIndex="-1"
              className="absolute right-2 menu menu-sm dropdown-content bg-[#ffe0d2] opacity-80 text-right rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {user && (
                <li>
                  <NavLink className={({isActive})=>isActive?'text-red-500':'font-semibold'} to="/dashboard">Dashboard</NavLink>
                </li>
              )}
              
              <li className="font-semibold">
                <button onClick={handleLogOut}>LogOut</button>
              </li>
            </ul>
          </div>
        ) : (
          <NavLink to="/login" className="btn bg-linear-to-br from-red-200 via-red-500 to-rose-600 text-white">
            Login
          </NavLink>
        )}
      </div>
    </div>

    /* {user ? (
          <button className="btn" onClick={handleLogOut}>
            LogOut
          </button>
        ) : (
          <NavLink className="btn" to="/login">
            Login
          </NavLink>
        )} */
  );
};

export default Navbar;
