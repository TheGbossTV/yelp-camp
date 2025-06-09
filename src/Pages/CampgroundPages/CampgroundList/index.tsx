import React, { useEffect, useState } from "react";
import type { Campground } from "../../../types/types";

import CampCard from "../../../components/CampCard";
import { Link } from "react-router-dom";

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
    <div className="flex flex-col gap-8 px-20 py-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Campgrounds</h1>
        <Link
          to="/campgrounds/new"
          className="bg-orange-500 text-white px-4 py-2 rounded-md"
        >
          Add New Campground
        </Link>
      </div>
      {campgrounds.map((campground) => (
        <CampCard key={campground.id} campground={campground} />
      ))}
    </div>
  );
};

export default CampgroundList;
