import { test, expect, describe, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import NewCampground from "../NewCampground";
import { MemoryRouter } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import userEvent from "@testing-library/user-event";

// Mock URL.createObjectURL globally
const mockObjectUrl = "blob:mock-url";
global.URL.createObjectURL = vi.fn(() => mockObjectUrl);

const renderComponent = (user: User) => {
  render(
    <MemoryRouter>
      <NewCampground user={user} />
    </MemoryRouter>
  );
};

afterEach(() => {
  vi.clearAllMocks();
  vi.restoreAllMocks();
});

describe("It renders NewCampground correctly", () => {
  test("On initial render", () => {
    const user = {
      id: "1",
      user_metadata: {
        username: "test",
      },
    } as unknown as User;

    renderComponent(user);

    const imageInput = screen.getByLabelText(/change image/i);
    const nameInput = screen.getByPlaceholderText(/name/i);
    const priceInput = screen.getByPlaceholderText(/price per night/i);
    const descriptionInput = screen.getByPlaceholderText(/description/i);
    const submitButton = screen.getByRole("button", { name: /create/i });

    expect(imageInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(priceInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("After uploading an image", async () => {
    const user = {
      id: "1",
      user_metadata: {
        username: "test",
      },
    } as unknown as User;

    renderComponent(user);

    const imageInput = screen.getByLabelText(/change image/i);
    const file = new File(["test"], "test.png", { type: "image/png" });

    await userEvent.upload(imageInput, file);

    const imagePreview = screen.getByRole("img", { name: /preview/i });
    expect(imagePreview).toBeInTheDocument();
    expect(imagePreview).toHaveAttribute("src", mockObjectUrl);
    expect(URL.createObjectURL).toHaveBeenCalledWith(file);
  });

  test("Filling and submitting the form", async () => {
    const user = {
      id: "1",
      user_metadata: {
        username: "test",
      },
    } as unknown as User;

    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({
        data: {
          id: "1",
          name: "Test Campground",
          price: 100,
          description: "Test description",
          image: file,
          user_id: user.id,
        },
      }),
    } as Response);

    renderComponent(user);

    const imageInput = screen.getByLabelText(/change image/i);
    const file = new File(["test"], "test.png", { type: "image/png" });
    await userEvent.upload(imageInput, file);

    const nameInput = screen.getByPlaceholderText(/name/i);
    const priceInput = screen.getByPlaceholderText(/price per night/i);
    const descriptionInput = screen.getByPlaceholderText(/description/i);

    await userEvent.type(nameInput, "Test Campground");
    await userEvent.type(priceInput, "100");
    await userEvent.type(descriptionInput, "Test description");

    const submitButton = screen.getByRole("button", { name: /create/i });
    await userEvent.click(submitButton);

    const formData = new FormData();
    formData.append("name", "Test Campground");
    formData.append("price", "100");
    formData.append("description", "Test description");
    formData.append("postImage", file);

    expect(fetchSpy).toHaveBeenCalledWith("http://localhost:3000/campground", {
      method: "POST",
      credentials: "include",
      body: formData,
    });
  });
});
