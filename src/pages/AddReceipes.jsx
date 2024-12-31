import { useState, useContext } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ReceipesContext } from "../contexts/ReceipesContext";
import { Navbar } from "../components/navbar";

const AddRecipes = () => {
  const [title, setTitle] = useState("");
  const [recipeDetail, setRecipeDetail] = useState("");
  const { handleAddRecipe } = useContext(ReceipesContext);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleRecipeDetailChange = (e) => {
    setRecipeDetail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddRecipe(title, recipeDetail);
    setTitle("");
    setRecipeDetail("");
  };

  return (
    <>
      <Navbar />
      <div>
        <Typography variant="h4" gutterBottom>
          Add Recipes
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Recipe Title"
              variant="outlined"
              value={title}
              onChange={handleTitleChange}
              required
            />
            <TextField
              label="Recipe Details"
              variant="outlined"
              value={recipeDetail}
              onChange={handleRecipeDetailChange}
              required
            />
            <Button variant="contained" type="submit">
              Add Recipe
            </Button>
          </Stack>
        </form>
      </div>
    </>
  );
};

export default AddRecipes;
