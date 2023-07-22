import { Box, Button, TextField, Typography } from "@material-ui/core";
import { Lock } from "@material-ui/icons";
import { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const customStyles = {
    color: "red",
  };

  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Please fill all the fields");
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: `Login Successful. Welcome ${result.user.email}`,
        type: "success",
      });

      handleClose();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box
      p={3}
      style={{
        backgroundColor: "#F5F5F5",
        borderRadius: "8px",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography variant="h4" style={{ color: "#333333" }}>
        Login
      </Typography>
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        InputProps={{
          style: {
            color: "black", // Change text color to black
            borderBottomColor: "#EEBC1D", // Change bottom border color to yellow
          },
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
          style: {
            color: "black", // Change text color to black
            borderBottomColor: "#EEBC1D", // Change bottom border color to yellow
          },
          endAdornment: (
            <Lock
              style={{
                color: customStyles.color,
                fontSize: "1.5rem",
              }}
            />
          ),
        }}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      {error && (
        <Typography variant="body1" style={{ color: "red" }}>
          {error}
        </Typography>
      )}
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D", color: "black", transition: "0.3s" }} // Change text color to black
        onClick={handleSubmit}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#FFD700";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#EEBC1D";
        }}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
