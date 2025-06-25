import { DashboardPage } from "@foodsapp/pages/dahsboard/Dashboard";
import { FoodConfigurationPage } from "@foodsapp/pages/configuration/Configuration";
import { FoodPpresentationPage } from "@foodsapp/pages/presentation/Presentation";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <DashboardPage /> },
    { path: "/configuration", element: <FoodConfigurationPage /> },
    {
      path: "/configuration/edit/:foodId",
      element: <FoodConfigurationPage edition={true} />,
    },
    { path: "/presentation/:foodId", element: <FoodPpresentationPage /> },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);
  return <RouterProvider router={router} fallbackElement={<DashboardPage />} />;
}

export default App;
