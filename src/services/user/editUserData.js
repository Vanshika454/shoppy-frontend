import axios from "../axios";

export default async function editUserData(userData) {
  try {
    const response = await axios.put(`/api/user/`, userData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || 'Unable to edit profile details!');
  }
}