import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CampCard from "../index";
import { MemoryRouter } from "react-router-dom";

describe("CampCard", () => {
  it("renders camp information correctly", () => {
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
});
