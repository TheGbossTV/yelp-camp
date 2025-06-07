import React from "react";
import { useNavigate } from "react-router-dom";

interface RegisterPageProps {
  checkSession: () => Promise<void>;
}

const RegisterPage = (props: RegisterPageProps) => {
  const navigate = useNavigate();

  const { checkSession } = props;

  /**
   * Handles form submission for registration
   *
   * This function:
   * 1. Prevents default form submission
   * 2. Extracts username, email, and password from the form
   * 3. Sends a POST request to the register endpoint with credentials included
   * 4. On success:
   *    - Calls checkSession to update app authentication state
   *      (if auto-confirmation is enabled in Supabase)
   *    - Navigates to the home page
   * 5. On failure, displays error message
   *
   * The 'credentials: include' option allows the server to set a session cookie
   * if auto-confirmation is enabled and the user is immediately logged in.
   */
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
        credentials: "include", // Important for storing session cookie if auto-confirmed
      });

      if (response.ok) {
        // After successful registration, refresh the session
        // This updates the parent component's authentication state
        // Note: This will only create a session if auto-confirmation is enabled
        await checkSession();
        navigate("/");
      } else {
        const data = await response.json();
        console.error(data.message);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
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
