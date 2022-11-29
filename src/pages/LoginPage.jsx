import React, {useState} from 'react';
import {enterCall} from '../apiCalls';
import {Box, TextField, Button} from '@mui/material';
import {useEnterContext} from '../context/enterContext';

export const LoginPage = () => {
	const [name, setName] = useState('');
	const {dispatch} = useEnterContext();
	const handleEnter = (e) => {
		e.preventDefault();
		enterCall({username: name}, dispatch);
	};
	return (
		<Box
			sx={{
				m: '20vh auto',
				width: 500,
				display: 'flex',
				flexDirection: 'column',
			}}
			component="form"
			onSubmit={handleEnter}
		>
			<TextField
				sx={{
					m: '0 auto',
					width: 200,
				}}
				inputProps={{
					sx: {
						fontSize: '22px',
						color: '#245943',
					},
				}}
				onChange={(event) => setName(event.target.value)}
				label="Your name"
				variant="outlined"
				color="action"
				value={name}
			/>
			<Button
				sx={{
					m: '20px auto',
					width: 200,
					fontSize: '22px',
					backgroundColor: '#245943',
					'&:hover': {
						cursor: 'pointer',
						backgroundColor: '#9CF27A',
						color: '#245943',
						fontWeight: 700,
					},
				}}
				type="submit"
				variant="contained"
			>
				Check Inbox
			</Button>
		</Box>
	);
};
