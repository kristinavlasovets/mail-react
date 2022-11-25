import React, {useState} from 'react';
import {Box, TextField, TextareaAutosize, Button} from '@mui/material';

export const Form = () => {
	const [receiver, setReceiver] = useState('');
	const [subject, setSubject] = useState('');
	const [text, setText] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('sent');
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
			<TextField
				sx={{m: '5px auto', width: '100%'}}
				onChange={(event) => setReceiver(event.target.value)}
				label="Receiver"
				variant="outlined"
				value={receiver}
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
