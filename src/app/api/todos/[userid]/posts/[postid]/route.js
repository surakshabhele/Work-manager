import { NextResponse } from "next/server";

export function GET(request,{params}){
    const {userid,postid}=params
    console.log("User Id",userid);
    console.log("Post Id",postid);
    return NextResponse.json(params)
}