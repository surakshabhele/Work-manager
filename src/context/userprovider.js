"use client";
import React, { useEffect, useState } from "react";
import UserContext from "./usercontext";
import { toast } from "react-toastify";
import { httpAxios } from "@/helper/httphelper";
import { CurrentUser } from "@/services/userservice";

function UserProvider({ children }) {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    async function load() {
      try {
        const tempUser = await CurrentUser();
        console.log("currenttuser", tempUser);
        setUser({ ...tempUser });
      } catch (error) {
        console.log(error);
        toast.error("error in loading current user");
        setUser(undefined);
      }
    }
    load();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
