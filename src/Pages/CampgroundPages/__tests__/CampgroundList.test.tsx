import { render, screen } from "@testing-library/react";
import CampgroundList from "../CampgroundList";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";

const mockCampgrounds = [
  {
    id: "1",
    title: "Test Camp 1",
    price: "100",
    description: "A test description",
    created_at: "2024-01-01",
    created_by: "user1",
    email: "test@test.com",
    image_url: "http://example.com/image1.jpg",
  },
  {
    id: "2",
    title: "Test Camp 2",
    price: "200",
    description: "Another test description",
    created_at: "2024-01-02",
    created_by: "user2",
    email: "test2@test.com",
    image_url: "http://example.com/image2.jpg",
  },
];

describe("CampgroundList Component", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders Add New Campground link", async () => {
    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({
      json: async () => [],
    } as Response);

    render(
      <MemoryRouter>
        <CampgroundList />
      </MemoryRouter>
    );

    const addNewCampgroundLink = screen.getByRole("link", {
      name: /add new campground/i,
    });

    expect(addNewCampgroundLink).toHaveAttribute("href", "/campgrounds/new");
    expect(fetchSpy).toHaveBeenCalledWith("http://localhost:3000/campground");
  });

  test("renders campgrounds after successful fetch", async () => {
    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({
      json: async () => mockCampgrounds,
    } as Response);

    render(
      <MemoryRouter>
        <CampgroundList />
      </MemoryRouter>
    );

    // Wait for the campgrounds to be rendered
    const camp1 = await screen.findByText("Test Camp 1");
    const camp2 = await screen.findByText("Test Camp 2");

    expect(camp1).toBeInTheDocument();
    expect(camp2).toBeInTheDocument();
    expect(fetchSpy).toHaveBeenCalledWith("http://localhost:3000/campground");
  });
});
