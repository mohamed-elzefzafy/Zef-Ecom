import { useCallback, useEffect } from "react";
import { actGetProductsByItems, cartItemChangeQuantity, productsCartCleanUp, removeCartElementAction } from "src/redux/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";


const useCart = () => {
  const dispatch = useAppDispatch();
  const { items ,productsFullInfo , loading , error} = useAppSelector(state => state.cart)
console.log(productsFullInfo);


  useEffect(()=>{
  const promise =  dispatch(actGetProductsByItems());
    return () => {
      dispatch(productsCartCleanUp());
      promise.abort();
    }
  },[dispatch]);
  

  const products = productsFullInfo.map(prod => ({...prod, quantity : items[prod.id]}));

  const changeQuantityHandler = useCallback((id : number , quantity : number) => {
      console.log(id , quantity);
      dispatch(cartItemChangeQuantity({id , quantity}));
    },[dispatch]);

  const removeCartItem = useCallback((id : number) => {
      console.log(id );
dispatch(removeCartElementAction(id))
    },[dispatch]);

    
    
  return {products , loading , error , changeQuantityHandler ,removeCartItem}
}

export default useCart