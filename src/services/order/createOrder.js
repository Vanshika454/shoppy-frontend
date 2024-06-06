import axios from "../axios";

export default async function createNewOrder(productsWithQuantity) {
  try {
    const response = await axios.post(`/api/order/`, {
        productsWithQuantity
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || 'unable to place order!');
  }
}