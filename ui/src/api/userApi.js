import axios from "../axios";

export const getUserProfile = async () => {
  try {
    const response = await axios.get("/user");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};
