import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Typography, Box } from "@mui/material";
import { StyledDropzone, ErrorTypography } from "../styles/styledComponents";

const ImageDropzone = ({ onChange }) => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const validTypes = ["image/jpeg", "image/png"];

    if (file && validTypes.includes(file.type)) {
      setPreview(URL.createObjectURL(file));
      setError(null);
      onChange(file);
    } else {
      setError("Invalid file type. Only JPEG or PNG allowed.");
      setPreview(null);
      onChange(null);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
  });

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <StyledDropzone {...getRootProps()}>
      <input {...getInputProps()} />
      <Box textAlign="center">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
          />
        ) : (
          <Typography variant="body1" color="textSecondary">
            Drag and drop or click to select an image (JPEG, PNG)
          </Typography>
        )}
        {error && <ErrorTypography variant="body2">{error}</ErrorTypography>}
      </Box>
    </StyledDropzone>
  );
};

export default ImageDropzone;
