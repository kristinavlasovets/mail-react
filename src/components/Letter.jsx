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

export const Letter = ({letters}) => {
	const [user, setUser] = useState(null);
	const [open, setOpen] = React.useState(false);

	console.log(letters)

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
						<ListItemText>{letters[0].subject}</ListItemText>
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<ListItemButton>
					<ListItemText>From:{letters[0].sender} </ListItemText>
					<ListItemText>Sent: {letters[0].date}</ListItemText>
				</ListItemButton>

				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItemButton sx={{pl: 4}}>
								<ListItemText>{letters[0].text}</ListItemText>
						</ListItemButton>
					</List>
				</Collapse>
			</List>
		</Box>
	)
};
