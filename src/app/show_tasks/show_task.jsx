"use client";
import UserContext from "@/context/usercontext";
// import { Task } from "@/models/task";
import { DeleteTask, GetTaskOfUser } from "@/services/taskservice";
import React, { useContext, useEffect, useState } from "react";
import Task from "./task";
import { toast } from "react-toastify";

function ShowTask() {
  const [tasks, setTasks] = useState([]);
  const context = useContext(UserContext);
  async function LoadTask(userid) {
    try {
      const tasks = await GetTaskOfUser(userid);
      setTasks([...tasks]);
      console.log(tasks);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (context.user) {
      LoadTask(context.user._id);
    }
  }, [context.user]);
  async function deletetaskparent(taskid) {
    try {
      const result = await DeleteTask(taskid);
      console.log(result);
      const newtask = tasks.filter((item) => item._id != taskid);
      setTasks(newtask);
      toast.success("Your task is deleted");
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting task");
    }
  }
  return (
    <div className="container grid mt-3">
      <div>
        <h1 className="text-3xl text-center">Your Task ({tasks.length})</h1>
        {tasks.map((task) => (
          <Task
            task={task}
            key={task._id}
            deletetaskparent={deletetaskparent}
          />
        ))}
      </div>
    </div>
  );
}

export default ShowTask;
