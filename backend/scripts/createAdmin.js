import mongoose from "mongoose";
import "dotenv/config";
import bcrypt from "bcryptjs";
import User from "../src/models/User.js";

async function createAdmin() {
  await mongoose.connect(process.env.MONGODB_URI);

  const existingAdmin = await User.findOne({ role: "admin" });

  if (existingAdmin) {
    console.log("Admin already exists.");
    await mongoose.connection.close();
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  await User.create({
    name: "Qissa Admin",
    email: "admin@qissa.com",
    password: hashedPassword,
    role: "admin",
  });

  console.log("Admin created successfully.");

  await mongoose.connection.close();
  process.exit(0);
}

createAdmin();
