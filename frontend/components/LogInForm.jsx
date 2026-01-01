import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { context } from "../context/MyContext";

function LogInForm() {
  const { setFlashMessageContent, setIsLoggedIn, setUsername, setUserEmail } = useContext(context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef();

  const logIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login", { email, password }, { withCredentials: true });
      if (response.status === 200) {
        setErrorMsg("");
        setFlashMessageContent(["success", "User logged in!"]);
        setIsLoggedIn(true);
        setUsername(response.data.name);
        setUserEmail(response.data.email);
      }
    } catch (error) {
      console.log("OOPS!", error);
      setErrorMsg(error.response.data.msg);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      {/* Form */}
      <form className="flex flex-col gap-4" onSubmit={logIn}>
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
        <button
          type="submit"
          className="block mt-4 px-4 py-2 bg-blue-500 text-gray-900 font-semibold rounded transition duration-200 hover:opacity-60 active:opacity-40"
        >
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
