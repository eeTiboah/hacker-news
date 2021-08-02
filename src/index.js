// import { StrictMode } from "react";
import ReactDOM from "react-dom";
import DataProvider from "./data-hook";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <DataProvider>
    <App />
  </DataProvider>,
  rootElement
);
