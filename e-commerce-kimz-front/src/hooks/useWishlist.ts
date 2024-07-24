import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { actGetWishlist, productWithListCleanUp } from "src/redux/wishlist/wishlistSlice";


export const useWishlist = () => {
  const dispatch = useAppDispatch();
  const {productsFullInfo , loading , error} = useAppSelector(state => state.wishlist);
  const items = useAppSelector(state => state.cart.items);
  useEffect(()=>{
    dispatch(actGetWishlist());
    return () => {
      dispatch(productWithListCleanUp())
    }
  },[dispatch]);

  console.log(productsFullInfo);
  
  const records = productsFullInfo.map(record => (
    {...record , 
      quantity : items[record.id],
      isLiked : true,
    }
  ))

  return {loading , error , records}
}

