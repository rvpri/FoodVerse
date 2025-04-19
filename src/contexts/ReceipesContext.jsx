import { createContext, useState, useContext, useEffect } from "react";
import { useUsers } from "./UsersContext";

export const ReceipesContext = createContext();

function ReceipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUsers();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:8001/posts");
        if (!response.ok) {
          throw new Error("Something went wrong with fetching recipes");
        }

        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleAddRecipe = async (title, recipeDetail, image) => {
    const newRecipe = {
      title,
      recipeDetail,
      image,
      userId: user.id,
    };

    try {
      const response = await fetch("http://localhost:8001/posts", {
        method: "POST",
        body: JSON.stringify(newRecipe),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const updatedRecipe = await response.json();
      setRecipes((prevRecipes) => [...prevRecipes, updatedRecipe]);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <ReceipesContext.Provider
      value={{
        recipes,
        handleAddRecipe,
        isLoading,
      }}
    >
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
