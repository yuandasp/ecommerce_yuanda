import { createSlice } from "@reduxjs/toolkit";
import { authToken } from "../../helpers/constants";
import axios from "axios";
import { Navigate } from "react-router-dom";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      id: "",
      name: "",
      email: "",
      username: "",
      imagePath: "",
      isAdmin: false,
      isActive: "",
    },
  },
  reducers: {
    setUser: (state, action) => {
      console.log("action", action);
      localStorage.setItem("profilePict", action.payload.imagePath);
      state.user = action.payload;
    },
    resetUser: (state, action) => {
      localStorage.clear();
      state.user = {
        id: "",
        name: "",
        email: "",
        username: "",
        imagePath: "",
        isAdmin: false,
        isActive: "",
      };
      window.location.href = "/user/login";
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;

export const checkLogin = () => {
  return async (dispatch) => {
    let token = localStorage.getItem(authToken);
    try {
      let response = await axios.post(
        "http://localhost:8001/auth/check-login",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      dispatch(setUser(response.data.data));
    } catch (error) {
      console.log(error); //di sini masih nampilin error
      alert("Please Login");
      localStorage.clear();
      window.location.href = "/user/login";
    }
  };
};

export function logoutUser() {
  return async (dispatch) => {
    dispatch(resetUser());
    localStorage.removeItem(authToken);
  };
}
