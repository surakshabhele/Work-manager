"use client";
import { addTask } from "@/services/taskservice";
import React, { useState } from "react";
import { toast } from "react-toastify";
const metadata = {
  title: "Add Task:Work Manager",
};

function AddTask() {
  document.title = metadata.title;
  const [task, setTask] = useState({
    title: "",
    content: "",
    status: "none",
    userid: "",
    // userid: "65819d0ea1d60f8a2687c069",
  });
  const HandleAddTask = async (event) => {
    event.preventDefault();
    // console.log(event)
    // console.log(event.target)
    console.log(task);
    try {
      const result = await addTask(task);
      console.log("result", result);
      if (result.status) {
        toast.success("your task is added", {
          position: "top-center",
        });
        setTask({
          title: "",
          content: "",
          status: "none",
        });
      } else {
        toast.error("task not added", {
          position: "top-center",
        });
        setTask({
          title: "",
          content: "",
          status: "none",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("task not added", {
        position: "top-center",
      });
    }
  };
  function ResetForm() {
    setTask({
      title: "",
      content: "",
      status: "none",
    });
  }
  return (
    <div className="grid grid-cols-12 justify-center ">
      <div className="shadow shadow-yellow-600 p-5 col-span-6 col-start-4">
        <h1 className="text-2xl text-center px-2 py-2">Add your task here</h1>
        <form action="#" onSubmit={HandleAddTask}>
          <div className="mt-4">
            <label
              htmlFor="task_title"
              className="block text-sm font-medium mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="task_title"
              className="px-2 bg-gray-300 rounded-3xl focus:ring-yellow-600 w-full"
              name="task_title"
              onChange={(event) => {
                setTask({
                  ...task,
                  title: event.target.value,
                });
              }}
              value={task.title}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="task_content"
              className="block text-sm font-medium mb-2"
            >
              Content
            </label>
            <textarea
              type="text"
              id="task_content"
              rows={5}
              className="px-2 bg-gray-300 rounded-3xl focus:ring-yellow-600 w-full"
              name="task_content"
              onChange={(event) => {
                setTask({
                  ...task,
                  content: event.target.value,
                });
              }}
              value={task.content}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="task_status"
              className="block text-sm font-medium mb-2"
            >
              Status
            </label>
            <select
              id="task_status"
              className="bg-gray-300 rounded-3xl focus:ring-yellow-600 w-full py-2 px-2"
              name="task_status"
              onChange={(event) => {
                setTask({
                  ...task,
                  status: event.target.value,
                });
              }}
              value={task.status}
            >
              <option value="none" disabled>
                --Select Status--
              </option>
              <option value="pending">pending</option>
              <option value="completed">completed</option>
            </select>
          </div>
          <div className="mt-4">
            <button className="bg-yellow-600 py-3 px-3 rounded-lg hover:bg-yellow-900">
              Add Task
            </button>
            <button
              // type="reset" value="Reset"
              onClick={ResetForm}
              className="bg-red-600 py-3 px-3 rounded-lg hover:bg-red-900 ms-3"
            >
              Clear
            </button>
          </div>
          {/* {JSON.stringify(task)} */}
        </form>
      </div>
    </div>
  );
}

export default AddTask;
