import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setMessage(""); // Clear previous messages

    if (!email) {
      setError("Please enter a valid email address.");
      return;
    }

    // Set loading to true before API call
    setLoading(true);

    // API Call
    try {
      const response = await axiosInstance.post("/api/users/forgot-password", {
        email: email,
      });

      if (response.data && !response.data.error) {
        setMessage(response.data.message);
        setError(null); // Clear error if request was successful
      } else {
        setError(response.data.message);
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
    } finally {
      // Set loading to false after the request is complete
      setLoading(false);
    }
  };

  return (
    <>
      <section className="flex items-center justify-center h-screen">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleForgotPassword}>
            <h4 className="text-2xl mb-7">Enter your email</h4>
            <input
              type="email"
              value={email}
              placeholder="Email"
              className="input-box"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            {message && (
              <p className="text-green-500 text-xs pb-1">{message}</p>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={loading} // Disable the button when loading
            >
              {loading ? "Sending..." : "Verify Email"}{" "}
              {/* Conditionally render text */}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => navigate(-1)}
              className="text-xs text-primary"
            >
              Back to previous page
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
