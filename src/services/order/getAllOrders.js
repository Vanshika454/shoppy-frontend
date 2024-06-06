import axios from "../axios";

export default async function getAllOrders() {
  try {
    const response = await axios.get(`/api/order/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || 'Unable to fetch orders!');
  }
}