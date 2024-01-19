"use client";
import { SignUp } from "@/services/userservice";
import { data } from "autoprefixer";
import React, { useState } from "react";
import { toast } from "react-toastify";
// const metadata = {
//   title: "Signup:Work Manager",
// };
function SignUpPage() {
  // document.title = metadata.title;
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
    profileUrl: "",
  });
  async function HandleUser(event) {
    event.preventDefault();
    // const result = await SingUp(user);
    // console.log(user);
    // console.log("result", result);
    if (user.name.trim() === "" || user.name == null) {
      toast.warning("name is required", {
        position: "top-center",
      });
      return;
    }
    if (user.email.trim() === "" || user.email == null) {
      toast.warning("email is required", {
        position: "top-center",
      });
      return;
    }
    if (user.password.trim() === "" || user.password == null) {
      toast.warning("password is required", {
        position: "top-center",
      });
      return;
    }
    try {
      const result = await SignUp(user);
      console.log(user);
      console.log("result", result);
      toast.success("user is registered", {
        position: "top-center",
      });
      setUser({
        name: "",
        email: "",
        password: "",
        about: "",
        profileUrl: "",
      })
    } catch (error) {
      console.log(error);
      toast.error("Signup error!! " + error.response.data.message, {
        position: "top-center",
      });
    }
  }
  function ResetForm() {
    setUser({
      name: "",
      email: "",
      password: "",
      about: "",
      profileUrl: "",
    });
  }
  return (
    <div className="grid grid-cols-14 justify-center ">
      <div className="shadow shadow-yellow-600 p-5 col-span-6 col-start-4">
        <h1 className="text-2xl text-center px-2 py-2">SignUp here!</h1>
        <form action="#" onSubmit={HandleUser}>
          <div className="mt-4">
            <label
              htmlFor="user_name"
              className="block text-sm font-medium mb-2"
            >
              UserName
            </label>
            <input
              placeholder="Enter here"
              type="text"
              id="user_name"
              className="px-2 bg-gray-300 rounded-3xl focus:ring-yellow-600 w-full"
              name="user_name"
              onChange={(event) => {
                setUser({
                  ...user,
                  name: event.target.value,
                });
              }}
              value={user.name}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="user_email"
              className="block text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              placeholder="Enter here"
              type="email"
              id="user_email"
              className="px-2 bg-gray-300 rounded-3xl focus:ring-yellow-600 w-full"
              name="user_email"
              onChange={(event) => {
                setUser({
                  ...user,
                  email: event.target.value,
                });
              }}
              value={user.email}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="user_password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              placeholder="Enter here"
              type="password"
              id="user_password"
              className="px-2 bg-gray-300 rounded-3xl focus:ring-yellow-600 w-full"
              name="user_password"
              onChange={(event) => {
                setUser({
                  ...user,
                  password: event.target.value,
                });
              }}
              value={user.password}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="user_about"
              className="block text-sm font-medium mb-2"
            >
              About
            </label>
            <textarea
              placeholder="Enter here"
              id="user_about"
              rows={4}
              className="px-2 bg-gray-300 rounded-3xl focus:ring-yellow-600 w-full"
              name="user_about"
              onChange={(event) => {
                setUser({
                  ...user,
                  about: event.target.value,
                });
              }}
              value={user.about}
            ></textarea>
          </div>
          <div className="mt-4">
            <button className="bg-yellow-600 py-2 px-2 rounded-lg hover:bg-yellow-900">
              SignUp
            </button>
            <button
              onClick={ResetForm}
              className="bg-red-600 py-2 px-2 rounded-lg hover:bg-red-900 ms-3"
            >
              Reset
            </button>
          </div>
          {/* {JSON.stringify(user)} */}
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
