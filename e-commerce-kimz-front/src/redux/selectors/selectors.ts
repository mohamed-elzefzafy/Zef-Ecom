import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const getCartTotalQuantitySelector = createSelector((state : RootState) => state.cart.items , (items) => {
  const totalQuantity = Object.values(items).reduce((acc , item) =>  acc + item ,0);
  // const totalQuantity = Object.keys(cartItems).length;
  return totalQuantity;
})
