import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Typography } from "@mui/material";
import { StyledDropzone } from "../styles/styledComponents";

const ImageDropzone = ({ value, onChange }) => {
  const [preview, setPreview] = useState(value || null);
  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        const validMimeTypes = ["image/jpeg", "image/png"];
        if (validMimeTypes.includes(file.type)) {
          const blobURL = URL.createObjectURL(file);
          setPreview(blobURL);
          onChange(file);
          setUploadError(null);
        } else {
          setUploadError(
            "Invalid file type. Please upload an image (JPEG, PNG only)."
          );
        }
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
  });

  return (
    <StyledDropzone {...getRootProps()}>
      <input {...getInputProps()} />
      {preview ? (
        <img src={preview} alt="Preview" />
      ) : (
        <Typography variant="body1">
          Drag and drop or click to select an image (JPEG, PNG only)
        </Typography>
      )}
      {uploadError && <Typography variant="error">{uploadError}</Typography>}
    </StyledDropzone>
  );
};

export default ImageDropzone;
