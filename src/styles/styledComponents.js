import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";

export const StyledBox = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 32px;
  flex-wrap: wrap;
  margin: 20px auto;
  justify-content: center;
`;

export const CenteredTypography = styled(Typography)`
  text-align: center;
  margin-bottom: 20px;
`;

export const FormBox = styled(Box)`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const StyledDropzone = styled(Box)`
  border: 1px dashed #ced4d9;
  border-radius: 5px;
  color: #6c757d;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 5px;
  }
`;

export const ErrorTypography = styled(Typography)`
  margin-top: 8px;
  font-size: 14px;
  font-weight: bold;
  border: 1px solid #f44336;
  padding: 8px;
  border-radius: 4px;
  background-color: #f8d7da;
  color: #721c24;
  text-align: center;
`;
