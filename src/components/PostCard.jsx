import {
  Card,
  Typography,
  CardMedia,
  CardContent,
  Stack,
  Box,
} from "@mui/material";
import FoodImg from "../assets/food.jpg";
import { useNavigate } from "react-router-dom";

const PostCard = ({ recipe }) => {
  const { id, title, image } = recipe;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${id}`);
  };

  return (
    <Card sx={{ width: 300 }} onClick={handleClick}>
      <CardMedia
        component="img"
        height="200"
        image={image || FoodImg}
        alt="Paella dish"
      />
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
