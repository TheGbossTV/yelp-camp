import React from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="m-auto w-1/3 border border-gray-300 rounded-md p-4 flex flex-col items-center shadow-md">
      <form
        onSubmit={(e) => handleRegister(e)}
        method="post"
        className="flex flex-col gap-2 items-center w-[200px]"
      >
        <h1 className="text-2xl font-bold">Register</h1>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md w-[100px]"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
