import { afterEach, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CampCard from "../index";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

afterEach(() => {
  vi.clearAllMocks();
  vi.restoreAllMocks();
});

describe("CampCard renders correctly", () => {
  test("renders camp information correctly", () => {
    const campData = {
      id: "1",
      title: "Test Camp",
      price: "50",
      description: "A test campground",
      image_url: "test-image.jpg",
    };

    render(
      <MemoryRouter>
        <CampCard campground={campData} />
      </MemoryRouter>
    );

    expect(screen.getByText("Test Camp")).toBeInTheDocument();
    expect(screen.getByText("A test campground")).toBeInTheDocument();
    expect(screen.getByText("50€ per night")).toBeInTheDocument();
  });

  test("Image is displayed correctly", () => {
    const campData = {
      id: "1",
      title: "Test Camp",
      price: "50",
      description: "A test campground",
      image_url: "test-image.jpg",
    };

    render(
      <MemoryRouter>
        <CampCard campground={campData} />
      </MemoryRouter>
    );

    const image = screen.getByRole("img");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", campData.image_url);
    expect(image).toHaveAttribute("alt", campData.title);
  });
});

describe("Display edit and delete buttons", () => {
  test("is logged in", () => {
    const campData = {
      id: "1",
      title: "Test Camp",
      price: "50",
      description: "A test campground",
      image_url: "test-image.jpg",
    };

    render(
      <MemoryRouter>
        <CampCard campground={campData} isMyCampground={true} />
      </MemoryRouter>
    );

    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  test("is not logged in or not the owner", () => {
    const campData = {
      id: "1",
      title: "Test Camp",
      price: "50",
      description: "A test campground",
      image_url: "test-image.jpg",
    };

    render(
      <MemoryRouter>
        <CampCard campground={campData} />
      </MemoryRouter>
    );

    const editButton = screen.queryByText("Edit");
    const deleteButton = screen.queryByText("Delete");

    expect(editButton).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
  });
});

test("Delete button triggers fetch and reload on success", async () => {
  const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
  } as Response);

  const campData = {
    id: "1",
    title: "Test Camp",
    price: "50",
    description: "A test campground",
    image_url: "test-image.jpg",
  };

  render(
    <MemoryRouter>
      <CampCard campground={campData} isMyCampground={true} />
    </MemoryRouter>
  );

  const deleteButton = screen.getByText("Delete");

  await userEvent.click(deleteButton);

  expect(fetchSpy).toHaveBeenCalledWith(
    "http://localhost:3000/campground/1",
    expect.objectContaining({ method: "DELETE" })
  );
});
