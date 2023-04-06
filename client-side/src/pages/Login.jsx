import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { authToken } from "../helpers/constants";
import { setUser } from "../features/users/userSlice";
import { useDispatch } from "react-redux";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .required("email cannot be empty")
      .email("Wrong email format"),
    password: Yup.string()
      .required("password cannot be empty")
      .min(3, "Password too short"),
  });

  const loginUser = async (value) => {
    try {
      setIsLoading(true);
      // console.log(value);
      let response = await axios.post(
        "http://localhost:8001/auth/login",
        value
      );
      //   alert(response.data.message);

      setIsLoading(false);
      if (response.data.token) {
        localStorage.setItem(authToken, response.data.token);
        dispatch(setUser(response.data.data));
        navigate("/");
      }
    } catch (error) {
      //   console.log(error);
      setIsLoading(false);
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(value) => {
          loginUser(value);
        }}
      >
        {(props) => {
          return (
            <>
              <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                  <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                      Log in to your account
                    </h2>
                  </div>
                  <Form className="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm">
                      <div className="my-4">
                        <label htmlFor="email-address" className="sr-only">
                          Email address
                        </label>
                        <Field
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          className="pl-4 relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="Email address"
                        />
                        <ErrorMessage
                          component="div"
                          name="email"
                          style={{ color: "red", fontSize: "12px" }}
                        />
                      </div>

                      <div className="my-4">
                        <label htmlFor="password" className="sr-only">
                          Password
                        </label>
                        <Field
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          className="pl-4 relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="Password"
                        />
                        <ErrorMessage
                          component="div"
                          name="password"
                          style={{ color: "red", fontSize: "12px" }}
                        />
                      </div>
                    </div>
                    {isLoading ? (
                      <p>loading</p>
                    ) : (
                      <div>
                        <button
                          type="submit"
                          className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                          Log in
                        </button>
                      </div>
                    )}
                  </Form>
                </div>
              </div>
            </>
          );
        }}
      </Formik>
    </div>
  );
}

export default Register;
