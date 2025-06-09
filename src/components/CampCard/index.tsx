import type { Campground } from "../../types/types";

const CampCard = (campground: Campground) => {
  return (
    <div className="flex gap-2 border-2 border-gray-900 rounded-lg p-2 bg-orange-100">
      <div className="min-h-[200px] min-w-[200px] border-2 border-black rounded-lg">
        Image placeholder
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-2 items-baseline w-full">
          <h1 className="text-4xl font-bold">{campground.title}</h1>
          <p>
            <b>Price:</b> {campground.price}€ per night
          </p>
          <button className="ml-auto">View Campground</button>
        </div>
        <p>{campground.description}</p>
      </div>
    </div>
  );
};

export default CampCard;
