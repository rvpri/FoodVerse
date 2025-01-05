import React, { useState } from "react";
import { Stack, Button, TextField } from "@mui/material";
import { Navbar } from "../components/navbar";
import { useUsers } from "../contexts/UsersContext";
import { useNavigate } from "react-router-dom";
import { CenteredTypography, FormBox } from "../styles/styledComponents";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useUsers();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      login(formData.email, formData.password, navigate);
      setFormData({ email: "", password: "" });
      setErrors({ email: "", password: "" });
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <>
      <Navbar />
      <FormBox
        sx={{
          width: "400px",
          margin: "50px auto",
        }}
      >
        <CenteredTypography variant="h5">Login</CenteredTypography>
        <form onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              variant="outlined"
              size="small"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              size="small"
              name="password"
              autocomplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              required
            />
            <Button variant="contained" size="small" type="submit">
              Login
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleRegisterRedirect}
            >
              New User? SignUp
            </Button>
          </Stack>
        </form>
      </FormBox>
    </>
  );
};

export default Login;
