const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name) {
    return res.status(400).json({ error: true, message: "Name is required" });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: true, message: "Password must be at least 8 characters" });
  }
  if (!confirmPassword) {
    return res
      .status(400)
      .json({ error: true, message: "Please confirm your password!" });
  }

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ error: true, message: "Passwords do not match" });
  }

  try {
    // Check if the user already exists
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        error: true,
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 15);

    // Save the new user to the database
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Send a success response
    return res.status(201).json({
      error: false,
      message: "Registration successful",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({
      error: true,
      message: "An error occurred while registering. Please try again later.",
    });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const userInfo = await User.findOne({ email });

  if (!userInfo) {
    return res
      .status(400)
      .json({ error: true, message: "User does not exist" });
  }

  try {
    const isMatch = await bcrypt.compare(password, userInfo.password);

    if (isMatch) {
      const token = jwt.sign(
        {
          user: {
            _id: userInfo._id,
            name: userInfo.name,
            email: userInfo.email,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "24h" }
      );

      // Set HTTP-only cookie with token
      res.cookie("token", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production", // use Secure in production
        // sameSite: "Strict", // Prevents the cookie from being sent in cross-site requests
        // maxAge: 30 * 60 * 1000, // 30 minutes
      });

      return res.json({
        error: false,
        token,
        message: "Login Success",
      });
    } else {
      return res
        .status(400)
        .json({ error: true, message: "Wrong Email or Password" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

// Forgot password
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  // Check if user exists in the database
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ error: true, message: "Enter a Valid Email Address" });
  }

  // Generate a JWT token
  const token = jwt.sign({ id: user._id }, process.env.RESET_PASSWORD_SECRET, {
    expiresIn: "1h",
  });

  // Create a reset password link (assuming your frontend has a /reset-password route)
  const resetLink = `${process.env.DEVELOPMENT_URL}/resetpassword/${token}`;

  // Configure Nodemailer to send the email
  const transporter = nodemailer.createTransport({
    service: "gmail", // or use any email provider service
    auth: {
      user: process.env.EMAIL, // Your email
      pass: process.env.EMAIL_PASSWORD, // Your email password or app password
    },
  });

  // Compose the email
  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: "Password Reset Request",
    html: ` <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
      <h2 style="color: #333;">Password Reset</h2>
      <p style="color: #555;">Click the button below to reset your password:</p>
      <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 4px; text-align: center;">Reset Password</a>
      <p style="color: #777; margin-top: 20px;">This link will expire in 1 hour.</p>
    </div>`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    // console.log("Email sent: " + info.response); // Add this to see if email is being sent
    return res.status(200).json({
      error: false,
      email: user.email,
      token: token,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.error("Error sending email: ", error); // Add this to log email sending errors
    return res
      .status(500)
      .json({ error: true, message: "Error sending email. Try again later." });
  }
};

// Reset password
const resetPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;
  const { token } = req.params;

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: true, message: "Password must be at least 8 characters" });
  }
  if (!confirmPassword) {
    return res
      .status(400)
      .json({ error: true, message: "Please confirm your password!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid or expired token" });
    }

    const salt = await bcrypt.genSalt(15);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    return res.status(200).json({
      error: false,
      message: "Password successfully updated",
    });
  } catch (error) {
    console.error("Error resetting password: ", error);
    return res
      .status(400)
      .json({ error: true, message: "Invalid or expired token" });
  }
};

const userLogOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ error: false, message: "User logged out" });
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
};
// Get user info
const getUserInfo = async (req, res) => {
  const { user } = req.user;

  try {
    // Find the user by their ID
    const isUser = await User.findOne({ _id: user._id });

    // Check if the user was found
    if (!isUser) {
      // User not found; send a 404 Not Found response
      return res
        .status(404)
        .json({ error: true, message: "User does not exist" });
    }

    // User found; send the user data and success message
    return res.json({
      user: {
        name: isUser.name,
        email: isUser.email,
        id: isUser._id,
        createdAt: isUser.createdOn,
      },
      message: "User fetched successfully",
    });
  } catch (err) {
    // Handle unexpected errors
    console.error("Error fetching user:", err);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  userLogOut,
  getUserInfo,
};
