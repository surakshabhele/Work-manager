import { connectDB } from "@/helper/db";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
connectDB();
export async function GET(request) {
  try {
    const tasks = await Task.find();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json("error in getting data");
  }
}

export async function POST(request) {
  const { title, content, addedDate, status, userid } = await request.json();
  // fetching logged in userid
  const logintoken = request.cookies.get("logintoken")?.value;
  console.log("logintoken", logintoken);
  const data = jwt.verify(logintoken, process.env.JWT_KEY);
  console.log(data._id);
  try {
    const task = new Task({
      title,
      content,
      addedDate,
      status,
      userid: data._id,
    });
    const createdTask = await task.save();
    return NextResponse.json({
      createdTask,
      message: "succussfully task created",
      status: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "failed to create task",
      status: false,
    });
  }
}
