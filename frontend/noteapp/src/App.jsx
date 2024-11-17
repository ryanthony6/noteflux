import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/Loaders/Loading";

const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const EmailVerification = lazy(() => import("./pages/Auth/ForgotPassword"));
const ForgotPassword = lazy(() => import("./pages/Auth/ResetPassword"));
const Home = lazy(() => import("./pages/Home/Home"));
const Error = lazy(() => import("./pages/Additions/Error"));
const Dashboard = lazy(() => import("./pages/Home/Dashboard"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/tes" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<EmailVerification />} />
        <Route path="/resetpassword/:token" element={<ForgotPassword />} />
        <Route path="/error" element={<Error />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/tes1" element={<Hehe />} /> */}
      </Routes>
      </Suspense>
     
    </Router>
  );
};

export default App;
