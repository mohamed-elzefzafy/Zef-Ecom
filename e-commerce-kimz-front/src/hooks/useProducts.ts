import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { actGetProductsByCatPrefix, productCleanUp } from "src/redux/products/productsSlice";


export const useProducts = () => {
  const param = useParams();
  const productParam = param.prefix;
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector((state) => state.products);
  const items = useAppSelector((state) => state.cart.items);
  const wishlistItemId = useAppSelector((state) => state.wishlist.itemsId);

  useEffect(() => {
  const response =   dispatch(actGetProductsByCatPrefix(param.prefix as string));
    return () => {
      dispatch(productCleanUp());
      response.abort();
    };
  }, [dispatch, param.prefix]);

  const productsFullInfo = records.map((record) => ({
    ...record,
    quantity: items[record.id],
    isLiked: wishlistItemId.includes(record.id),


  }));

  return {productParam , loading , error , productsFullInfo}
}