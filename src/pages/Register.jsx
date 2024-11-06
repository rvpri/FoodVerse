import { useState, useContext } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ReceipesContext } from "../contexts/ReceipesContext";
import { Navbar } from "../components/navbar";

const AddRecipes = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddUser(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <Navbar />
      <div>
        <Typography variant="h4" gutterBottom>
          Add Recipes
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Username"
              variant="outlined"
              value={userName}
              onChange={handleUserNameChange}
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <Button variant="contained" type="submit">
              Register
            </Button>
          </Stack>
        </form>
      </div>
    </>
  );
};

export default AddRecipes;
