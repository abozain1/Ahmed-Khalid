import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import "./index.css";
import App from "./App";
import store from "./store1/index";
import { Provider, useSelector } from "react-redux";
import { createRoot } from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
axios.defaults.headers["Content-Type"] = "application/json";
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
