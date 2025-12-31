import { useState, useRef, useEffect, useContext } from "react";
import { context } from "../context/MyContext";
import axios from "axios";

function SignUpForm() {
  const { setFlashMessageContent, setIsLoggedIn, setUsername, setUserEmail } = useContext(context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef();

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/signup", { email, password, passwordConfirm }, { withCredentials: true });
      // axios.defaults.withCredentials = true;
      // axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`; // include token in subsequent Axios headers
      if (response.status === 200 || response.status === 201) {
        setErrorMsg("");
        setFlashMessageContent(["success", "User profile created!"]);
        setIsLoggedIn(true);
        setUsername(response.data.name);
        setUserEmail(response.data.email);
      }
    } catch (error) {
      console.error("OOPS!", error);
      setErrorMsg(error.response.data.msg);
    }
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

        {/* Confirm Password */}
        <input
          required
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          type="password"
          placeholder="Confirm Password"
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-white transition duration-200"
        />

        {/* Btn */}
        <button
          type="submit"
          className="block mt-4 px-4 py-2 bg-green-500 text-gray-900 font-semibold rounded transition duration-200 hover:opacity-60 active:opacity-40"
        >
          Sign Up
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

export default SignUpForm;
