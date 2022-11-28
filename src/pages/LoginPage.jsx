import React, { useState } from "react";
import { enterCall } from "../apiCalls";
import { Box, TextField, Button } from "@mui/material";
import { useEnterContext } from "../context/enterContext";

export const LoginPage = () => {
  const [name, setName] = useState("");
  const { dispatch } = useEnterContext();
  const handleEnter = (e) => {
    e.preventDefault();
    enterCall({ username: name }, dispatch);
  };
  return (
    <Box
      sx={{
        m: "20vh auto",
        width: 500,
        display: "flex",
        flexDirection: "column",
      }}
      component="form"
      onSubmit={handleEnter}
    >
      <TextField
        sx={{ m: "0 auto", width: 200 }}
        onChange={(event) => setName(event.target.value)}
        label="Your name"
        variant="outlined"
        value={name}
      />
      <Button
        sx={{ m: "20px auto", width: 100 }}
        type="submit"
        variant="contained"
      >
        Enter
      </Button>
    </Box>
  );
};
