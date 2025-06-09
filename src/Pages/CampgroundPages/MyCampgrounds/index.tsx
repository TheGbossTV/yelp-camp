import React, { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import type { Campground } from "../../../types/types";
import CampCard from "../../../components/CampCard";

interface MyCampgroundsProps {
  user?: User | null;
}

const MyCampgrounds = (props: MyCampgroundsProps) => {
  const { user } = props;
  const [campgrounds, setCampgrounds] = useState<Campground[]>([]);
  const fetchUserCampgrounds = async (userId: string) => {
    const response = await fetch(
      `http://localhost:3000/campground/my-campgrounds/${userId}`
    );
    const data = await response.json();
    setCampgrounds(data);
  };

  useEffect(() => {
    if (user) {
      fetchUserCampgrounds(user.id);
    }
  }, [user]);

  if (!user) {
    return (
      <div>YOU ARE NOT LOGGED IN 😡. You have no access to this screen</div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-8 px-20 py-10">
        <h1 className="text-4xl font-bold">
          {user?.user_metadata.username} Campgrounds
        </h1>
        {campgrounds.map((campground) => (
          <CampCard
            key={campground.id}
            campground={campground}
            isMyCampground={true}
          />
        ))}
      </div>
    </>
  );
};

export default MyCampgrounds;
