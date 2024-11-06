import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
import { ReceipesProvider } from "./contexts/ReceipesContext.jsx";
import { SavedRecipesProvider } from "./contexts/SavedRecipesContext.jsx";
import { UsersProvider } from "./contexts/UsersContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UsersProvider>
      <ReceipesProvider>
        <SavedRecipesProvider>
          <RouterProvider router={router} />
        </SavedRecipesProvider>
      </ReceipesProvider>
    </UsersProvider>
  </StrictMode>
);
