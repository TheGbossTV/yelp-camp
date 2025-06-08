import { useState } from "react";
import type { Campground } from "../../../types/types";

const NewCampground = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [campgrounds, setCampgrounds] = useState<Campground[]>([]);

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
        setCampgrounds((prev) => [
          ...prev,
          {
            id: data.data.id,
            name,
            price: Number(price),
            description,
          },
        ]);
        setName("");
        setPrice("");
        setDescription("");
      } else {
        alert(data.message || "Failed to create campground");
      }
    } catch (err) {
      console.error("Error creating campground:", err);
      alert("Failed to create campground. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>

      {campgrounds.map((campground) => (
        <div key={campground.id}>
          <h2>{campground.name}</h2>
          <p>{campground.price}</p>
          <p>{campground.description}</p>
        </div>
      ))}
    </div>
  );
};

export default NewCampground;
