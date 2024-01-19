import { User } from "@/models/user";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/helper/db";
connectDB();
// get a single user by id
export async function GET(request, { params }) {
  const { userid } = params;
  const user = await User.findById(userid);
  return NextResponse.json(user);
}

// update user
export async function PUT(request, { params }) {
  const { userid } = params;
  const { name, password, about, profileUrl } = await request.json();
  try {
    const user = await User.findById(userid);
    user.name = name;
    user.password = password;
    user.about = about;
    user.profileUrl = profileUrl;
    const updatedUser = await user.save();
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({
      message: "failed to update",
      stack: "error.message",
    });
  }
}

// delete user by id
export async function DELETE(request, { params }) {
  //   console.log(params);
  const { userid } = params;
  var id = new mongoose.Types.ObjectId(userid);
  try {
    // console.log(userid);
    await User.findByIdAndDelete(id);
    return NextResponse.json({
      message: "deleted user",
      success: "true",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "error occur while deleting",
      success: "false",
    });
  }
}
// export function DELETE(request,{params}){
//     console.log(params)
//     const userID = params.userid;
//     const {userid} = params;
//     console.log("2",userid)
//     console.log(userID);
//     return NextResponse.json({
//         message:"delete id"
//     })
// }
