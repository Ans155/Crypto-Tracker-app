// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle login form submission
//   };

//   return (
//     <div>
//       <h2>Login Page</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input type="email" value={email} onChange={handleEmailChange} />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input type="password" value={password} onChange={handlePasswordChange} />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       <p>
//         Don't have an account? <Link to="/signup">Sign up here</Link>.
//       </p>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from "react";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import {signInWithEmailAndPassword} from 'firebase/auth';
import {createUserWithEmailAndPassword} from 'firebase/auth';

import "firebase/auth";
import { auth } from "../firebase";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    color: "purple",
    marginBottom: 30,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    margin: 10,
    width: 300,
  },
  button: {
    margin: 10,
    width: 150,
  },
  link: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    color: "purple",
    textDecoration: "none",
    marginTop: 20,
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      history.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      history.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        Login
      </Typography>
      <form className={classes.form}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={classes.input}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={classes.input}
          required
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          className={classes.button}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSignUp}
          className={classes.button}
        >
          Sign Up
        </Button>
        {error && <Typography color="error">{error}</Typography>}
        <Link to="/" className={classes.link}>
          Back to home
        </Link>
      </form>
    </Container>
  );
};

export default LoginPage;
