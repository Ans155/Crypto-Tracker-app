import { Box, Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Login = ({ handleClose }) => {
  const customStyles = {
    color: 'red',
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async () => {};
  

  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        color:"black",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        InputProps={{
          style: customStyles,
        }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        value={password}
        InputProps={{
          style: customStyles,
        }}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default Login