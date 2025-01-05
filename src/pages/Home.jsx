import { Navbar } from "../components/navbar";
import PostCard from "../components/PostCard";
import { useRecipes } from "../contexts/ReceipesContext";
import { StyledBox } from "../styles/styledComponents";

const Home = () => {
  const { recipes } = useRecipes();

  return (
    <>
      <Navbar />
      <StyledBox>
        {recipes.map((recipe) => (
          <PostCard recipe={recipe} key={recipe.id} />
        ))}
      </StyledBox>
    </>
  );
};

export default Home;
