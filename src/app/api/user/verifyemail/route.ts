import User from "@/models/user.model";
import { dbConnection } from "@/dbConnection/dbConnection";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    dbConnection();

    const requestBody = await request.json();
    const { token } = requestBody;

    if (!token) {
      return NextResponse.json({ error: "No token" }, { status: 400 });
    }

    const user = await User.findOne(
      { verifyToken: token },
      { verifyTokenExpiry: { $gt: Date.now() } }
    );
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    return NextResponse.json("verfied successfull");
  } catch (error: any) {
    console.error("Error verifying email:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
};
