import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);
export default User;
