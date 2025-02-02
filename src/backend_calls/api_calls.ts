import axios from "axios";

export const fetchUserDetails = async (userId: string) => {
  try {
    const response = await axios.get(
      `https://ifem-award-mchacks-2025.onrender.com/api/v1/patient/${userId}`
    );
    const userDetails = response.data;
    return userDetails;
  } catch (error) {
    alert("User Has Been Discharged!");
    console.error("Error fetching user details:", error);
  }
};

export const toggleSmsfeatureOn = async (userId: string) => {
  try {
    const response = await axios.post(
      `https://1457-142-157-232-12.ngrok-free.app/login2?patient_id=${userId}`,
      { patient_id: userId }
    );
    console.log(response);
  } catch (error) {
    alert("Error fetching user details:");
    throw error;
  }
};

export const toggleSmsfeatureOff = async (userId: string) => {
  try {
    const response = await axios.post(
      `https://1457-142-157-232-12.ngrok-free.app/logout?patient_id=${userId}`
    );
    console.log(response);
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};
