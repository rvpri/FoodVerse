import { useParams } from "react-router-dom";
import { useRecipes } from "../contexts/ReceipesContext";
import { Typography, Box, Stack, Container, Divider } from "@mui/material";
import FoodImg from "../assets/food.jpg";
import { Navbar } from "../components/navbar";

const RecipeDetail = () => {
  const { id } = useParams();
  const { recipes } = useRecipes();

  const recipe = recipes.find((recipe) => recipe.id === id);

  if (!recipe) {
    console.error(`No recipe found with ID: ${id}`);
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Box sx={{ marginY: 4 }}>
          <Stack spacing={2}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4">{recipe.title}</Typography>
              <Typography variant="h6" color="text.primary">
                By: {recipe.author}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 2,
              }}
            >
              <img
                src={recipe.image || FoodImg}
                alt={recipe.title}
                style={{
                  width: "100%",
                  maxWidth: 500,
                  height: "auto",
                  borderRadius: 2,
                }}
              />
            </Box>

            <Divider sx={{ marginY: 2 }} />

            <Typography variant="body1" color="text.secondary">
              {recipe.recipeDetail}
            </Typography>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default RecipeDetail;
