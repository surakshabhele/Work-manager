import { connectDB } from "@/helper/db";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";
connectDB();
export async function GET(request, { params }) {
  const { userid } = params;
  console.log(userid);
  try {
    const tasks = await Task.find({ userid: userid });
    return NextResponse.json(tasks);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "failed to find task",
    });
  }
}
