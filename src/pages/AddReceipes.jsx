import React, { useState, useContext } from "react";
import { Stack, Button, TextField, Typography } from "@mui/material";
import { ReceipesContext } from "../contexts/ReceipesContext";
import { Navbar } from "../components/navbar";
import ImageDropzone from "../components/ImageDropZone";
import { FormBox } from "../styles/styledComponents";
import { useNavigate } from "react-router-dom";

const AddRecipes = () => {
  const [title, setTitle] = useState("");
  const [recipeDetail, setRecipeDetail] = useState("");
  const [image, setImage] = useState(null);
  const { handleAddRecipe } = useContext(ReceipesContext);
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleRecipeDetailChange = (e) => {
    setRecipeDetail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !recipeDetail.trim() || !image) {
      alert("All fields, including an image, are required.");
      return;
    }

    const convertToBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    try {
      const base64Image = await convertToBase64(image);
      handleAddRecipe(title, recipeDetail, base64Image);
      setTitle("");
      setRecipeDetail("");
      setImage(null);

      navigate("/myrecipes");
    } catch (error) {
      console.error("Error converting image to Base64:", error);
    }
  };

  return (
    <>
      <Navbar />
      <FormBox
        sx={{
          width: "600px",
          margin: "20px auto",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            textAlign: "center",
            marginBottom: "16px",
          }}
        >
          Create a New Post
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Recipe Title"
              variant="outlined"
              value={title}
              onChange={handleTitleChange}
              required
            />
            <TextField
              label="Recipe Description"
              variant="outlined"
              value={recipeDetail}
              onChange={handleRecipeDetailChange}
              required
              multiline
              rows={4}
            />
            <ImageDropzone value={image} onChange={setImage} />
            <Button variant="contained" type="submit">
              Post Now
            </Button>
          </Stack>
        </form>
      </FormBox>
    </>
  );
};

export default AddRecipes;
