import React, { useState } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
  },
  input: {
    margin: theme.spacing(2),
    width: "100%",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: theme.spacing(3),
  },
  button: {
    width: "50%",
    backgroundColor: "#3f51b5", // Primary color
    color: "white",
    padding: theme.spacing(1),
    border: "none",
    borderRadius: theme.shape.borderRadius,
    cursor: "pointer",
    transition: "background-color 1s ease",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
}));

const Login: React.FC = () => {
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
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      // Redirect to dashboard after successful login
      history("/");
      history("/", { replace: true });
    } catch (error) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.formContainer}>
      <Typography variant="h5" component="h2" gutterBottom>
        Login
      </Typography>
      <Divider style={{ width: "100%" }} />
      <form onSubmit={handleSubmit}>
        <input
          className={classes.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={classes.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={classes.buttonContainer}>
          <button className={classes.button} type="submit" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Login"}
          </button>
        </div>
      </form>
      {error && <p className={classes.error}>{error}</p>}
    </div>
  );
};

export default Login;
