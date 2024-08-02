import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categories from "./categories/categoriesSlice";
import products from "./products/productsSlice";
import cart from "./cart/cartSlice";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import wishlist from "./wishlist/wishlistSlice";
import auth from "./auth/authSlice";
import orders from "./orders/orderSlice";



const rootPersistConfig = {
  key : "root",
  storage,
  whiteList: ["cart" , "auth"]
}

const cartPersistConfig = {
  key : "cart",
  storage,
  whiteList: ["items"]
}
const authPersistConfig = {
  key : "auth",
  storage,
  whiteList: ["user" , "accessToken"]
}

const rootReducer = combineReducers( {
  categories ,
  products ,
  auth : persistReducer(authPersistConfig , auth),
  wishlist ,
  orders ,
  cart : persistReducer(cartPersistConfig , cart),
  
})


const persistedReducer = persistReducer(rootPersistConfig , rootReducer);


 const store = configureStore({
  reducer : persistedReducer,
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


