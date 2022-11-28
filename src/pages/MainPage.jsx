import React, {useState, useEffect, useRef} from 'react';
import {Box, Button} from '@mui/material';
import {useEnterContext} from '../context/enterContext';
import {LogoutAction} from '../context/enterActions';
import axios from 'axios';
import {io} from 'socket.io-client';
import {Form} from '../components/Form';
import {Letter} from '../components/Letter';

export const MainPage = () => {
	const [conversations, setConversations] = useState([]);
	const [letters, setLetters] = useState([]);
	const socket = useRef(io('ws://localhost:8900'));
	const {user, dispatch} = useEnterContext();

	useEffect(() => {
		const getConversations = async () => {
			try {
				const res = await axios.get(
					'http://localhost:5000/conversations/' + user._id
				);
				setConversations(res.data);
			} catch (e) {
				console.log(e);
			}
		};
		getConversations();
	}, [user]);

	useEffect(() => {
		const getLetters = async () => {
			try {
				const requests = await Promise.all(
					conversations.map((conversation) =>
						axios.get('http://localhost:5000/letters/' + conversation._id)
					)
				);

				setLetters(
					(prev) =>
						(prev = requests
							?.map((promise) => promise.data)
							.flat()
							.filter((letter) => letter.receiver === user._id))
				);
			} catch (e) {
				console.log(e);
			}
		};
		getLetters();
	}, [conversations, user._id]);

	const handleLogout = () => {
		dispatch(LogoutAction());
	};

	return (
		<Box>
			<Button onClick={handleLogout} sx={{m: '20px auto', width: 100}}>
				Logout
			</Button>
			<Form />
			{letters &&
				letters.map((letter, i) => (
					<Letter key={i} currentUser={user} letter={letter} />
				))}
		</Box>
	);
};
