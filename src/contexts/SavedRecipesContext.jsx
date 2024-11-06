import { createContext, useState, useContext } from "react";
import { useRecipes } from "./ReceipesContext";

export const SavedRecipesContext = createContext();

export function SavedRecipesProvider({ children }) {
  const { recipes } = useRecipes();
  const [savedRecipes, setSavedRecipes] = useState([]);

  const handleSaveRecipe = (id) => {
    const recipe = recipes.find((receipe) => receipe.id === id);
    setSavedRecipes((prevSavedRecipes) => [...prevSavedRecipes, recipe]);
    console.log("Updated Saved recipes list:", savedRecipes);
  };
  return (
    <SavedRecipesContext.Provider value={{ savedRecipes, handleSaveRecipe }}>
      {children}
    </SavedRecipesContext.Provider>
  );
}

export function useSavedRecipes() {
  const context = useContext(SavedRecipesContext);
  if (context === undefined) {
    throw new Error(
      "useSavedRecipes must be used within a SavedRecipesProvider"
    );
  }
  return context;
}
