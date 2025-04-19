import React, { useState, useContext } from "react";
import {
  Stack,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";
import { ReceipesContext } from "../contexts/ReceipesContext";
import { Navbar } from "../components/navbar";
import ImageDropzone from "../components/ImageDropZone";
import { FormBox } from "../styles/styledComponents";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddRecipes = () => {
  const [title, setTitle] = useState("");
  const [recipeDetail, setRecipeDetail] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { handleAddRecipe } = useContext(ReceipesContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !recipeDetail.trim() || !image) {
      setError("Please fill in the title, description, and upload an image.");
      return;
    }

    setIsUploading(true);

    try {
      const uploadedImageUrl = await uploadToCloudinary(image);
      await handleAddRecipe(title, recipeDetail, uploadedImageUrl);
      navigate("/myrecipes");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const uploadToCloudinary = async (file) => {
    const cloudinaryUrl = import.meta.env.VITE_CLOUDINARY_URL;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_PRESET;
    console.log("ENV URL:", cloudinaryUrl);
    console.log("ENV PRESET:", uploadPreset);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(cloudinaryUrl, formData);
      return response.data.secure_url;
    } catch (err) {
      setError("Network error occurred during image upload. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <FormBox sx={{ width: "600px", margin: "20px auto" }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ textAlign: "center", mb: 2 }}
        >
          Create a New Post
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Recipe Title"
              variant="outlined"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError("");
              }}
            />
            <TextField
              label="Recipe Description"
              variant="outlined"
              value={recipeDetail}
              onChange={(e) => {
                setRecipeDetail(e.target.value);
                setError("");
              }}
              multiline
              rows={4}
            />
            <ImageDropzone value={image} onChange={setImage} />
            <Button variant="contained" type="submit" disabled={isUploading}>
              {isUploading ? (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Posting...
                </Box>
              ) : (
                "Post Now"
              )}
            </Button>
          </Stack>
        </form>
      </FormBox>
    </>
  );
};

export default AddRecipes;
