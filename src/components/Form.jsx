import React, {useState} from 'react';
import {
	Box,
	Autocomplete,
	TextField,
	TextareaAutosize,
	Button,
} from '@mui/material';
import axios from 'axios';
import {io} from 'socket.io-client';
import {useEnterContext} from '../context/enterContext';
import {useEffect} from 'react';

export const Form = ({socket, setLetters}) => {
	const [users, setUsers] = useState([]);
	const [receiver, setReceiver] = useState(null);
	const [subject, setSubject] = useState('');
	const [text, setText] = useState('');
	const [arrivalLetter, setArrivalLetter] = useState(null);

	const {user} = useEnterContext();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await axios.post('http://localhost:5000/conversations', {
			senderId: user._id,
			receiverId: receiver._id,
		});

		const responseLetter = await axios.post('http://localhost:5000/letters', {
			conversationId: response.data._id,
			sender: user._id,
			receiver: receiver._id,
			subject: subject,
			text: text,
		});

		socket.current.emit('sendLetter', {
			conversationId: response.data._id,
			sender: user._id,
			receiver: receiver._id,
			subject: subject,
			text: text,
		});
	};
	useEffect(() => {
		socket.current = io('ws://localhost:8900');
		socket.current.on('getLetter', (data) => {
			setArrivalLetter({
				sender: data.sender,
				receiver: data.receiver,
				text: data.text,
				subject: data.subject,
				conversationId: data.conversationId,
				sendTime: Date.now(),
			});
		});
	}, []);

	useEffect(() => {
		if (arrivalLetter) {
			setLetters((prev) => [arrivalLetter, ...prev]);
		}
	}, [arrivalLetter]);

	useEffect(() => {
		const getUsers = async () => {
			try {
				const res = await axios.get('http://localhost:5000/enter/users');
				setUsers(res.data);
			} catch (e) {
				console.log(e);
			}
		};

		socket.current.emit('addUser', user._id);
		socket.current.on('getUsers', (users) => {
			getUsers();
		});
	}, [user]);

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={{
				m: '9vh 9vw',
				width: '50vw',
				maxWidth: 600,
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
				sx={{m: '10px auto', width: '100%'}}
				onChange={(event) => setSubject(event.target.value)}
				label="Subject"
				variant="outlined"
				value={subject}
			/>
			<TextareaAutosize
				style={{
					width: '95%',
					padding: '10px',
					fontSize: '22px',
					fontFamily: 'Roboto',
					color: '#245943',
					border: '1px solid #B2A9A3',
					borderRadius: '5px',
				}}
				onChange={(event) => setText(event.target.value)}
				minRows={3}
				placeholder=" ..."
				value={text}
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
				Send
			</Button>
		</Box>
	);
};
