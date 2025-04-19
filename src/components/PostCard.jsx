import {
  Card,
  Typography,
  CardMedia,
  CardContent,
  Stack,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecipes } from "../contexts/ReceipesContext"; // Assuming you're using the context

const PostCard = ({ recipe }) => {
  const { id, title, image } = recipe;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${id}`);
  };

  return (
    <Card sx={{ width: 400 }} onClick={handleClick}>
      <CardMedia component="img" height="300" image={image} alt="Paella dish" />
      <Stack direction="row" justifyContent="space-between">
        <Box>
          <CardContent>
            <Typography variant="h6">{title}</Typography>
          </CardContent>
        </Box>
      </Stack>
    </Card>
  );
};

export default PostCard;
