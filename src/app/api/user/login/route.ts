import User from "@/models/user.model";
import { dbConnection } from "@/dbConnection/dbConnection";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST = async (request: NextRequest) => {
  try {
    dbConnection();

    const requestBody = await request.json();

    const { email, password } = requestBody;

    if (!email || !password) {
      return NextResponse.json(
        { error: "please fill the field" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email, isVerified: true });
    if (!user) {
      return NextResponse.json({ error: "do not exit email" }, { status: 400 });
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    const response = NextResponse.json(
      { message: "user logedin successfully" },
      { status: 200 }
    );

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.TOKEN_SECRET!,
      { expiresIn: "1d" }
    );

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    console.error("Error login user:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
};
