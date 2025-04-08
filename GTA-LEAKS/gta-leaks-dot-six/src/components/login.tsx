import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(): JSX.Element {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    try {
      const response = await axios.post("/auth/login", { email, password });
      console.log(response.data.token);
      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        alert("Login successful");
        navigate("/");
      } else {
        alert("Token not found in response");
      }
    } catch (error) {
      console.error("Login failed: ", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      alert("Failed to login");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex bg-gradient-to-r from-purple-950 via-black to-indigo-950 h-screen"
    >
      <div className="rounded-xl border-white border-[1px] justify-center bg-black m-auto h-56 w-[500px]">
        <div className="p-3 gap-2 text-xl text-white">
          <p className="pb-3">Log In to your account</p>
          <input
            type="email"
            placeholder="Email"
            ref={emailRef}
            required
            className="p-2 block w-full rounded-sm border-gray-300 bg-purple-950 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 focus:bg-purple-800 transition-all duration-500"
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            required
            className="p-2 block w-full rounded-sm border-gray-300 bg-purple-950 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 focus:bg-purple-800 transition-all duration-500"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="mt-1 rounded-lg border-2 text-purple-700 border-transparent bg-transparent px-5 py-2.5 text-center text-sm font-medium shadow-none transition-all hover:border-purple-700 hover:text-white duration-500 disabled:bg-transparent disabled:text-gray-400"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
