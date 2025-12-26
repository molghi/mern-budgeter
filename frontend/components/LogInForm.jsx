import { useState, useRef, useEffect } from "react";

function LogInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef();

  const signUp = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      {/* Form */}
      <form className="flex flex-col gap-4" onSubmit={signUp}>
        {/* Email */}
        <input
          ref={inputRef}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="Email"
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-white transition duration-200"
        />

        {/* Password */}
        <input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-white transition duration-200"
        />

        {/* Btn */}
        <button type="submit" className="block mt-4 px-4 py-2 bg-blue-500 text-gray-900 font-semibold rounded transition duration-200 hover:opacity-60">
          Log In
        </button>

        {/* Validation Errors */}
        {errorMsg && (
          <div className="mt-3 text-[red]">
            <span className="font-bold">Error:</span> {errorMsg}
          </div>
        )}
      </form>
    </>
  );
}

export default LogInForm;
