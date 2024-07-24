import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categories from "./categories/categoriesSlice";
import products from "./products/productsSlice";
import cart from "./cart/cartSlice";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import wishlist from "./wishlist/wishlistSlice";




const cartPersistConfig = {
  key : "cart",
  storage,
  whiteList: ["items"]
}
const wishListPersistConfig = {
  key : "wishlist",
  storage,
  whiteList: ["itemsId"]
}

const rootReducer = combineReducers( {
  categories ,
  products ,
  wishlist :persistReducer(wishListPersistConfig , wishlist),
  cart : persistReducer(cartPersistConfig , cart),
})



 const store = configureStore({
  reducer : rootReducer,
  middleware : (getDefauitMiddleWare) => 
    getDefauitMiddleWare({
    serializableCheck : {
      ignoredActions : [FLUSH , REHYDRATE , PAUSE , PERSIST , PURGE , REGISTER],
    }  
    })
  
})


const persistor = persistStore(store);
export { store, persistor};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;