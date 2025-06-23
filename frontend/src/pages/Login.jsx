import React from "react";
import { useState } from "react";
import { FaSignInAlt, FaRegUser } from "react-icons/fa";
import { redirect, Form, useNavigation } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import authService from "../services/authService";
import { login } from "../features/authSlice";
import { toast } from "react-toastify";

export const action =
  (store) =>
  async ({ request }) => {
    const data = Object.fromEntries(await request.formData());
    // console.log(data);
    try {
      const userData = await authService.login({
        email: data.email,
        password: data.password,
      });
      // add user to state
      // console.log(userData);
      store.dispatch(login({ user: userData }));
      toast.success("Logged In successfully!");
      return redirect("/");
    } catch (error) {
      // console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        "please double check your credentials";
      // console.log(error);
      toast.error(errorMessage);
      return null;
    }
  };

function Login() {
  const navigation = useNavigation();
  const isLoading = navigation.state == "submitting";
  const [formData, setData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setData((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Sign In using an account</p>
      </section>

      <section className="form">
        <Form method="post">
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
            <MdOutlineMail className="icon" />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
            <RiLockPasswordLine className="icon" />
          </div>

          <div className="form-group">
            {!isLoading ? (
              <button type="submit" className="btn btn-block">
                Login
              </button>
            ) : (
              <button className="btn btn-block">WIP...</button>
            )}
          </div>
        </Form>
      </section>
    </>
  );
}

export default Login;
