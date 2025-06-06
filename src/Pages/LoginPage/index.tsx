import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="m-auto w-1/3 border border-gray-300 rounded-md p-4 flex flex-col items-center shadow-md">
      <form className="flex flex-col gap-2 items-center w-[200px]">
        <h1 className="text-2xl font-bold">Login</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border border-gray-300 rounded-md p-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded-md w-[100px]"
        >
          Login
        </button>
        <p className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
          Forgot password?
        </p>
        <p className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
