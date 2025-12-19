import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Contexts/AuthContext";
import { NavLink } from "react-router";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);



  const fetchUsers=()=>{
     axiosSecure.get("/users")
    .then((res) => 
      setUsers(res.data));
    }

    useEffect(()=>{
        fetchUsers();
    },[axiosSecure])

  console.log(users);

  const handleStatus=(email,status)=>{

    axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
    .then(res=>{
        console.log(res.data);
        fetchUsers();
        
    })
  }

  return (
    <div>
      <div className="overflow-x-auto my-10 bg-[#8d8992] p-10 rounded-2xl">
        <h1 className="text-2xl font-bold text-[#085053] text-center">
          All Users
        </h1>
        <table className="table md:w-2xl lg:w-4xl rounded-2xl border-separate border-spacing-y-2">
          {/* head */}
          <thead>
            <tr>
              <th>Food Image & Name</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          {users.map((user) => (
            <tbody className="rounded-2xl border">
              <tr className="bg-[#b39d95] rounded-xl">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.photo_URL} alt={"User PHoto"} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-[#085053]">
                        {user.name}
                      </div>
                      <div className="font-semibold text-[#085053]">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-base font-semibold text-[#085053]">
                  {user.role}
                  <br />
                </td>
                <td className="text-base font-semibold text-[#085053]">
                  {user.user_status}
                  <br />
                </td>
                
                <th>
                
                   {
                    user?.user_status === 'active' ? (<button onClick={()=>{handleStatus(user?.email,'blocked')}} className="btn">Block</button>) : (<button onClick={()=>{handleStatus(user?.email,'active')}} className="btn">Active</button>)
                   }
                </th>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
