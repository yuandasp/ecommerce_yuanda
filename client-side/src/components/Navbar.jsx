import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authToken } from "../helpers/constants";
import { useDispatch } from "react-redux";
import { checkLogin, resetUser } from "../features/users/userSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = localStorage.getItem(authToken);

  // useEffect(() => {
  //   dispatch(checkLogin(authToken));
  // }, []);

  return (
    <div className="bg-black flex justify-between items-center px-5 h-20">
      <div className="text-white">
        <p className="font-semibold text-lg">Ecommerce Wannabe</p>
      </div>
      <div className="text-white flex gap-10">
        <p onClick={() => navigate("/")} className="hover:cursor-pointer">
          Home
        </p>

        {token && (
          <>
            <p>Product</p>
            <p>About</p>
            <p
              onClick={() => navigate("/users")}
              className="hover:cursor-pointer"
            >
              Users
            </p>
            <p
              onClick={() => navigate("/user/update-profile")}
              className="hover:cursor-pointer"
            >
              Update Profile
            </p>
            <p
              className="hover:cursor-pointer"
              onClick={() => dispatch(resetUser())}
            >
              Logout
            </p>
            <img
              // src={localStorage.getItem("profilePict")}
              // src={`http://localhost:8001/${user.imagePath}`}
              src={`http://localhost:8001/${localStorage.getItem(
                "profilePict"
              )}`}
              alt="profile"
              style={{ borderRadius: "50%", width: "40px", height: "40px" }}
            />
          </>
        )}
        {!token && (
          <>
            <p
              onClick={() => navigate("/user/register")}
              className="hover:cursor-pointer"
            >
              Register
            </p>
            <p
              onClick={() => navigate("/user/login")}
              className="hover:cursor-pointer"
            >
              Login
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
