import { render, screen, waitFor } from "@testing-library/react";
import { test, expect, vi, describe, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../LoginPage";
import userEvent from "@testing-library/user-event";

afterEach(() => {
  vi.clearAllMocks();
  vi.restoreAllMocks();
});

test("renders correctly", () => {
  render(
    <MemoryRouter>
      <LoginPage checkSession={() => Promise.resolve()} />
    </MemoryRouter>
  );

  const header = screen.getByRole("heading", { name: "Login" });
  const emailInput = screen.getByPlaceholderText("Email");
  const passwordInput = screen.getByPlaceholderText("Password");
  const loginButton = screen.getByRole("button", { name: "Login" });
  // TODO: ADD FORGOT PASSWORD LINK TO TEST
  const registerLink = screen.getByRole("link", { name: "Register" });

  expect(header).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
  expect(registerLink).toBeInTheDocument();
  expect(registerLink).toHaveAttribute("href", "/register");
});

describe("Login functionality", () => {
  test("Login button triggers login", async () => {
    // vi.spyOn creates a spy that watches and records calls to the 'fetch' function
    // mockResolvedValue sets up what the mock should return when called
    const fetchMock = vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      // The actual server returns { message: "Login successful", user: data.user }
      // so we should match that structure
      json: async () => ({
        message: "Login successful",
        user: { id: "test-id", email: "test@test.com" },
      }),
    } as Response);

    // Create a mock function for checkSession that returns a Promise
    // This simulates the parent component's function that updates auth state
    const checkSessionMock = vi.fn().mockResolvedValue(undefined);

    // Render the component with required props inside a Router context
    // MemoryRouter is used because we need routing context but don't want actual navigation
    render(
      <MemoryRouter>
        <LoginPage checkSession={checkSessionMock} />
      </MemoryRouter>
    );

    // Get the form elements by their accessibility attributes
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: "Login" });

    // Simulate user typing and clicking using userEvent
    // userEvent is preferred over fireEvent as it more closely simulates real user interactions
    await userEvent.type(emailInput, "test@test.com");
    await userEvent.type(passwordInput, "password");
    await userEvent.click(loginButton);

    // waitFor is used because the login process is asynchronous
    // it retries the assertions until they pass or timeout
    await waitFor(() => {
      // Check if fetch was called with the correct URL and data
      expect(fetchMock).toHaveBeenCalledWith(
        "http://localhost:3000/login",
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "test@test.com",
            password: "password",
          }),
          credentials: "include", // This is important as the server uses sessions
        })
      );

      // Verify checkSession was called after successful login
      expect(checkSessionMock).toHaveBeenCalled();
    });

    // Clean up the mock to prevent affecting other tests
    fetchMock.mockRestore();
  });

  // We should also add a test for failed login
  test("handles login failure correctly", async () => {
    const fetchMock = vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      json: async () => ({
        message: "Invalid email or password",
      }),
    } as Response);

    const checkSessionMock = vi.fn().mockResolvedValue(undefined);
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <MemoryRouter>
        <LoginPage checkSession={checkSessionMock} />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: "Login" });

    await userEvent.type(emailInput, "wrong@email.com");
    await userEvent.type(passwordInput, "wrongpassword");
    await userEvent.click(loginButton);

    await waitFor(() => {
      expect(checkSessionMock).not.toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith(
        "Invalid email or password",
        "please try a different email or password"
      );
    });

    fetchMock.mockRestore();
    consoleSpy.mockRestore();
  });
});
