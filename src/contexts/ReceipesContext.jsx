import { createContext, useState, useContext, useEffect } from "react";
import { useUsers } from "./UsersContext";

export const ReceipesContext = createContext();

function ReceipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const { user } = useUsers();

  console.log(user);

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

  const handleAddRecipe = (title, recipeDetail) => {
    if (!title || !recipeDetail) {
      alert("Please fill out both fields.");
      return;
    }

    const newRecipe = {
      title,
      recipeDetail,
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
        const json = await response.json();
        console.log(json);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        console.log(response.ok);
      } catch (error) {
        console.error(error.message);
      }
    }

    addNewRecipe();
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
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
