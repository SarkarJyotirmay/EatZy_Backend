import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobNo: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "CUSTOMER",
      enum: ["CUSTOMER", "SELLER", "ADMIN"],
    },
    address: {
      addressLine1: {
        type: String,
        required: true,
      },
      addressLine2: {
        type: String,
        required: false,
        default: "",
      },
      landmark: {
        type: String,
        required: false,
        default: "",
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        requried: true,
      },
      pincode: {
        type: String,
        requried: true,
      },
    },
    userProfile: {
      type: {
        nickname: { type: String, required: false },
        description: { type: String, required: false },
        preferences: { type: [String], required: false },
        dob: { type: Date },
        gender: { type: String, required: false },
      },
      required: false,
      default: {},
    },
    passwordOTP: {
      // used for reset password
      type: String,
      required: false,
      default: "",
    },
    passwordOTPExpiry: {
      type: Date,
      required: false,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  const plainTextPass = this.password;
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(plainTextPass, salt);
  this.password = hashPass;
});

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
