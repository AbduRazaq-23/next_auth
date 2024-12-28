import User from "@/models/user.model";
import { dbConnection } from "@/dbConnection/dbConnection";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export const GET = async (request: NextRequest) => {
  try {
    dbConnection();

    const userId = await getDataFromToken(request);

    const user = await User.findById({ _id: userId }).select("-password");

    if (!user) {
      return NextResponse.json({ message: "invalid token" });
    }

    return NextResponse.json({ message: "get user", data: user });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
