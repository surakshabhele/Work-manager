import UserContext from "@/context/usercontext";
import { DeleteTask } from "@/services/taskservice";
import React, { useContext } from "react";
import { RxCross2 } from "react-icons/rx";

function Task({ task,deletetaskparent }) {
  // console.log("task",task)
  const { user } = useContext(UserContext);
  function DeleteOne(taskid) {
     deletetaskparent(taskid);
  }
  return (
    <div
      className={`mt-2 shadow-lg ${
        task.status == "completed" ? "bg-green-700" : "bg-gray-400"
      }`}
    >
      <div className="p-5">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">{task.title}</h1>
          
          <span 
          // onClick={DeleteOne(task.id)}
          onClick={()=>{DeleteOne(task._id)}}
          className="shadow-lg hover:bg-red-500 bg-red-400 rounded-full w-7 h-7 flex justify-center items-center cursor-pointer ">
            <RxCross2 />
          </span>
        </div>
        <p className="font-normal">{task.content}</p>
        <div className="flex justify-between mt-3">
          <p className="text-left">
            Status: <span className="font-bold">{task.status}</span>
          </p>
          <p className="text-right">
            Author: <span className="font-bold">{user?.name}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Task;
