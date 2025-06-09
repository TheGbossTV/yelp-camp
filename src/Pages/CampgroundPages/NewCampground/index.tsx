import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewCampground = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/campground", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, price, description }),
      });
      const data = await response.json();

      if (response.ok) {
        setName("");
        setPrice("");
        setDescription("");
        navigate("/campgrounds");
      } else {
        alert(data.message || "Failed to create campground");
      }
    } catch (err) {
      console.error("Error creating campground:", err);
      alert("Failed to create campground. Please try again.");
    }
  };

  return (
    <div className="bg-orange-100 h-screen flex flex-col justify-center items-center gap-y-2">
      <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
        Add New Campground
      </h1>
      <div className="flex justify-start items-center rounded-lg border-2 border-gray-900 p-4 w-[65%] bg-white">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
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
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewCampground;
