import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserRecipes from "./pages/UserRecipes";
import AddReceipes from "./pages/AddReceipes";
import ProtectedRoute from "./ProtectedRoute";
import Recipe from "./pages/Recipe";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/addreceipes",
    element: (
      <ProtectedRoute>
        <AddReceipes />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/myrecipes",
    element: (
      <ProtectedRoute>
        <UserRecipes />
      </ProtectedRoute>
    ),
  },
  {
    path: "/recipe/:id",
    element: <Recipe />,
  },
]);
