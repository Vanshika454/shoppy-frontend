import axios from "../axios";

export default async function createnewProduct(productData) {
  try {
    const response = await axios.post(`/api/product`, productData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || 'Unable to fetxh products data!');
  }
}