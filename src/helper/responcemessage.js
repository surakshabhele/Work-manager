import { NextResponse } from "next/server";

export const getResponceMessage = (messageText, statusCode, successStatus) => {
  return NextResponse.json(
    {
      message: messageText,
      success: successStatus,
    },
    {
      status: statusCode,
    }
  );
};
