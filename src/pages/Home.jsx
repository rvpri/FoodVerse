import { Navbar } from "../components/navbar";
import PostCard from "../components/PostCard";
import { useRecipes } from "../contexts/ReceipesContext";
import { StyledBox } from "../styles/styledComponents";
import Loader from "../components/Loader";

const Home = () => {
  const { recipes, isLoading } = useRecipes();

  return (
    <>
      <Navbar />
      {isLoading ? (
        <Loader />
      ) : (
        <StyledBox>
          {recipes.map((recipe) => (
            <PostCard recipe={recipe} key={recipe.id} />
          ))}
        </StyledBox>
      )}
    </>
  );
};

export default Home;
