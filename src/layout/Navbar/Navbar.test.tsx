import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from ".";
import type { User } from "@supabase/supabase-js";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

describe("renders Navbar correctly", () => {
  test("renders correctly", () => {
    render(
      <MemoryRouter>
        <Navbar user={null} logout={() => Promise.resolve()} />
      </MemoryRouter>
    );

    const YelpCampLink = screen.getByRole("link", { name: "YelpCamp" });
    const HomeLink = screen.getByRole("link", { name: "Home" });
    const CampgroundsLink = screen.getByRole("link", { name: "Campgrounds" });
    const AddNewCampgroundLink = screen.getByRole("link", {
      name: "New Campground",
    });

    expect(YelpCampLink).toBeInTheDocument();
    expect(HomeLink).toBeInTheDocument();
    expect(CampgroundsLink).toBeInTheDocument();
    expect(AddNewCampgroundLink).toBeInTheDocument();
  });

  test("If NOT logged in", () => {
    render(
      <MemoryRouter>
        <Navbar user={null} logout={() => Promise.resolve()} />
      </MemoryRouter>
    );

    const LoginLink = screen.getByRole("link", { name: "Login" });
    const RegisterLink = screen.getByRole("link", { name: "Register" });

    expect(LoginLink).toBeInTheDocument();
    expect(RegisterLink).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "My Campgrounds" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Logout" })
    ).not.toBeInTheDocument();
  });

  test("If logged in", () => {
    const user = {
      user_metadata: {
        username: "test",
      },
    } as unknown as User; // Used for testing purposes, since we don't need all the User data

    render(
      <MemoryRouter>
        <Navbar user={user} logout={() => Promise.resolve()} />
      </MemoryRouter>
    );

    const myCampgroundsLink = screen.getByRole("link", {
      name: "My Campgrounds",
    });
    const logoutButton = screen.getByRole("button", { name: "Logout" });
    const username = screen.getByText(user.user_metadata.username);

    expect(myCampgroundsLink).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Login" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Register" })
    ).not.toBeInTheDocument();
  });
});

describe("Navbar links to create a new campground", () => {
  test("If logged in", () => {
    const user = {
      user_metadata: {
        username: "test",
      },
    } as unknown as User; // Used for testing purposes, since we don't need all the User data

    render(
      <MemoryRouter>
        <Navbar user={user} logout={() => Promise.resolve()} />
      </MemoryRouter>
    );

    const newCampgroundLink = screen.getByRole("link", {
      name: "New Campground",
    });

    expect(newCampgroundLink).toHaveAttribute("href", "/campgrounds/add");
  });

  test("If NOT logged in", () => {
    render(
      <MemoryRouter>
        <Navbar user={null} logout={() => Promise.resolve()} />
      </MemoryRouter>
    );

    const newCampgroundLink = screen.getByRole("link", {
      name: "New Campground",
    });

    expect(newCampgroundLink).toHaveAttribute("href", "/login");
  });
});

test("Logout button triggers logout", async () => {
  const logout = vi.fn();

  const user = {
    user_metadata: {
      username: "test",
    },
  } as unknown as User; // Used for testing purposes, since we don't need all the User data

  render(
    <MemoryRouter>
      <Navbar user={user} logout={logout} />
    </MemoryRouter>
  );

  const logoutButton = screen.getByRole("button", { name: "Logout" });

  await userEvent.click(logoutButton);

  expect(logout).toHaveBeenCalled();
});
