import React from "react";
import { useState } from "react";
import { FaUser, FaRegUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { toast } from "react-toastify";

import authService from "../services/authService";
import { redirect, Form, useNavigation } from "react-router-dom";

import { login } from "../features/authSlice";

export const action =
  (store) =>
  async ({ request }) => {
    const data = Object.fromEntries(await request.formData());
    // console.log(data);
    try {
      const userData = await authService.register({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      // add user to state
      store.dispatch(login({ user: userData }));
      toast.success("account created successfully!");
      return redirect("/");
    } catch (error) {
      const errorMessage =
        error.response.data.message || "please double check your credentials";
      // console.log(error);
      toast.error(errorMessage);
      return null;
    }
  };

function Register() {
  // const { user, status } = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const isLoading = navigation.state == "submitting";
  const [formData, setData] = useState({
    name: "danish",
    email: "test@gmail.com",
    password: "test@gmail.com",
    password2: "test@gmail.com",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setData((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });
  };

  // if (isLoading) {
  //   return <Spinner />;
  // }
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <Form method="post">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
              // defaultValue="danish"
            />
            <FaRegUser className="icon" />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
              // defaultValue="test@gmail.com"
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
              // defaultValue="test@gmail.com"
            />
            <RiLockPasswordLine className="icon" />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm password"
              onChange={onChange}
              // defaultValue="test@gmail.com"
            />
            <RiLockPasswordLine className="icon" />
          </div>
          <div className="form-group">
            {!isLoading ? (
              <button type="submit" className="btn btn-block">
                Submit
              </button>
            ) : (
              <button className="btn btn-block">Submitting...</button>
            )}
          </div>
        </Form>
      </section>
    </>
  );
}

export default Register;
