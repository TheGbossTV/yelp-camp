import { Link } from "react-router-dom";
import type { Campground } from "../../types/types";

interface CampCardProps {
  campground: Campground;
  isMyCampground?: boolean;
}

const CampCard = (props: CampCardProps) => {
  const { campground, isMyCampground = false } = props;
  return (
    <div className="flex gap-2 border-2 border-gray-900 rounded-lg p-2 bg-orange-100 h-[220px]">
      <div className="min-h-[200px] min-w-[200px] border-2 border-black rounded-lg">
        Image placeholder
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-2 items-baseline w-full">
          <h1 className="text-4xl font-bold">{campground.title}</h1>
          <p>
            <b>Price:</b> {campground.price}€ per night
          </p>
          <Link
            to={`/campgrounds/${campground.id}`}
            className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            View Campground
          </Link>
          {isMyCampground && (
            <Link
              to={`/campgrounds/edit/${campground.id}`}
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Edit
            </Link>
          )}
        </div>
        <p className="text-ellipsis overflow-hidden line-clamp-6">
          {campground.description}
        </p>
      </div>
    </div>
  );
};

export default CampCard;
