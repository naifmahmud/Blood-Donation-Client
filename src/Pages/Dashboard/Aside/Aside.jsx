import React, { useContext } from "react";
import { NavLink } from "react-router";
import { MdDashboardCustomize } from "react-icons/md";
import { AuthContext } from "../../../Contexts/AuthContext";
import { toast } from "react-toastify";

const Aside = () => {
  const { signOutUser, role } = useContext(AuthContext);

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
    <aside className="w-64 min-h-screen bg-linear-to-b from-red-500 via-red-600 to-rose-700 text-white flex flex-col shadow-2xl">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/20">
        <h2 className="text-2xl font-extrabold tracking-wide">
          Blood<span className="text-black">Bank</span>BD
        </h2>
        <p className="text-xs text-white/70 mt-1">Save Lives Together</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-3">
          {/* Dashboard */}
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-xl transition
             ${
               isActive
                 ? "bg-white text-red-600 font-semibold shadow"
                 : "hover:bg-white/20"
             }`
              }
            >
              <MdDashboardCustomize className="text-lg" />
              Dashboard
            </NavLink>
          </li>

          {/* Profile */}
          <li>
            <NavLink
              to="profile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-xl transition
             ${
               isActive
                 ? "bg-white text-red-600 font-semibold shadow"
                 : "hover:bg-white/20"
             }`
              }
            >
              👤 Profile
            </NavLink>
          </li>

          {/* Donor Routes */}
          {role === "donor" && (
            <>
              <li>
                <NavLink
                  to="myDonationRequests"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-xl transition
                 ${
                   isActive
                     ? "bg-white text-red-600 font-semibold shadow"
                     : "hover:bg-white/20"
                 }`
                  }
                >
                  🩸 My Requests
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="createRequest"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-xl transition
                 ${
                   isActive
                     ? "bg-white text-red-600 font-semibold shadow"
                     : "hover:bg-white/20"
                 }`
                  }
                >
                  ➕ Create Request
                </NavLink>
              </li>
            </>
          )}


          {/* Admin Routes */}
          {role === "admin" && (
            <>
              <li>
                <NavLink
                  to="allUsers"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-xl transition
                 ${
                   isActive
                     ? "bg-white text-red-600 font-semibold shadow"
                     : "hover:bg-white/20"
                 }`
                  }
                >
                  👥 All Users
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="allBloodDontionRequest"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-xl transition
                 ${
                   isActive
                     ? "bg-white text-red-600 font-semibold shadow"
                     : "hover:bg-white/20"
                 }`
                  }
                >
                  📋 All Requests
                </NavLink>
              </li>
            </>
          )}


          {
            role=== "volunteer" &&
            <li>
                <NavLink
                  to="allBloodDontionRequest"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-xl transition
                 ${
                   isActive
                     ? "bg-white text-red-600 font-semibold shadow"
                     : "hover:bg-white/20"
                 }`
                  }
                >
                  📋 All Requests
                </NavLink>
              </li>
          }
        </ul>
      </nav>

      {/* Footer Actions */}
      <div className="px-4 py-4 border-t border-white/20 space-y-3">
        <NavLink
          to="/"
          className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-white text-red-600 font-semibold hover:bg-red-500 hover:text-white transition"
        >
          🏠 Home
        </NavLink>

        <button
          onClick={handleLogOut}
          className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-black/30 hover:bg-white hover:text-red-500 transition font-semibold"
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
};

export default Aside;
