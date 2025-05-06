const User = require("../models/User");
const {
  sendVerificationEmail,
  sendResetPasswordEmail,
} = require("../utils/emailUtils");
const { sendErrorResponse } = require("../utils/serverUtils");
const { getCryptoToken, getJWT, getTokenUser } = require("../utils/tokenUtils");

const register = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return sendErrorResponse(res, "Email already exists.", 400);
    }

    const isFirstUser = (await User.countDocuments()) === 0;

    const verificationToken = getCryptoToken();

    const user = new User();
    user.fname = fname;
    user.lname = lname;
    user.email = email;
    user.password = password;
    user.role = isFirstUser ? "admin" : "user";
    user.verificationToken = verificationToken;

    await user.save();

    await sendVerificationEmail(email, verificationToken);

    res
      .status(200)
      .json({ success: true, msg: "Account created & Mail sent successfully" });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { email, verificationToken } = req.body;

    if (!email || !verificationToken) {
      return sendErrorResponse(
        res,
        "Email and verification token are required.",
        400
      );
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return sendErrorResponse(res, "No such email exists.", 404);
    }

    if (existingUser.isVerified) {
      return sendErrorResponse(res, "Email is already verified..", 400);
    }

    existingUser.verificationToken = "";
    existingUser.isVerified = true;
    existingUser.verifiedAt = new Date();

    await existingUser.save();

    res.status(200).json({ success: true, msg: "User verified successfully." });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendErrorResponse(res, "Email and password are required.", 400);
    }

    const existingUser = await User.findOne({
      email,
    });

    if (!existingUser) {
      return sendErrorResponse(res, "No such user exists.", 404);
    }

    if (!existingUser.isVerified) {
      return sendErrorResponse(res, "Account not verified.", 401);
    }

    if (existingUser.password !== password) {
      return sendErrorResponse(res, "Invalid password.", 401);
    }

    const tokenUser = getTokenUser(existingUser);

    const accessToken = getJWT({
      userId: tokenUser.userId,
      role: tokenUser.role,
    });

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + oneDay),
    });

    res
      .status(200)
      .json({ success: true, data: tokenUser, msg: "Logged in successfully." });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("accessToken", "", {
      httpOnly: true,
      secure: false,
      expires: new Date(),
    });

    res.status(200).json({ success: true, msg: "Logged out successfully." });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return sendErrorResponse(res, "Email is required.", 400);
    }

    const existingUser = await User.findOne({
      email,
    });

    if (!existingUser) {
      return sendErrorResponse(
        res,
        "Reset password mail sent successfully..",
        200
      );
    }

    const resetPasswordToken = getCryptoToken();
    const resetPasswordTokenExpiry = new Date(Date.now() + 1000 * 60 * 10);

    existingUser.resetPasswordToken = resetPasswordToken;
    existingUser.resetPasswordTokenExpiry = resetPasswordTokenExpiry;
    await existingUser.save();

    await sendResetPasswordEmail(
      existingUser.email,
      existingUser.resetPasswordToken
    );

    res
      .status(200)
      .json({ success: true, msg: "Reset password mail sent successfully." });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, token, password } = req.body;

    if (!email || !token || !password) {
      return sendErrorResponse(res, "All fields are required.", 400);
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return sendErrorResponse(res, "No such user exists.", 404);
    }

    if (new Date() > existingUser.resetPasswordTokenExpiry) {
      return sendErrorResponse(
        res,
        "Reset password token expired. Please generate a new one.",
        400
      );
    }

    if (existingUser.resetPasswordToken !== token) {
      return sendErrorResponse(res, "Invalid token.", 400);
    }

    existingUser.password = password;
    existingUser.resetPasswordToken = "";
    existingUser.resetPasswordTokenExpiry = null;

    await existingUser.save();

    res
      .status(200)
      .json({ success: true, msg: "Password reset successfully." });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

module.exports = {
  register,
  login,
  verifyEmail,
  logout,
  forgotPassword,
  resetPassword,
};
