import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center p-2 bg-gray-900 gap-2">
      <Link to={"/"} className="text-2xl font-bold text-white">
        YelpCamp
      </Link>
      <Link to={"/"} className="text-gray-200 px-4 py-2 hover:text-gray-50">
        Home
      </Link>
      <Link
        to={"/campgrounds"}
        className="text-gray-200 px-4 py-2 hover:text-gray-50"
      >
        Campgrounds
      </Link>
      <Link
        to={"/new-campground"}
        className="text-gray-200 px-4 py-2 hover:text-gray-50"
      >
        New Campground
      </Link>
      <div className="ml-auto flex gap-2">
        <Link
          to={"/login"}
          className="text-gray-200 px-4 py-2 hover:text-gray-50"
        >
          Login
        </Link>
        <Link
          to={"/register"}
          className="text-gray-200 px-4 py-2 hover:text-gray-50"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
