import api from "./api";

export const fetchUserProfile = async (token) => {
  // if token provided, set temp header
  if (token) {
    const res = await api.get("/users/profile", { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
  }
  const res = await api.get("/users/profile");
  return res.data;
};