import axiosInstance from "@/AxiosInstance.js";

export async function getUserProfile() {

  // получаем список пользователей
  const response = await axiosInstance.get("/app/profiles");
  const profiles = response.data;

  // найти текущий профиль пользователя
  return profiles.find(
    (profile) => profile.user === parseInt(localStorage.getItem("user_id"))
  );
}
