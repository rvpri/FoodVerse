import { createContext, useState, useContext } from "react";

export const ReceipesContext = createContext();

function generateRandomId() {
  return Math.floor(10000 + Math.random() * 90000);
}

function ReceipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);

  const handleAddRecipe = (title, recipeDetail) => {
    if (!title || !recipeDetail) {
      alert("Please fill out both fields.");
      return;
    }

    const newRecipe = {
      title,
      recipeDetail,
      id: generateRandomId(),
    };

    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
    console.log("New recipe added:", newRecipe);
    console.log("Updated recipes list:", recipes);
  };

  return (
    <ReceipesContext.Provider value={{ recipes, handleAddRecipe }}>
      {children}
    </ReceipesContext.Provider>
  );
}

export function useRecipes() {
  const context = useContext(ReceipesContext);
  if (context === undefined) {
    throw new Error("useRecipes must be used within a ReceipesProvider");
  }
  return context;
}

export { ReceipesProvider };
