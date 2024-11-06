import {
  Card,
  IconButton,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  Stack,
  Box,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FoodImg from "../assets/food.jpg";
import { SavedRecipesContext } from "../contexts/SavedRecipesContext.jsx";
import { useContext } from "react";

const PostCard = ({ recipe }) => {
  const { id, title, recipeDetail } = recipe;
  const { handleSaveRecipe } = useContext(SavedRecipesContext);

  const handleSave = (e) => {
    e.preventDefault();
    handleSaveRecipe(id);
  };

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        component="img"
        height="200"
        image={FoodImg}
        alt="Paella dish"
      />
      <Stack direction="row" justifyContent="space-between">
        <Box>
          <CardContent>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body2">{recipeDetail}</Typography>
          </CardContent>
        </Box>
        <CardActions>
          <IconButton aria-label="bookmark" onClick={handleSave}>
            <BookmarkBorderIcon />
          </IconButton>
        </CardActions>
      </Stack>
    </Card>
  );
};

export default PostCard;
