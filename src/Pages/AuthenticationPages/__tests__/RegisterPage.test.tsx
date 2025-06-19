import { test, expect, vi, describe, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import RegisterPage from "../RegisterPage";

afterEach(() => {
  vi.clearAllMocks();
  vi.restoreAllMocks();
});

const renderComponent = (
  checkSession: () => Promise<void> = () => Promise.resolve()
) => {
  render(
    <MemoryRouter>
      <RegisterPage checkSession={checkSession} />
    </MemoryRouter>
  );

  return {
    header: screen.getByRole("heading", { name: "Register" }),
    usernameInput: screen.getByPlaceholderText("Username"),
    emailInput: screen.getByPlaceholderText("Email"),
    passwordInput: screen.getByPlaceholderText("Password"),
    registerButton: screen.getByRole("button", { name: "Register" }),
  };
};

test("renders correctly", () => {
  const { header, usernameInput, emailInput, passwordInput, registerButton } =
    renderComponent();

  expect(header).toBeInTheDocument();
  expect(usernameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(registerButton).toBeInTheDocument();
});

describe("Register functionality", () => {
  test("Register button triggers register", async () => {
    const checkSession = vi.fn();

    const fetchMock = vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
    } as Response);

    const { usernameInput, emailInput, passwordInput, registerButton } =
      renderComponent(checkSession);

    await userEvent.type(usernameInput, "test");
    await userEvent.type(emailInput, "test@test.com");
    await userEvent.type(passwordInput, "password");
    await userEvent.click(registerButton);

    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:3000/register",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          username: "test",
          email: "test@test.com",
          password: "password",
        }),
        credentials: "include",
      })
    );

    expect(checkSession).toHaveBeenCalled();
  });
});
