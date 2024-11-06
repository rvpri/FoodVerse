import React from "react";
import { Navbar } from "../components/navbar";
import Box from "@mui/material/Box";
import PostCard from "../components/PostCard";
import Stack from "@mui/material/Stack";
import { useRecipes } from "../contexts/ReceipesContext";

const Home = () => {
  const { recipes } = useRecipes();

  return (
    <div>
      <Navbar />

      <Box>
        Posts
        <Stack
          direction="row"
          spacing={3}
          useFlexGap
          flexWrap="wrap"
          justifyContent="center"
        >
          {recipes.map((recipe) => (
            <PostCard recipe={recipe} key={recipe.id} />
          ))}
        </Stack>
      </Box>
    </div>
  );
};

export default Home;
