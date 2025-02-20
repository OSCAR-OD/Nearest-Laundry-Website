import { createContext, useEffect, useReducer } from 'react';
import { cartReducer } from '../reducers/cartReducer';

export const CartContext = createContext();

const CartContextProvider = (props) => {

  const [cart, dispatch] = useReducer(cartReducer, [], () => {

    if (typeof window !== 'undefined') {
      const localData = localStorage.getItem('cart');
      return localData ? JSON.parse(localData) : [];
    }else{
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {props.children}
    </CartContext.Provider>
  );
}
 
export default CartContextProvider;