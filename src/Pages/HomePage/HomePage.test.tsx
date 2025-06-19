import { test, expect, describe, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from ".";
import { MemoryRouter } from "react-router-dom";
import { type User } from "@supabase/supabase-js";

const renderComponent = (user: User) => {
  render(
    <MemoryRouter>
      <HomePage user={user} />
    </MemoryRouter>
  );
};

afterEach(() => vi.clearAllMocks());

describe("It renders HomePage correctly", () => {
  test("Is logged in", () => {
    const user = {
      id: "1",
      user_metadata: {
        username: "test",
      },
    } as unknown as User;

    renderComponent(user);

    const header = screen.getByRole("heading", { name: "Welcome to YelpCamp" });
    const viewCampgroundsButton = screen.getByRole("link", {
      name: "View Campgrounds",
    });
    const startYourJourneyButton = screen.queryByRole("link", {
      name: "Start Your Journey",
    });

    expect(header).toBeInTheDocument();
    expect(viewCampgroundsButton).toBeInTheDocument();
    expect(startYourJourneyButton).not.toBeInTheDocument();
  });

  test("Is not logged in", () => {
    renderComponent(null as unknown as User);

    const header = screen.getByRole("heading", { name: "Welcome to YelpCamp" });
    const viewCampgroundsButton = screen.getByRole("link", {
      name: "View Campgrounds",
    });
    const startYourJourneyButton = screen.getByRole("link", {
      name: "Start Your Journey",
    });

    expect(header).toBeInTheDocument();
    expect(viewCampgroundsButton).toBeInTheDocument();
    expect(startYourJourneyButton).toBeInTheDocument();
  });
});

describe("Button functionality", () => {
  test("View Campgrounds button", async () => {
    renderComponent(null as unknown as User);

    const viewCampgroundsButton = screen.getByRole("link", {
      name: "View Campgrounds",
    });

    expect(viewCampgroundsButton).toHaveAttribute("href", "/campgrounds");
  });

  test("Start Your Journey button", async () => {
    renderComponent(null as unknown as User);

    const startYourJourneyButton = screen.getByRole("link", {
      name: "Start Your Journey",
    });

    expect(startYourJourneyButton).toHaveAttribute("href", "/login");
  });
});
