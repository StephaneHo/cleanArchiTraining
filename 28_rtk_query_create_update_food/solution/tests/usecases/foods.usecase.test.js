/* eslint-env jest */
import "@testing-library/jest-dom";

import {
  screen,
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { act } from "react";

import { Provider } from "react-redux";
import { store } from "@foodsapp/store";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@foodsapp/utils/ui-theme/theme";
import { waitFor } from "@testing-library/react";
import App from "../../src/App";
import { foodFakeData } from "@foodsapp/infrastructure/inMemory/database/food.db";

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
    // on s assure que l'on est sur la page dashboard
    await waitFor(() =>
      expect(screen.getByTestId("title-page")).toHaveTextContent("Découvrir")
    );
    expect(await screen.findByText("tomate")).toBeVisible();
    expect(await screen.findByText("oignon")).toBeVisible();
    expect(await screen.findByText("oeuf")).toBeVisible();
    expect(await screen.findByText("poivron")).toBeVisible();
    expect(await screen.findByText("ananas")).toBeVisible();
  });

  test("Should delete food and not display it", async () => {
    const initialFakeData = [...foodFakeData];
    const foodToDeleteId = initialFakeData[0].id;
    const foodToDeleteTitle = initialFakeData[0].title;
    // on s assure que l'on est sur la page dashboard
    await waitFor(() =>
      expect(screen.getByTestId("title-page")).toHaveTextContent("Découvrir")
    );

    // on s assure que toutes les food sont affichées
    for (const food of initialFakeData) {
      expect(await screen.findByText(food.title)).toBeVisible();
    }

    // on s assure que l on peut cliquer sur le bouton delete
    await waitFor(() => expect(screen.getByTestId("title-page")).toBeVisible());

    // on va cliquer sur le bouton delete du premier food
    await act(() =>
      fireEvent.click(screen.getByTestId(`delete-food-${foodToDeleteId}`))
    );

    await waitForElementToBeRemoved(() =>
      screen.queryByText(foodToDeleteTitle)
    );

    const remainingFoods = foodFakeData.filter(
      (food) => food.id !== foodToDeleteId
    );

    for (const food of remainingFoods) {
      expect(await screen.findByText(food.title)).toBeVisible();
    }
  });
});
