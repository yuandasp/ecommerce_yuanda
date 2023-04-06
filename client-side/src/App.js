import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UpdateProfile from "./pages/UpdateProfile";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verification from "./pages/Verification";
import PrivateRoute from "./components/PrivateRoute";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkLogin } from "./features/users/userSlice";
import Users from "./pages/Users";

function App() {
  const dispatch = useDispatch();
  const authToken = localStorage.getItem("authToken");
  // useEffect(() => {
  //   dispatch(checkLogin(authToken));
  // }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/user/update-profile" element={<UpdateProfile />} />
          <Route path="/users" element={<Users />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/verification/:token" element={<Verification />} />
      </Routes>
    </>
  );
}

export default App;
