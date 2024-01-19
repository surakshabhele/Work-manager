"use client";
import UserContext from "@/context/usercontext";
import { Logout } from "@/services/userservice";
import Link from "next/link";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function CustomNavBar() {
  const context = useContext(UserContext);
  const router = useRouter();
  console.log(context);
  async function DoLogout() {
    try {
      const result = await Logout();
      console.log(result);
      context.setUser(undefined);
      toast.success("Logout");
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Logout error");
    }
  }
  return (
    <nav className="bg-blue-600 h-18 px-4 py-2 flex justify-between items-center mb-5">
      <div className="brand">
        <h1 className="text-2 font-semibold">
          <a href="/home">Work Manager</a>
        </h1>
      </div>
      <div>
        <ul className="flex space-x-3">
          {context.user && (
            <>
              <li>
                <Link href={"/"} className="hover:text-blue-200">
                  Home
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/add_task" className="hover:text-blue-200">
                  Add Task
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/show_tasks" className="hover:text-blue-200">
                  Show Tasks
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div>
        {/* <ul className="flex space-x-3">
          {context.user && (
            <>
              <li>
                <Link href="/#" className="text-pink-500">
                  {context.user.name}
                </Link>
              </li>
              <li>
                <button onClick={DoLogout}>Logout</button>
              </li>
            </>
          )} */}
           <ul className="flex space-x-3">
          {context.user && (
            <>
            {/* {console.log("user:",context.user)} */}
              <li>
                <Link href={"#!"}>{context.user.name}</Link>
              </li>
              <li>
                <button onClick={DoLogout}>Logout</button>
              </li>
            </>
          )}

          {!context.user && (
            <>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/signup">SignUp</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default CustomNavBar;
