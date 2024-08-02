import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { actGetOrders, resetOrderStatus } from "src/redux/orders/orderSlice";
import { TProduct } from "src/types/product";


const useOrders = () => {
  const dispatch = useAppDispatch();
  const { orderList , loading, error } = useAppSelector((state) => state.orders);
  const [product, setProduct] = useState<TProduct[]>([]);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setProduct([]);
  };

  const viewDetailsHandler = (id: number) => {
    const order = orderList.find((o) => o.id === id);
    const orderItems = order?.items ?? [];
    setProduct(orderItems);
    setShow(true);
  };
  useEffect(() => {
    const promise = dispatch(actGetOrders());
    dispatch(resetOrderStatus())
    return () => {
      promise.abort();
      dispatch(resetOrderStatus());
    };
  }, [dispatch]);
  return {loading , error ,product , show , handleClose , orderList ,viewDetailsHandler}
}

export default useOrders