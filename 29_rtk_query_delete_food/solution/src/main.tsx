import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@foodsapp/store";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./utils/ui-theme/theme.ts";
import { handlers } from "@foodsapp/infrastructure/inMemory/server.ts";
import { setupWorker } from "msw/browser";

const app = async () => {
  const worker = setupWorker(...handlers);
  await worker.start({ onUnhandledRequest: "bypass" });
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
