const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  rank: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("UserData", UserSchema);
export default User;
