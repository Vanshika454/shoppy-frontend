import axios from "../axios";

export default async function getUserOrders(userId) {
  try {
    const response = await axios.get(`/api/order/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || 'Unable to fetch orders!');
  }
}