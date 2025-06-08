import { Link } from "react-router-dom";
import type { User } from "@supabase/supabase-js";

interface HomePageProps {
  user: User | null;
}

const HomePage = (props: HomePageProps) => {
  const { user } = props;
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-6">
            Welcome to YelpCamp
          </h1>
          <p className="text-2xl text-gray-200 mb-8">
            Discover and share the best camping spots around the world
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/campgrounds"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200"
            >
              View Campgrounds
            </Link>
            {!user && (
              <Link
                to="/register"
                className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200"
              >
                Start Your Journey
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose YelpCamp?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🏕️</div>
              <h3 className="text-xl font-semibold mb-2">Trusted Reviews</h3>
              <p className="text-gray-600">
                Real reviews from passionate campers to help you find the
                perfect spot
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold mb-2">Detailed Maps</h3>
              <p className="text-gray-600">
                Interactive maps and directions to make your journey easier
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">
                Connect with fellow outdoor enthusiasts and share experiences
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-gray-100 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Find Your Next Adventure
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="text"
              placeholder="Search for campgrounds..."
              className="px-6 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none flex-1 max-w-lg"
            />
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
