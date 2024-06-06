import { useContext } from 'react'

import CartContext from '../contexts/CartContext';

export default function useCart() {

  const { cart, setCart } = useContext(CartContext);

  return {
    cart, 
    setCart
  }
}
