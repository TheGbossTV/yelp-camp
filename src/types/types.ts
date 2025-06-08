export type UserInfo = {
  user: {
    email: string;
    id: string;
    user_metadata: {
      username: string;
    };
  };
};

export type Campground = {
  id: string;
  name: string;
  price: number;
  description: string;
};