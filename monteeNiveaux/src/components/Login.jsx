import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import "./App.css";

const Login = ({ setToken, setUserId }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    setToken(data.token);
    localStorage.setItem("token", data.token);
    const decoded = jwt_decode(data.token);
    setUserId(decoded.id);
  };

  return (
    <Container className="login-container">
      <Typography className="login-header">Se connecter</Typography>
      <form className="form" onSubmit={handleLogin}>
        <TextField
          className="login-input"
          label="Nom d'utilisateur"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          className="login-input"
          label="Mot de passe"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="login-button" type="submit">
          Se connecter
        </Button>
      </form>
    </Container>
  );
};

export default Login;
