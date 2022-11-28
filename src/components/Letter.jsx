import React, {useState, useEffect} from 'react';
import {
	Box,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Collapse,
} from '@mui/material';
import DraftsIcon from '@mui/icons-material/Drafts';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import axios from 'axios';

export const Letter = ({letter, currentUser}) => {
	const [user, setUser] = useState(null);
	const [open, setOpen] = React.useState(false);

	// useEffect(() => {
	// 	if (conversation) {
	// 		const friendId = conversation?.members.find((m) => m !== currentUser._id);

	// 		const getUser = async () => {
	// 			try {
	// 				const res = await axios(
	// 					'http://localhost:5000/enter/users/' + friendId
	// 				);
	// 				setUser(res.data);
	// 			} catch (e) {
	// 				console.log(e);
	// 			}
	// 		};
	// 		getUser();
	// 	}
	// }, [conversation, currentUser]);

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<Box>
			<List
				sx={{
					m: '10px auto',
					width: '100%',
					maxWidth: '80vw',
					border: '1px solid lightgray',
					borderRadius: '10px',
				}}
				component="nav"
			>
				<ListItemButton onClick={handleClick}>
					<ListItemIcon>
						<DraftsIcon />
					</ListItemIcon>
					<ListItemText>Subject: {letter.subject}</ListItemText>
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<ListItemButton>
					<ListItemText>From: {user?.username}</ListItemText>
					<ListItemText>Sent: </ListItemText>
				</ListItemButton>

				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItemButton sx={{pl: 4}}>
							<ListItemText></ListItemText>
						</ListItemButton>
					</List>
				</Collapse>
			</List>
		</Box>
	);
};
