const express = require("express");
const userRouter = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
  getUserInfo,
  registerUser,
  loginUser,
  forgotPassword,
  userLogOut,
  resetPassword,
} = require("../controllers/UserController");

// POST /api/users/register - Register a new user
userRouter.post("/register", registerUser);

// POST /api/users/login - Log in a user
userRouter.post("/login", loginUser);

// POST /api/users/forgot-password - Forgot password
userRouter.post("/forgot-password", forgotPassword);

// POST /api/users/reset-password - Reset password
userRouter.post("/reset-password/:token", resetPassword);

userRouter.post("/logout", userLogOut);

userRouter.get("/get-user", verifyToken, getUserInfo);

module.exports = userRouter;
