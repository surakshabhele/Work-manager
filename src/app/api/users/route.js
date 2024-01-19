import { connectDB } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connectDB();
// get request function
export async function GET(request) {
  let users = [];
  try {
    users = await User.find();
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "failed to get users",
      success: "false",
    });
  }
  return NextResponse.json(users);
  // const users = [
  //   {
  //     name: "suraksha",
  //     phone: "82389325",
  //     cource: "javascript",
  //   },
  //   {
  //     name: "aisha",
  //     phone: "8238932",
  //     cource: "cpp",
  //   },
  //   {
  //     name: "roshani",
  //     phone: "82389324",
  //     cource: "java",
  //   },
  // ];
  // return NextResponse.json(users);
}
export async function POST(request) {
  // fetch user detail from request
  const { name, email, password, about, profileUrl } = await request.json();
  console.log({ name, email, password, about, profileUrl });
  // create user object with user model
  const user = new User({
    name,
    email,
    password,
    about,
    profileUrl,
  });
  try {
    console.log("post request of user created");
    // save the object to database
    user.password = bcrypt.hashSync(
      user.password,
      parseInt(process.env.BCRYPT_SALT)
    );
    console.log(user);
    const createdUser = await user.save();
    return NextResponse.json({
      status: 201,
      message: "user created successfully",
      data: createdUser,
    });
    // return response;
  } catch (error) {
    console.log("post request of user creation failed");
    console.log("error : ", error.message);
    return NextResponse.json(
      {
        message: "failed to create user",
        status: "false",
        stack: error.message,
      },
      {
        status: 500,
      }
    );
  }
  // const data = request.body;
  // console.log(data)
  // console.log(request.method);
  // console.log("cookies op",request.cookies);
  // console.log("headers op",request.headers);
  // console.log(request.nextUrl.pathname);
  // console.log(request.nextUrl.searchParams);
  // const jsonData = await request.json();
  // const textData = await request.text();
  // console.log(jsonData)
  // console.log(textData);
}

// export function DELETE(request) {
//   return NextResponse.json({
//     message: "deleted!",
//     status: "true",
//   });
// }
// export function PUT(request) {
//   return NextResponse.json({
//     message: "true",
//   });
// }
