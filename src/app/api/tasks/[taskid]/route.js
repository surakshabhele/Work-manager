import { connectDB } from "@/helper/db";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";
connectDB();
export async function DELETE(request, { params }) {
  const { taskid } = params;
  try {
    await Task.deleteOne({
      _id: taskid,
    });
    return NextResponse.json({
      message: "deleted task",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "failed to delete task",
    });
  }
}

export async function PUT(request, { params }) {
  const { taskid } = params;
  const { title, content, status } = await request.json();
  try {
    let task = await Task.findById(taskid);
    task.title = title;
    (task.content = content), (task.status = status);
    const updatedTask = await task.save();
    return NextResponse.json(updatedTask);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "error while getting task",
    });
  }
}
// get a single task
export async function GET(request, { params }) {
  console.log(params);
  const { taskid } = params;
  console.log("id", taskid);
  try {
    const task = await Task.findById(taskid);
    return NextResponse.json({
      status: true,
      message: "Data fetched successfully",
      data: task,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "failed to find task",
      error: "error",
    });
  }
}
