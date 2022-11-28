import React, {useState} from 'react';
import {
	Box,
	Autocomplete,
	TextField,
	TextareaAutosize,
	Button,
} from '@mui/material';
import axios from 'axios';
import {useEnterContext} from '../context/enterContext';
import {useEffect} from 'react';

export const Form = () => {
	const [users, setUsers] = useState([]);
	const [receiver, setReceiver] = useState(null);
	const [subject, setSubject] = useState('');
	const [text, setText] = useState('');

	const {user} = useEnterContext();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await axios.post('http://localhost:5000/conversations', {
			senderId: user._id,
			receiverId: receiver._id,
		});
		console.log(response.data);
		const responseLetter = await axios.post('http://localhost:5000/letters', {
			conversationId: response.data._id,
			sender: user._id,
			receiver: receiver._id,
			subject: subject,
			text: text,
		});
		console.log(responseLetter);
	};

	useEffect(() => {
		const getUsers = async () => {
			try {
				const res = await axios.get('http://localhost:5000/enter/users');
				setUsers(res.data);
			} catch (e) {
				console.log(e);
			}
		};
		getUsers();
	}, []);

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
