import { toast } from "react-toastify";

export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':

      const product = action.product;
      const cartItems = state;
      
      console.log("action", action);



      if(cartItems.length == 0){

        cartItems.push(action.product);

        toast("Product added to cart. " + "You can edit those anytime.", {
          hideProgressBar: true,
          autoClose: 2000,
          type: "info",
          position: "top-center",
          theme: "dark",
        });
      } 
      else {

        let exist = cartItems.find((o) => o.pid === product.pid);
        if (!exist) {
          cartItems.push(action.product);
          toast("Product added to cart. " + "You can edit those anytime.", {
            hideProgressBar: true,
            autoClose: 2000,
            type: "info",
            position: "top-center",
            theme: "dark",
          });
        } else {
          toast(
            "You have already added this product to cart. " +
              "Please edit from cart now.",
            {
              hideProgressBar: true,
              autoClose: 2000,
              type: "info",
              position: "top-center",
              theme: "dark",
            }
          );
        }
      }
      // update local storage
      localStorage.setItem("cart", JSON.stringify(cartItems));

      return [...cartItems];
    
    case 'ADD_TO_CART_CUSTOM':

      let customProduct = action.product;
      let customCartItems = state;
      
      console.log("action", action);

      if(customCartItems.length == 0){

        customCartItems.push(action.product);
        toast("Product added to cart.", {
          hideProgressBar: true,
          autoClose: 2000,
          type: "info",
          position: "top-center",
          theme: "dark",
        });
      } 
      else {

        let exist = customCartItems.find((o) => o.pid === customProduct.pid);
        if (!exist) {
          customCartItems.push(action.product);
          toast("Product added to cart.", {
            hideProgressBar: true,
            autoClose: 2000,
            type: "info",
            position: "top-center",
            theme: "dark",
          });
        } else {

          let data = customCartItems.map((item) => {
            if(item.pid === customProduct.pid){
             item.quantity =  customProduct.quantity;
            }
            return item;
           });
     
          customCartItems = data;

          toast(
            "Product info updated",
            {
              hideProgressBar: true,
              autoClose: 2000,
              type: "info",
              position: "top-center",
              theme: "dark",
            }
          );
        }
      }
      // update local storage
      localStorage.setItem("cart", JSON.stringify(customCartItems));

      return [...customCartItems];

    
    case 'UPDATE_QTY':
      const updateProduct = action.product;
      const updateCartItems = state;

      let data = updateCartItems.map((item) => {
       if(item.pid === updateProduct.pid){
        item.quantity =  updateProduct.quantity;
        item.price = updateProduct.price;
       }
       return item;
      });

      // update local storage
      localStorage.setItem("cart", JSON.stringify(data));

      return [...data];

    case 'REMOVE_FROM_CART':
      // return state.filter(book => book.id !== action.id);

      const removeProduct = action.product;
      const allCartItems = state;

      let newData = allCartItems.filter((item, i) => {
        return item.pid !== removeProduct.pid;
      });

      // update local storage
      localStorage.setItem("cart", JSON.stringify(newData));

      return [...newData];
    
      case 'CLEAR_CART':
        // update local storage
        localStorage.removeItem("cart");
        return [];

    default:
      return state;
  }
} 