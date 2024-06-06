import axios from "../axios";

export default async function getUserData() {
  try {
    const response = await axios.get(`/api/user/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || 'Unable to fetch user data!');
  }
}