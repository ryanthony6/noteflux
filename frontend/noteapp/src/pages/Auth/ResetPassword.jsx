import React, { useState } from "react";
import PasswordInput from "../../components/Inputs/PasswordInput";
import axiosInstance from "../../utils/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { token } = useParams(); // This will get the token from the URL like /reset-password/:token
  // Reset Password API Call

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!password) {
      setError("Please enter your password");
    } else if (!confirmPassword) {
      setError("Please confirm your password");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
    }

    try {
      const response = await axiosInstance.post(
        `/api/users/reset-password/${token}`,
        {
          password: password,
          confirmPassword: confirmPassword,
        }
      );

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <>
      <section className="flex items-center justify-center h-screen">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleResetPassword}>
            <h4 className="text-2xl mb-7">Reset Password</h4>

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordInput
              placeholder={"Confirm Password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button type="submit" className="btn-primary">
              Login
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
