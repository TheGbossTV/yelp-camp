import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "@supabase/supabase-js";

interface NewCampgroundProps {
  user?: User | null;
}

const NewCampground = (props: NewCampgroundProps) => {
  const { user } = props;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      if (image) {
        formData.append("postImage", image);
      }

      const response = await fetch("http://localhost:3000/campground", {
        method: "POST",
        credentials: "include",
        // Don't set Content-Type header - browser will set it automatically with boundary
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        setName("");
        setPrice("");
        setDescription("");
        setImage(null);
        setImagePreview(null);
        navigate("/campgrounds");
      } else {
        alert(data.message || "Failed to create campground");
      }
    } catch (err) {
      console.error("Error creating campground:", err);
      alert("Failed to create campground. Please try again.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  // TODO: If the user is logged in and refreshes the page here, they go to the login page FIX BUG
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-orange-100 h-screen flex flex-col justify-center items-center gap-y-2">
      <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
        Add New Campground
      </h1>
      <div className="flex justify-start items-center rounded-lg border-2 border-gray-900 p-4 w-[65%] bg-white">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-[200px] h-[200px] object-cover"
              />
            )}
            <input
              type="file"
              accept="image/*"
              className={
                !imagePreview
                  ? "border-2 border-gray-900 border-dotted rounded-md p-2 h-[200px] object-cover"
                  : "mt-1"
              }
              name="image"
              aria-label="Change image"
              onChange={handleImageChange}
            />
          </div>

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
            className="border-2 border-gray-900 rounded-md p-2 h-[100px] max-h-[200px]"
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
