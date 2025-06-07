import React from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      navigate("/");
    } else {
      const data = await response.json();
      // TODO: Add a toast notification
      // - If credentials are incorrect, show a toast notification
      // - If credentials are correct, show a toast notification
      // - If credentials are missing, show a toast notification
      console.error(data.message, "please try a different email or password");
    }
  };

  return (
    <div className="m-auto w-1/3 border border-gray-300 rounded-md p-4 flex flex-col items-center shadow-md">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-2 items-center w-[200px]"
      >
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
