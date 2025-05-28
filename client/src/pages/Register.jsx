import { useState } from "react";
import axios from "axios";
import { Box, Paper, Typography, TextField, Button, Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const signup = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/feed");
    } catch (err) {
      const msg = err.response?.data?.error || "Signup failed";
      setError(msg);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
      <Paper sx={{ p: 4, width: "100%", maxWidth: 400 }} elevation={3}>
        <Typography variant="h5" mb={2} align="center">
          Sign Up
        </Typography>
        {error && <Typography color="error" align="center" mb={2}>{error}</Typography>}
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" fullWidth onClick={signup}>
          Sign Up
        </Button>
        <Box textAlign="center" mt={2}>
          <Link component={RouterLink} to="/">
            Already have an account? Login
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}
