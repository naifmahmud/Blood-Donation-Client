import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { BsThreeDotsVertical } from "react-icons/bs";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axiosSecure.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
   fetchUsers();
  }, [axiosSecure]);

  const handleRole = async (email, role) => {
    await axiosSecure.patch(
      `/update/user/role?email=${email}&role=${role}`
    );
    fetchUsers();
  };


  const handleStatus = async (email, status) => {
    await axiosSecure.patch(
      `/update/user/status?email=${email}&status=${status}`
    );
    fetchUsers();
  };

  return (
    <div className="p-6">
      <div className="bg-base-100 shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center text-primary mb-6">
          All Users
        </h1>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-primary text-white">
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  {/* USER */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-10 rounded-full">
                          <img src={user.photo_URL} alt="User" />
                        </div>
                      </div>
                      <div>
                        <p className="font-bold">{user.name}</p>
                        <p className="text-sm text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* ROLE */}
                  <td>
                    <span className="badge badge-outline capitalize">
                      {user.role}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td>
                    <span
                      className={`badge capitalize ${
                        user.user_status === "active"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {user.user_status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="text-center">
                    <div className="dropdown dropdown-end">
                      <label tabIndex={0} className="btn btn-sm btn-ghost">
                        <BsThreeDotsVertical size={18} />
                      </label>

                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        {/* MAKE VOLUNTEER */}
                        {user.role === "donor" && (
                          <li>
                            <button
                              onClick={() =>
                                handleRole(user.email, "volunteer")
                              }
                            >
                              Make Volunteer
                            </button>
                          </li>
                        )}

                        {/* MAKE ADMIN */}
                        {user.role !== "admin" && (
                          <li>
                            <button
                              onClick={() =>
                                handleRole(user.email, "admin")
                              }
                            >
                              Make Admin
                            </button>
                          </li>
                        )}

                        <div className="divider my-1"></div>

                        {/* BLOCK / ACTIVATE */}
                        {user.user_status === "active" ? (
                          <li>
                            <button
                              onClick={() =>
                                handleStatus(user.email, "blocked")
                              }
                              className="text-error"
                            >
                              Block User
                            </button>
                          </li>
                        ) : (
                          <li>
                            <button
                              onClick={() =>
                                handleStatus(user.email, "active")
                              }
                              className="text-success"
                            >
                              Activate User
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <p className="text-center py-10 text-gray-400">
              No users found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
