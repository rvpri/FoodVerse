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
import FoodImg from "../assets/food.jpg";
import { useNavigate } from "react-router-dom";

const PostCard = ({ recipe }) => {
  const { id, title } = recipe;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${id}`);
  };

  return (
    <Card sx={{ maxWidth: 300 }} onClick={handleClick}>
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
          </CardContent>
        </Box>
      </Stack>
    </Card>
  );
};

export default PostCard;
