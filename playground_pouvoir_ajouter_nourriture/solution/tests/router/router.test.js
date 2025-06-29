/* eslint-env jest */
import "@testing-library/jest-dom";
import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@foodsapp/store";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@foodsapp/utils/ui-theme/theme";
import App from "../../src/App";
describe("Tests of navigation", () => {
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
