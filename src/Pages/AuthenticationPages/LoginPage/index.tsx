import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BackgroundImage from "../../../components/BackgroundImage";

interface LoginPageProps {
  checkSession: () => Promise<void>;
}

const LoginPage = (props: LoginPageProps) => {
  const navigate = useNavigate();

  const { checkSession } = props;

  /**
   * Handles form submission for login
   *
   * This function:
   * 1. Prevents default form submission
   * 2. Extracts email/password from the form
   * 3. Sends a POST request to the login endpoint with credentials included
   * 4. On success:
   *    - Calls checkSession to update app authentication state
   *    - Navigates to the home page
   * 5. On failure, displays error message
   *
   * The 'credentials: include' option is essential for the session cookie
   * to be stored in the browser after login.
   */
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Essential for storing the session cookie
      });

      if (response.ok) {
        // After successful login, refresh the session
        // This updates the parent component's authentication state
        await checkSession();
        navigate("/");
      } else {
        const data = await response.json();
        console.error(data.message, "please try a different email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <BackgroundImage />
      <div className="m-auto lg:w-1/4 md:w-1/3 sm:w-1/2 border border-gray-300 rounded-md p-4 flex flex-col items-center drop-shadow-lg bg-gray-100">
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
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 cursor-pointer hover:text-blue-700"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
