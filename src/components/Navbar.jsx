import { AppBar, Toolbar, Typography, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useUsers } from "../contexts/UsersContext";

export const Navbar = () => {
  const { isAuthenticated } = useUsers();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            FoodVerse
          </Link>
        </Typography>
        <Stack direction="row" spacing={2}>
          {isAuthenticated || (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
          {isAuthenticated && (
            <>
              <Button color="inherit" component={Link} to="/myrecipes">
                My Recipes
              </Button>
              <Button color="inherit" component={Link} to="/addreceipes">
                Add Receipes
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
