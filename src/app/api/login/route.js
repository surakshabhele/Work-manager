import { connectDB } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
connectDB();
export async function POST(request) {
  const { email, password } = await request.json();
  try {
    //1. get user
    const user = await User.findOne({
      email: email,
    });
    if (user == null) {
      throw new Error("user not found");
    }
    // 2.password check
    const matched = bcrypt.compareSync(password, user.password);
    if (!matched) {
      throw new Error("Password not matched");
    }
    // generate token
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
      },
      process.env.JWT_KEY
    );
    console.log("user:", user);
    console.log("tokenfind:", token);
    // create nextresponse---cookies
    const response = NextResponse.json({
      message: "Login succussessfully",
      success: true,
    });
    response.cookies.set("logintoken", token, {
      expiresIn: "1d",
      httpOnly: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
        status: "false",
      },
      {
        status: 500,
      }
    );
  }
}
