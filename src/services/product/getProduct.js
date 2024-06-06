import axios from "../axios";

export default async function getProduct(id) {
  try {
    const response = await axios.get(`/api/product/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || 'Unable to fetxh products data!');
  }
}