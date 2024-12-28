import User from "@/models/user.model";
import { dbConnection } from "@/dbConnection/dbConnection";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";

export const GET = async () => {
  try {
    const response = NextResponse.json({ message: "logout successfully" });

    response.cookies.set("token", "", { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
