"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { LoginApi } from "@/services/userservice";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  async function HandleLogin(event) {
    event.preventDefault();
    setLogin({
      email: "",
      password: "",
    });
    console.log(event);
    if (login.email.trim() === "" || login.password === "") {
      toast.error("Invalid Data", {
        position: "top-center",
      });
      return;
    }
    // valid data----Login
    try {
      const result = await LoginApi(login);
      console.log(result);
      toast.success("Loged in", {
        position: "top-center",
      });
      // redirect
      router.push("/profile/user");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  }
  function ResetForm() {
    setLogin({
      email: "",
      password: "",
    });
  }
  return (
    <div className="grid grid-cols-14 justify-center ">
      <div className="shadow shadow-yellow-600 p-5 col-span-6 col-start-4">
        <h1 className="text-2xl text-center px-2 py-2">Login here!</h1>
        <form action="#" onSubmit={HandleLogin}>
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
                setLogin({
                  ...login,
                  email: event.target.value,
                });
              }}
              value={login.email}
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
                setLogin({
                  ...login,
                  password: event.target.value,
                });
              }}
              value={login.password}
            />
          </div>
          <div className="mt-4">
            <button className="bg-yellow-600 py-2 px-2 rounded-lg hover:bg-yellow-900">
              Login
            </button>
            <button
              onClick={ResetForm}
              className="bg-red-600 py-2 px-2 rounded-lg hover:bg-red-900 ms-3"
            >
              Reset
            </button>
          </div>
          {/* {JSON.stringify(login)} */}
        </form>
      </div>
    </div>
  );
};

export default Login;
