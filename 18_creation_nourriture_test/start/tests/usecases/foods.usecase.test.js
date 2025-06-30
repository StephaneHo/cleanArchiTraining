/* eslint-env jest */
import "@testing-library/jest-dom";

import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@foodsapp/store";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@foodsapp/utils/ui-theme/theme";
import App from "../../src/App";
describe("Tests for foods.usecase", () => {
  beforeEach(() => {
    render(
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ChakraProvider>
    );
  });

  test("Should getfood load DashboardPage", async () => {
    expect(await screen.findByText("tomate")).toBeVisible();
    expect(await screen.findByText("oignon")).toBeVisible();
    expect(await screen.findByText("oeuf")).toBeVisible();
    expect(await screen.findByText("poivron")).toBeVisible();
    expect(await screen.findByText("ananas")).toBeVisible();
  });
});
