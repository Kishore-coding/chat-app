import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "../../../lib/mongodb";
import User from "@/app/models/User";

// const userInfo: { userName: string; password: string;}[] = [];

export const POST = async (request: Request) => {
  await connectToDatabase();
  console.log("MongoDB connected successfully in the API route");

  try {
    const { userName, password, email } = await request.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User email already exist" },
        { status: 400 }
      );
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userName, password: hashpassword, email });
    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
