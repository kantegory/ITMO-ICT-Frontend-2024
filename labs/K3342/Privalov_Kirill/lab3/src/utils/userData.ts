import { User } from "../types/user";

export const fetchUserData = async (): Promise<User> => {
  const response = await fetch("http://localhost:8080/api/v1/user", {
    headers: {
      Authorization: localStorage.getItem("token") || "",
    },
  });
  if (!response.ok) throw new Error("Failed to fetch user data");
  return response.json();
};
