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
import { foodFakeData } from "@foodsapp/infrastructure/inMemory/database/food.db";
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

  test("should create food create food and return to dashboard to display it", async () => {
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

  test("should get food on display page ", async () => {
    const cardId = foodFakeData[0].id;
    const title = foodFakeData[0].title;
    // cclick on the first food card
    await waitFor(() =>
      fireEvent.click(screen.getByTestId(`food-card-${cardId}`))
    );

    // check if we are on the display page
    await waitFor(() => {
      expect(screen.getByTestId("display-page-title")).toHaveTextContent(title);
    });
  });
});
