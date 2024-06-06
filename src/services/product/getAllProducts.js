import axios from "../axios";

export default async function getAllProducts(pageNo = 1, pageSize = 10 ) {
  try {
    const response = await axios.get(`/api/product/`, {
      params: {
        pageNo, pageSize
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || 'Unable to fetch products!');
  }
}