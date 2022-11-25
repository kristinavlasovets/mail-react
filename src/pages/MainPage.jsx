import React from "react";
import { Box, Button } from "@mui/material";
import { useEnterContext } from "../context/enterContext";
import { LogoutAction } from "../context/enterActions";
import { Form } from "../components/Form";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Conversation } from "../components/Conversation";

export const MainPage = () => {
  const [conversations, setConversations] = useState([]);
  const { user, dispatch } = useEnterContext();

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/conversations/" + user._id
        );
        setConversations(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getConversations();
  }, [user._id]);

  const handleLogout = () => {
    dispatch(LogoutAction());
  };

  return (
    <Box>
      <Button onClick={handleLogout} sx={{ m: "20px auto", width: 100 }}>
        Logout
      </Button>
      <Form />
      {conversations.map((c) => (
        <Conversation conversation={c} currentUser={user} />
      ))}
    </Box>
  );
};
