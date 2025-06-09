import React, { useEffect, useState } from "react";
import type { Campground } from "../../../types/types";

const CampgroundList = () => {
  const [campgrounds, setCampgrounds] = useState<Campground[]>([]);

  const fetchCampgrounds = async () => {
    const response = await fetch("http://localhost:3000/campground");
    const data = await response.json();
    setCampgrounds(data);
  };

  useEffect(() => {
    fetchCampgrounds();
  }, []);

  return (
    <div>
      {campgrounds.map((campground) => (
        <div key={campground.id}>
          <p>{campground.title}</p>
          <p>{campground.price}</p>
          <p>{campground.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CampgroundList;
