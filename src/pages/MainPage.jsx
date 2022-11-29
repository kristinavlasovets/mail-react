import React, {useState, useEffect, useRef} from 'react';
import {Box, Button} from '@mui/material';
import {useEnterContext} from '../context/enterContext';
import {LogoutAction} from '../context/enterActions';
import axios from 'axios';

import {Form} from '../components/Form';
import {Letter} from '../components/Letter';

export const MainPage = () => {
	const [conversations, setConversations] = useState([]);
	const [letters, setLetters] = useState([]);

	const socket = useRef();
	const {user, dispatch} = useEnterContext();

	useEffect(() => {
		const getConversations = async () => {
			try {
				const res = await axios.get(
					'https://mail-nodejs-production.up.railway.app' +
						'/conversations/' +
						user._id
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
						axios.get(
							'https://mail-nodejs-production.up.railway.app' +
								'/letters/' +
								conversation._id
						)
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
			<Button
				onClick={handleLogout}
				sx={{
					m: '10px 9vw',
					width: 100,
					color: '#F8FBFA',
					backgroundColor: '#B2A9A3',
					'&:hover': {
						cursor: 'pointer',
						backgroundColor: '#71E2FC',
						color: '#F8FBFA',
						fontWeight: 700,
					},
				}}
			>
				Logout
			</Button>
			<Form socket={socket} setLetters={setLetters} />
			{letters &&
				letters.map((letter, i) => (
					<Letter key={i} currentUser={user} letter={letter} />
				))}
		</Box>
	);
};
