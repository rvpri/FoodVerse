import { createContext, useState, useContext, useEffect } from "react";
import { useUsers } from "./UsersContext";
export const ReceipesContext = createContext();

function ReceipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const { user } = useUsers();

  useEffect(() => {
    const fetchReciepes = async () => {
      try {
        const response = await fetch("http://localhost:8001/posts");

        if (!response.ok) {
          throw new Error("Something went wrong with fetching movies");
        }

        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchReciepes();
  }, []);

  const handleAddRecipe = async (title, recipeDetail, image) => {
    const newRecipe = {
      title,
      recipeDetail,
      image,
      userId: user.id,
    };

    async function addNewRecipe() {
      try {
        const response = await fetch("http://localhost:8001/posts", {
          method: "POST",
          body: JSON.stringify(newRecipe),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const updatedRecipes = await response.json();
        setRecipes((prevRecipes) => [...prevRecipes, updatedRecipes]);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        console.log(response.ok);
      } catch (error) {
        console.error(error.message);
      }
    }

    addNewRecipe();
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
