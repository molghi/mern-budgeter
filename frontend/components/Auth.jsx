import { useState } from "react";
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";

function Auth() {
  const [activeForm, setActiveForm] = useState(0); // 0 - signup, 1 - login

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-gray-900 rounded-lg shadow-md text-white">
      {/* Toggle buttons */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setActiveForm(0)}
          className={`px-4 py-2 bg-green-700 rounded-tl rounded-bl  transition duration-200 ${
            activeForm === 0 ? "opacity-100" : "opacity-50 hover:opacity-100"
          }`}
        >
          Sign Up
        </button>
        <button
          onClick={() => setActiveForm(1)}
          className={`px-4 py-2 bg-blue-700 rounded-tr rounded-br transition duration-200 ${
            activeForm === 1 ? "opacity-100" : "opacity-50 hover:opacity-100"
          }`}
        >
          Log In
        </button>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-semibold text-center mb-6">{activeForm === 0 ? "Sign Up" : "Log In"}</h2>

      {/* Form */}
      {activeForm === 0 ? <SignUpForm /> : <LogInForm />}
    </div>
  );
}

export default Auth;
