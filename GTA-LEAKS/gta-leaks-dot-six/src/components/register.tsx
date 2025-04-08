import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Register(): JSX.Element {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const nickname = nicknameRef.current?.value;

    try {
      await axios.post("/auth/register", { email, password, nickname });
      alert("Account created successfully, you can now log in");
      navigate("/login");
    } catch (error) {
      console.error("Registartion failed: ", error);
      alert("Failed to register account");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex bg-gradient-to-r from-indigo-950 via-black to-purple-950 h-screen"
    >
      <div className="rounded-xl border-white border-[1px] justify-center bg-black m-auto h-80 w-[500px]">
        <div className="p-3 gap-2 text-xl text-white">
          <p className="pb-3">Create your account</p>
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
          <br />
          <input
            type="text"
            placeholder="Nickname"
            ref={nicknameRef}
            required
            className="p-2 block w-full rounded-sm border-gray-300 bg-purple-950 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 focus:bg-purple-800 transition-all duration-500"
          />
          <input id="remember" type="checkbox" className="m-2" />
          <label htmlFor="remember" className="text-base text-gray-400">
            I would like to receive news and promotional messages
          </label>
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-lg border-2 text-purple-700 border-transparent bg-transparent px-5 py-2.5 text-center text-sm font-medium shadow-none transition-all hover:border-purple-700 hover:text-white duration-500 disabled:bg-transparent disabled:text-gray-400"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
