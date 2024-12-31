import { Navbar } from "../components/navbar";
import Box from "@mui/material/Box";
import PostCard from "../components/PostCard";
import Stack from "@mui/material/Stack";
import { useRecipes } from "../contexts/ReceipesContext";
import { useUsers } from "../contexts/UsersContext";

const UserRecipes = () => {
  const { recipes } = useRecipes();
  const { user } = useUsers();

  const currentUserRecipes = recipes.filter(
    (recipe) => recipe.userId === user.id
  );
  console.log(currentUserRecipes);
  return (
    <div>
      <Navbar />
      <Box>
        <Stack
          direction="row"
          spacing={2}
          useFlexGap
          flexWrap="wrap"
          justifyContent="center"
        >
          {currentUserRecipes.map((userRecipe) => (
            <PostCard recipe={userRecipe} key={userRecipe.id} />
          ))}
        </Stack>
      </Box>
    </div>
  );
};

export default UserRecipes;
