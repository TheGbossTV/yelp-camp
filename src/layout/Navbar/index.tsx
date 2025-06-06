import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center p-4 bg-gray-900 gap-2">
      <h1 className="text-2xl font-bold text-white">YelpCamp</h1>
      <button className="text-gray-200 px-4 py-2 rounded-md hover:text-gray-50">
        Home
      </button>
      <button className="text-gray-200 px-4 py-2 rounded-md hover:text-gray-50">
        Campgrounds
      </button>
      <button className="text-gray-200 px-4 py-2 rounded-md hover:text-gray-50">
        New Campground
      </button>
    </nav>
  );
};

export default Navbar;
