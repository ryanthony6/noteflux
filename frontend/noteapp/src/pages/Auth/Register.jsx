import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Inputs/PasswordInput";
import { validateEmail } from "../../utils/auth";
import axiosInstance from "../../utils/axiosInstance";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
    } else if (!validateEmail(email)) {
      setError("Please enter a valid email address");
    } else if (!password) {
      setError("Please enter your password");
    } else if (!confirmPassword) {
      setError("Please confirm your password");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
    }

    // Register API Call
    try {
      const response = await axiosInstance.post("/api/users/register", {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });
      setIsRegistered(true);

      
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

  useEffect(() => {
    if (isRegistered) {
      navigate("/login"); // Only navigates when isRegistered becomes true
    }
  }, [isRegistered, navigate]);

  return (
    <>
      <section className="flex items-center justify-center h-screen">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleRegister}>
            <h4 className="text-2xl mb-7">Sign Up</h4>
            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
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
            <PasswordInput
              value={confirmPassword}
              placeholder={"Confirm Password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button type="submit" className="btn-primary">
              Sign Up
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account? {""}
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
