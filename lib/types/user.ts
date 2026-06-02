export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  profileComplete: boolean;
  bio?: string;
  language: string;
  createdAt: string;
};

export type UserProfileUpdate = {
  name: string;
  bio?: string;
  language: string;
};
