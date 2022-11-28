import React, {useState} from 'react';
import {
	Box,
	Autocomplete,
	TextField,
	TextareaAutosize,
	Button,
} from '@mui/material';
import axios from 'axios';

export const Form = ({users}) => {
	const [receiver, setReceiver] = useState(null);
	const [subject, setSubject] = useState('');
	const [text, setText] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		const response = await axios.post();
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={{
				m: '5vh auto',
				width: '80vw',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Autocomplete
				disablePortal
				value={receiver}
				onChange={(event, newValue) => {
					setReceiver(newValue);
				}}
				options={users}
				autoHighlight
				getOptionLabel={(option) => option.username}
				isOptionEqualToValue={(option, value) =>
					option.username === value.username
				}
				sx={{width: '100%'}}
				renderInput={(params) => <TextField {...params} label="Receiver" />}
			/>
			<TextField
				sx={{m: '5px auto', width: '100%'}}
				onChange={(event) => setSubject(event.target.value)}
				label="Subject"
				variant="outlined"
				value={subject}
			/>
			<TextareaAutosize
				style={{margin: '10px auto', width: '100%'}}
				onChange={(event) => setText(event.target.value)}
				minRows={5}
				placeholder=" ..."
				variant="outlined"
				value={text}
			/>
			<Button
				sx={{m: '20px auto', width: 100}}
				type="submit"
				variant="contained"
			>
				Send
			</Button>
		</Box>
	);
};
