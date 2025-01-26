import axios from "axios";

export const fetchUserDetails = async (userId: string) => {
  try {
    const response = await axios.get(
      `https://ifem-award-mchacks-2025.onrender.com/api/v1/patient/${userId}`
    );
    const userDetails = response.data;
    return userDetails;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};
