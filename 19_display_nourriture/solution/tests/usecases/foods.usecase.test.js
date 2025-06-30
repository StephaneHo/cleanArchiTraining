/* eslint-env jest */
import "@testing-library/jest-dom";

import { Provider } from "react-redux";
import { store } from "@foodsapp/store";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@foodsapp/utils/ui-theme/theme";
import {
  waitFor,
  fireEvent,
  act,
  screen,
  render,
} from "@testing-library/react";
import App from "../../src/App";
describe("Tests for one article of food.usecase", () => {
  beforeEach(() => {
    render(
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ChakraProvider>
    );
  });

  test("Create food should work", async () => {
    const title = "NEW";
    await waitFor(() => fireEvent.click(screen.getByTestId("navlink-edit")));
    expect(screen.getByText("Ajoutez un nouvel article")).toBeVisible();

    await waitFor(() =>
      fireEvent.change(screen.getByTestId("inputwrapper-title"), {
        target: { value: title },
      })
    );
    await waitFor(() =>
      expect(screen.getByTestId("inputwrapper-title").value).toBe(title)
    );

    await act(() => fireEvent.click(screen.getByTestId("submit-form-edit")));

    await waitFor(() =>
      expect(screen.getByTestId("title-page")).toHaveTextContent("Découvrir")
    );
    await waitFor(async () =>
      expect(await screen.findByText(title)).toBeVisible()
    );
  });
});
