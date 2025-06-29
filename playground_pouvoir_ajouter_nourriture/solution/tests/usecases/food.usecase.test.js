/* eslint-env jest */
import "@testing-library/jest-dom";

import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@foodsapp/store";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@foodsapp/utils/ui-theme/theme";
/* eslint-env jest */
import "@testing-library/jest-dom";
import { waitFor, fireEvent } from "@testing-library/react";
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
    await waitFor(() =>
      fireEvent.click(screen.getByTestId("navlink-creation"))
    );
    expect(screen.getByText("Création")).toBeVisible();
  });
});
