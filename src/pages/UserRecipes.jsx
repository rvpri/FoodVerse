import { Navbar } from "../components/navbar";
import PostCard from "../components/PostCard";
import { useRecipes } from "../contexts/ReceipesContext";
import { useUsers } from "../contexts/UsersContext";
import { StyledBox } from "../styles/styledComponents";

const UserRecipes = () => {
  const { recipes } = useRecipes();
  const { user } = useUsers();

  const currentUserRecipes = recipes.filter(
    (recipe) => recipe.userId === user.id
  );

  return (
    <>
      <Navbar />
      <StyledBox>
        {currentUserRecipes.map((userRecipe) => (
          <PostCard recipe={userRecipe} key={userRecipe.id} />
        ))}
      </StyledBox>
    </>
  );
};

export default UserRecipes;
