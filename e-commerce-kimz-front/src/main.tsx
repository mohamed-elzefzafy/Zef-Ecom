import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import AppRouer from "@routes/AppRouer";
import "@styles/global.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "./services/request.js";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <AppRouer />
    </PersistGate>
  </Provider>
);
