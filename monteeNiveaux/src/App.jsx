import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import jwt_decode from "jwt-decode";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userId, setUserId] = useState(null);
  const apiUrl = "http://localhost:3000/api";

  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token);
      setUserId(decoded.id);
    }
  }, [token]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <div className="container">
          <header className="header">Défis Informatique</header>
          <Routes>
            {!token ? (
              <>
                <Route
                  path="/login"
                  element={<Login setToken={setToken} setUserId={setUserId} />}
                />
                <Route
                  path="/register"
                  element={
                    <Register setToken={setToken} setUserId={setUserId} />
                  }
                />
              </>
            ) : (
              <Route
                path="/"
                element={<Dashboard token={token} userId={userId} />}
              />
            )}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
