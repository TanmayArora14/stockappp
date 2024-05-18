import React, { useState } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography, Divider, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(5),
  },
  input: {
    margin: theme.spacing(2),
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
    width: "50%", // Set button width to 50%
    "&:hover": {
      backgroundColor: theme.palette.primary.main, // Change background color on hover
      color: "#fff", // Change text color on hover
    },
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
    textAlign: "center",
  },
  line: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    width: "100%",
    marginBottom: theme.spacing(2),
  },
}));

const Register: React.FC = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        password,
      });
      // Redirect to login page after successful registration
      history("/login");
      history("/login", { replace: true });
    } catch (error) {
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.formContainer}>
      <Typography
        variant="h5"
        component="h2"
        className={classes.title}
        gutterBottom
      >
        Register
      </Typography>
      <Divider className={classes.line} />
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          className={classes.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Register"}
        </Button>
      </form>
      {error && <p className={classes.error}>{error}</p>}
    </div>
  );
};

export default Register;
