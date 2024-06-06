import axios from "../axios";

export default async function getOrderById(id) {
  try {
    const response = await axios.get(`/api/order/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || 'Unable to fetch orders!');
  }
}