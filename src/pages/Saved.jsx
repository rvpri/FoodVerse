import { useSavedRecipes } from "../contexts/SavedRecipesContext";
import { Navbar } from "../components/navbar";
import Box from "@mui/material/Box";
import PostCard from "../components/PostCard";
import Stack from "@mui/material/Stack";

const Saved = () => {
  const { savedRecipes } = useSavedRecipes();
  console.log(savedRecipes);
  return (
    <div>
      <Navbar />

      <Box>
        Saved
        <Stack
          direction="row"
          spacing={2}
          useFlexGap
          flexWrap="wrap"
          justifyContent="center"
        >
          {savedRecipes.map((savedRecipe) => (
            <PostCard recipe={savedRecipe} key={savedRecipe.id} />
          ))}
        </Stack>
      </Box>
    </div>
  );
};

export default Saved;
