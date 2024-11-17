import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Inputs/PasswordInput";
import { validateEmail } from "../../utils/auth";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
    } else if (!password) {
      setError("Please enter your password");
    } else {
      setError("");
    }

    // Login API Call
    try {
      const response = await axiosInstance.post("/api/users/login", {
        email: email,
        password: password,
      });

      if (response.data) {
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <>
      <section className="flex items-center justify-center h-screen">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="text-xs text-right pb-2 lg:text-sm">
              <Link to={"/forgotpassword"}>Forgot Password</Link>
            </div>

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button type="submit" className="btn-primary">
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Don't have an account yet? {""}
              <Link
                to="/register"
                className="font-medium text-primary underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
