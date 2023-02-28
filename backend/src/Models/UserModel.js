import mongoose from "mongoose";
const { Schema, model } = mongoose;
import bcrypt from "bcrypt";
var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique:true,
      required: 'email is required',
    },
    password: {
      type: String,
      required: "password is required",
    },
    role: {
      type: String,
      enum:["employee", "admin"],
      default: "employee" ,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
  },
  {
    collection: "users",
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
    versionKey: false,
  }
);
userSchema.pre("save", function (next) {
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(this.password, salt))
    .then((hashPassword) => {
      this.password = hashPassword;
      next();
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});
const User = model("users", userSchema);
export default User;
