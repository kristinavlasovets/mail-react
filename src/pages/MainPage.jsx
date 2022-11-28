import React, {useSyncExternalStore} from 'react';
import {Box, Button} from '@mui/material';
import {useEnterContext} from '../context/enterContext';
import {LogoutAction} from '../context/enterActions';
import {Form} from '../components/Form';
import {useState} from 'react';
import {useEffect} from 'react';
import axios from 'axios';
import {Letter} from '../components/Letter';

export const MainPage = () => {
	const [conversations, setConversations] = useState([]);
	const [letters, setLetters] = useState([]);
	const [users, setUsers] = useState([]);
	const {user, dispatch} = useEnterContext();

	useEffect(() => {
		const getConversations = async () => {
			try {
				const res = await axios.get(
					'http://localhost:5000/conversations/' + user._id
				);
				setConversations(res.data);
				console.log(res.data);
			} catch (e) {
				console.log(e);
			}
		};
		getConversations();
	}, [user._id]);

	useEffect(() => {
		const getLetters = async () => {
			try {
				let requests = conversations.map((conversation) =>
					fetch('http://localhost:5000/letters/' + conversation._id)
				);
				Promise.all(requests)
					.then((responses) => Promise.all(responses.map((r) => r.json())))
					.then((res) => setLetters(res.flat()));
			} catch (e) {
				console.log(e);
			}
		};
		getLetters();
		console.log(letters);

		const getUsers = async () => {
			try {
				const res = await axios.get('http://localhost:5000/enter/users');
				setUsers(res.data);
				console.log(res.data);
			} catch (e) {
				console.log(e);
			}
		};
		getUsers();
	}, []);

	const handleLogout = () => {
		dispatch(LogoutAction());
	};

	return (
		<Box>
			<Button onClick={handleLogout} sx={{m: '20px auto', width: 100}}>
				Logout
			</Button>
			<Form users={users} />
			{letters?.map((letter, id) => (
				<Letter key={id} currentUser={user} letter={letter} />
			))}
		</Box>
	);
};
