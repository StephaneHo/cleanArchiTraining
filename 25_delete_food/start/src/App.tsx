import { DashboardPage } from "@foodsapp/pages/dahsboard/Dashboard";
import { FoodDisplayPage } from "@foodsapp/pages/display/FoodDisplayPage";
import { FoodEditPage } from "@foodsapp/pages/edit/FoodEditPage";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <DashboardPage /> },
    { path: "/edit", element: <FoodEditPage /> },
    {
      path: "/edit/:foodId",
      element: <FoodEditPage update={true} />,
    },
    { path: "/display/:foodId", element: <FoodDisplayPage /> },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);
  return <RouterProvider router={router} fallbackElement={<DashboardPage />} />;
}

export default App;
