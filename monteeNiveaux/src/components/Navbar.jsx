import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Home, Login as LoginIcon, PersonAdd } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./App.css";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className="title">
          Montee de Niveaux
        </Typography>
        <Button color="inherit" startIcon={<Home />} component={Link} to="/">
          Accueil
        </Button>
        <Button
          color="inherit"
          startIcon={<LoginIcon />}
          component={Link}
          to="/login"
        >
          Se connecter
        </Button>
        <Button
          color="inherit"
          startIcon={<PersonAdd />}
          component={Link}
          to="/register"
        >
          S&apos;inscrire
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
