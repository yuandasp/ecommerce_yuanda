import axios from "axios";
import React, { useEffect, useState } from "react";
import { authToken } from "../helpers/constants";

function Users() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("authToken");

  const fetchUsers = async () => {
    let response = await axios.get(`http://localhost:8001/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(response.data);
  };

  const renderUsers = () => {
    return users.map((user) => {
      return (
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {user.name}
          </th>
          <td class="px-6 py-4">{user.email}</td>
          <td class="px-6 py-4">{user.username}</td>
          <td class="px-6 py-4">{user.isActive ? "Active" : "Not Active"}</td>
        </tr>
      );
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div class="relative overflow-x-auto border-2 border-solid w-3/4 mx-auto my-11">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Username
              </th>
              <th scope="col" class="px-6 py-3">
                IsActive
              </th>
            </tr>
          </thead>
          <tbody>{renderUsers()}</tbody>
        </table>
      </div>
    </>
  );
}

export default Users;
