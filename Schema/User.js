import mongoose, { Schema } from "mongoose";

const userSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  userName: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: Number,
  },
});

export default mongoose.model("UserTable", userSchema);
