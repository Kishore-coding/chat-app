// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectToDatabase from "../../../../app/lib/mongodb";
import User from "@/app/models/User";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function POST(request: Request) {
  await connectToDatabase();

  const { userName, password } = await request.json();

  // Find the user in MongoDB
  const user = await User.findOne({ userName });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  // Generate JWT token
  const token = jwt.sign({ userName: user.userName }, JWT_SECRET, {
    expiresIn: "24h",
  });
  return NextResponse.json({ token });
}
