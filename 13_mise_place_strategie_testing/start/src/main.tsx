import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@foodsapp/store";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./utils/ui-theme/theme.ts";

const app = () => {
  return createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ChakraProvider>
    </React.StrictMode>
  );
};

app();
