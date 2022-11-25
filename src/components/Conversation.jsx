import React, { useState, useEffect } from "react";
import {
  Box,
  ListSubheader,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import DraftsIcon from "@mui/icons-material/Drafts";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import axios from "axios";

export const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    const friendId = conversation.member.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios(
          "http://localhost:5000/users?userId=" + friendId
        );
        setUser(res.data)
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    };
    getUser()
  }, [conversation, currentUser]);


  console.log(user)
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <List
        sx={{
          m: "10px auto",
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
        component="nav"
        subheader={<ListSubheader component="div">Inbox</ListSubheader>}
      >
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText>Subject: </ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <ListItemButton>
          <ListItemText>From: </ListItemText>
          <ListItemText>Sent: </ListItemText>
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText>Hello!</ListItemText>
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  );
};
