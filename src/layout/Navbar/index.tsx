import { Link } from "react-router-dom";
import type { User } from "@supabase/supabase-js";

interface NavbarProps {
  user?: User | null;
  logout: () => Promise<void>;
}

const Navbar = (props: NavbarProps) => {
  const { user, logout } = props;

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
        {user ? (
          <div className="flex items-center gap-2">
            <span className="text-gray-200">{user.user_metadata.username}</span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
