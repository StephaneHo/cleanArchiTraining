/* eslint-env jest */
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@foodsapp/store";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@foodsapp/utils/ui-theme/theme";
import { waitFor, fireEvent, act, screen } from "@testing-library/react";
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

  // warning https://github.com/testing-library/react-testing-library/issues/716
  afterEach(() => {
    window.history.pushState(null, document.title, "/");
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
    await waitFor(() =>
      expect(screen.getByTestId("display-page-title")).toHaveTextContent(title)
    );
  });

  test("should fill the form on the edit, update food correctly and return to dashboard to display it", async () => {
    // initoalisation des variables
    const updated_title = "updated food";
    const foodId = foodFakeData[0].id;
    // awaitFor car il faut attendre que le getFood soit execute
    // on clique sur le bouton update de la nav bar
    await waitFor(() =>
      expect(screen.getByTestId("title-page")).toHaveTextContent("Découvrir")
    );

    //tout ce qui se trouve a l'interieur soit resolu avant de continuer
    await waitFor(() =>
      fireEvent.click(screen.getByTestId(`update-food-${foodId}`))
    );

    // on est normalement sur la page edit food
    // mais on doit attendre que le rendu soit effectif
    // on la promesse getFood a partir de son foodId
    await waitFor(() =>
      expect(screen.getByText("Mettre à jour")).toBeVisible()
    );

    // on verifie que le champ titre dans le formulaire est bien celui de l'element a editer
    await waitFor(() =>
      expect(screen.getByTestId("inputwrapper-title").value).toBe(
        foodFakeData[0].title
      )
    );

    // on change le champe titre dams le formulaire
    await waitFor(() => {
      fireEvent.change(screen.getByTestId("inputwrapper-title"), {
        target: { value: updated_title },
      });
    });

    // on verifie que le champ titre dans le formulaire a bien ete modifie
    expect(screen.getByTestId("inputwrapper-title").value).toBe(updated_title);

    // on submit le formulaire
    await act(() => fireEvent.click(screen.getByTestId("submit-form-edit")));

    // on est normalement redirige vers la page dashboard
    await waitFor(() =>
      expect(screen.getByTestId("title-page")).toHaveTextContent("Découvrir")
    );

    // on verifie que le titre de l'element mis a jour est bien celui du formulaire
    // dans la page dashboard, getFoods s execute, il y a des promesses en cours de reoslution
    await waitFor(() => expect(screen.getByText(updated_title)).toBeVisible());
  });
});
