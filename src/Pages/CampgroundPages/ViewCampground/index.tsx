import { useLocation } from "react-router-dom";
import type { Campground } from "../../../types/types";

const ViewCampground = () => {
  const { campground } = useLocation().state as { campground: Campground };

  const { title, price, description, image_url } = campground;

  return (
    <div className="flex flex-col gap-4 px-20 py-10 items-center">
      <img
        src={image_url}
        alt={title}
        className="w-full h-full object-cover max-h-[400px] max-w-[700px] border-2 border-black rounded-lg"
      />
      <div className="flex flex-col gap-2 border-2 border-gray-900 rounded-lg p-2 bg-orange-100 w-[800px]">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p>
          <b>Price:</b> {price}€ per night
        </p>
        <p>{description}</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ViewCampground;
