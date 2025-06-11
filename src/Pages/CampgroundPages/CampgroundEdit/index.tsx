import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import type { Campground } from "../../../types/types";

interface CampgroundEditProps {
  user?: User | null;
}

const CampgroundEdit = (props: CampgroundEditProps) => {
  const { user } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  const { campground } = useLocation().state as { campground: Campground };
  const [name, setName] = useState(campground.title);
  const [price, setPrice] = useState(campground.price);
  const [description, setDescription] = useState(campground.description);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/campground/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title: name, price, description }),
      });
      const data = await response.json();

      if (response.ok) {
        navigate("/campgrounds");
      } else {
        alert(data.message || "Failed to edit campground");
      }
    } catch (err) {
      console.error("Error editing campground:", err);
      alert("Failed to edit campground. Please try again.");
    }
  };

  if (!user) {
    return (
      <div>YOU ARE NOT LOGGED IN 😡. You have no access to this screen</div>
    );
  }

  return (
    <div className="bg-orange-100 h-screen flex flex-col justify-center items-center gap-y-2">
      <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
        Edit Campground
      </h1>
      <div className="flex justify-start items-center rounded-lg border-2 border-gray-900 p-4 w-[65%] bg-white">
        <form onSubmit={handleEdit} className="flex flex-col gap-4 w-full">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-gray-900 rounded-md p-2"
            />
            <input
              type="text"
              placeholder="Price per night"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border-2 border-gray-900 rounded-md p-2"
            />
          </div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-gray-900 rounded-md p-2 h-[200px] max-h-[320px]"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white rounded-md p-2"
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CampgroundEdit;
