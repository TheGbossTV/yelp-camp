import { Link } from "react-router-dom";
import type { User } from "@supabase/supabase-js";

interface NavbarProps {
  user?: User | null;
  logout: () => Promise<void>;
}

const Navbar = (props: NavbarProps) => {
  const { user, logout } = props;

  // Function to scroll to top when navigating
  const scrollToTop = () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTo(0, 0);
    document.body.scrollTo(0, 0);
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
  };

  return (
    <nav className="flex items-center p-2 bg-gray-900 gap-2">
      <Link
        to={"/"}
        className="text-2xl font-bold text-white"
        onClick={scrollToTop}
      >
        YelpCamp
      </Link>
      <Link
        to={"/"}
        className="text-gray-200 px-4 py-2 hover:text-gray-50"
        onClick={scrollToTop}
      >
        Home
      </Link>
      <Link
        to={"/campgrounds"}
        className="text-gray-200 px-4 py-2 hover:text-gray-50"
        onClick={scrollToTop}
      >
        Campgrounds
      </Link>
      <Link
        to={user ? "/campgrounds/add" : "/login"}
        className="text-gray-200 px-4 py-2 hover:text-gray-50"
        onClick={scrollToTop}
      >
        New Campground
      </Link>
      <div className="ml-auto flex gap-2">
        {user ? (
          <div className="flex items-center gap-2">
            <Link
              to={"/campgrounds/my-campgrounds"}
              className="text-gray-200 px-4 py-2 hover:text-gray-50"
              onClick={scrollToTop}
            >
              My Campgrounds
            </Link>
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
              onClick={scrollToTop}
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className="text-gray-200 px-4 py-2 hover:text-gray-50"
              onClick={scrollToTop}
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
