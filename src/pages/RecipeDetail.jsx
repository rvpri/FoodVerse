import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecipes } from "../contexts/ReceipesContext";
import { Typography, Box, Stack, Container, Divider } from "@mui/material";
import { Navbar } from "../components/navbar";
import axios from "axios";

const RecipeDetail = () => {
  const { id } = useParams();
  const { recipes } = useRecipes();
  const [userName, setUserName] = useState("");
  const recipe = recipes.find((recipe) => recipe.id === id);

  useEffect(() => {
    if (recipe && recipe.userId) {
      const fetchUserName = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8001/users/${recipe.userId}`
          );
          setUserName(response.data.userName);
        } catch (error) {
          console.error("Error fetching username:", error);
        }
      };
      fetchUserName();
    }
  }, [recipe]);

  if (!recipe) {
    return <Typography variant="h6">No recipe found with ID: {id}</Typography>;
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
                Shared By: {userName || "Unknown"}
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
                src={recipe.image}
                alt={recipe.title}
                style={{
                  maxWidth: "100%",
                  height: 300,
                  objectFit: "cover",
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
