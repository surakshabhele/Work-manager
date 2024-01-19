import { connectDB } from "@/helper/db";
import { User } from "@/models/user";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
connectDB();
export async function GET(request) {
  const logintoken = request.cookies.get("logintoken")?.value;
  console.log("logintoken", logintoken);
  const data = jwt.verify(logintoken, process.env.JWT_KEY);
  console.log(data);
  const user = await User.findById(data._id).select("-password");
  return NextResponse.json(user);
}
