import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { checkLogin } from "../features/users/userSlice";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  console.log("user:", user);

  if (!localStorage.getItem("authToken")) {
    return <Navigate to="/user/login" />;
  } else {
    if (!user.id) {
      dispatch(checkLogin());
    }
  }

  if (!user.id) {
    return <p>Loading...</p>;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;
