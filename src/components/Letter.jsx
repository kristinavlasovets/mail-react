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
import moment from 'moment';

export const Letter = ({currentUser, letter}) => {
	const [sender, setSender] = useState(null);
	const [open, setOpen] = React.useState(false);

	useEffect(() => {
		const getUser = async () => {
			const senderId = letter.sender;
			try {
				const res = await axios(
					'http://localhost:5000/enter/users/' + senderId
				);
				setSender(res.data);
			} catch (e) {
				console.log(e);
			}
		};
		getUser();
	}, [letter, currentUser]);

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
					<ListItemText>From: {sender?.username}</ListItemText>
					<ListItemText>
						Sent: {moment(letter.sendTime).format('lll')}
					</ListItemText>
				</ListItemButton>

				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItemButton sx={{pl: 4}}>
							<ListItemText>{letter.text}</ListItemText>
						</ListItemButton>
					</List>
				</Collapse>
			</List>
		</Box>
	);
};
