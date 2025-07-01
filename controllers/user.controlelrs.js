import UserModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";

export const register = async (req, res) => {
  try {
    // const hashPass = await bcrypt.hash(req.body.password, 10) => to avoid redundancy moved to user model
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already registered",
      });
    }
    const newUser = await UserModel.create({ ...req.body, user: "CUSTOMER" });
    res.json({
      succes: true,
      message: "Registration successfull",
      user: {
        firstName: newUser.firstName,
        email: newUser.email,
      },
      from: "register API",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to register user",
      from: "register API",
    });
  }
};

export const login = async (req, res) => {
  // email and pass structure validation is checked in middleware
  // cjheck if user is present in db
  // check if user password matches
  try {
    // console.log(`Login api hit`);
    const user = await UserModel.findOne({ email: req.body.email });
    const plainTextpass = req.body.password;
    // if user not found
    if (!user) {
      console.log(`user not found`);

      return res.status(500).json({
        success: false,
        message: "User not found in DB",
        from: "login API",
      });
    }
    // if password not matched
    let passMatched = await bcrypt.compare(plainTextpass, user.password);
    if (!passMatched) {
      console.log(`pass not matched`);

      return res.status(401).json({
        success: false,
        message: "Wrong password",
        from: "login API",
      });
    }
    // if everything ok
    const tokenData = {
      _id: user._id,
      firstName: user.firstName,
      email: user.email,
      role: user.role,
      address: user.address,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.json({
      success: true,
      message: "Login successful",
      user: tokenData,
      token: token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "login API failed",
      from: "login API",
      error,
    });
  }
};

export const forgotPassword = async (req, res) => {
  // create OTP -> store OTP in DB -> send mail
  try {
    const otp = Math.floor(Math.random() * 10000);
    const otpExpiry = dayjs().add(5, "minutes").toDate();

    await UserModel.updateOne(
      { email: req.body.email },
      { passwordOTP: otp, passwordOTPExpiry: otpExpiry }
    );
    // sent email with mail dev and node mailer

    res.json({
      succes: true,
      message: "Password reset OTP sent on registered email",
      otp,
      otpExpiry: "5 minutes",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to forgot password",
      from: "forgot password api",
      error,
    });
  }
};

export const resetPassword = async (req, res) => {
  // payload => {email, otp, newPass}
  //  find user (with email & otp) ->validate the otp (current otp, expiry) -> update password
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
      passwordOTP: req.body.otp,
    });
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isOtpMatched = user.passwordOTP == req.body.otp;
    const isOTPValid = dayjs().isBefore(user.passwordOTPExpiry);

    if (!isOtpMatched || !isOTPValid) {
      return res.status(400).json({
        success: false,
        message: "OTP is not valid",
      });
    }

    const newHashedPass = await bcrypt.hash(req.body.newPassword, 10);

    await UserModel.updateOne(
      { email: req.body.email },
      {
        $set: { password: newHashedPass },
      }
    );

    res.json({
      succes: true,
      message: "Successfullt reseted password",
    });
  } catch (error) {}
};

//
export const changePassword = async (req, res) => {
  // payload => {oldPass, newPass}
  // compare using bcrypt -> if matched -> change pass
  // if not match send error

  try {
    const { newPassword } = req.body;
    // compare
    const hashPass = await bcrypt.hash(newPassword, 10);
    await UserModel.updateOne(
      { email: req.body.email },
      {
        $set: { password: hashPass },
      }
    );
    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to change password",
      from: "change password api",
      error,
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    console.log("req.body:", req.body);

    let { email, nickname, description, preferences, dob, gender } = req.body;
    email = email.trim().toLowerCase(); // Normalize

    const user = await UserModel.findOne({ email });
    // console.log("User: ", user);
    

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    user.userProfile = {
      email,
      nickname,
      description,
      preferences,
      dob,
      gender,
    };

    console.log("User profile before save:", user.userProfile);

    await user.save();

    console.log("User profile after save:", user.userProfile);

    res.json({
      success: true,
      message: "User profile updated",
      userProfile: user.userProfile,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add userProfile to user data",
    });
  }
};


export const getUserProfile = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User profile not found",
      });
    }

    res.json({
      success: true,
      userProfile: user.userProfile,
    });
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

