import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@foodsapp/store";

const app = () => {
  return createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
};

app();
