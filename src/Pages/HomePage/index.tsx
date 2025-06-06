import React, { useState, useEffect } from "react";
import { type UserInfo } from "../../types/types";

const HomePage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const getUserInfo = async () => {
    const response = await fetch("http://localhost:3000/userinfo");
    const data = await response.json();
    setUserInfo(data);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      HomePage
      {userInfo && (
        <div>
          {userInfo.user.email} - {userInfo.user.id} -{" "}
          {userInfo.user.user_metadata.username}
        </div>
      )}
    </div>
  );
};

export default HomePage;
