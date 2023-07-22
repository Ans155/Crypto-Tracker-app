import { Box, Button, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Signup = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const customStyles = {
    color: "red",
  };

  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    setError(""); // Reset error message before validating

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.email}`,
        type: "success",
      });

      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
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
        Sign Up
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
        InputProps={{
          style: {
            color: "black", // Change text color to black
            borderBottomColor: "#EEBC1D", // Change bottom border color to yellow
          },
        }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Confirm Password"
        type="password"
        InputProps={{
          style: {
            color: "black", // Change text color to black
            borderBottomColor: "#EEBC1D", // Change bottom border color to yellow
          },
        }}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup;
