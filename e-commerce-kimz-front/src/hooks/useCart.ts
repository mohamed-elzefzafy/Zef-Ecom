import { useCallback, useEffect } from "react";
import {
  actGetProductsByItems,
  cartItemChangeQuantity,
  productsCartCleanUp,
  removeCartElementAction,
  resetCartStatus,
} from "src/redux/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { resetOrderStatus } from "src/redux/orders/orderSlice";

const useCart = () => {
  const dispatch = useAppDispatch();
  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart
  );
  console.log(productsFullInfo);
  const userAccessToken = useAppSelector((state) => state.auth.accessToken);
  const orderStatus = useAppSelector((state) => state.orders.loading);


  const products = productsFullInfo.map((prod) => ({
    ...prod,
    quantity: items[prod.id],
  }));

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      console.log(id, quantity);
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const removeCartItem = useCallback(
    (id: number) => {
      console.log(id);
      dispatch(removeCartElementAction(id));
    },
    [dispatch]
  );

  useEffect(() => {
    const promise = dispatch(actGetProductsByItems());
    dispatch(resetOrderStatus());
    return () => {
      dispatch(productsCartCleanUp());
      dispatch(resetOrderStatus());
      dispatch(resetCartStatus());
      promise.abort();
    };
  }, [dispatch]);

  return {
    products,
    loading,
    error,
    changeQuantityHandler,
    removeCartItem,
    userAccessToken,
    orderStatus
  };
};

export default useCart;
