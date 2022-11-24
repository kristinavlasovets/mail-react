import React from 'react';
import {Box, Button} from '@mui/material';
import {useEnterContext} from '../context/enterContext';
import {LogoutAction} from '../context/enterActions';

export const MainPage = () => {
	const {dispatch} = useEnterContext();
	const handleLogout = () => {
		dispatch(LogoutAction());
	};
	return (
		<Box>
			<Button onClick={handleLogout} sx={{m: '20px auto', width: 100}}>
				Logout
			</Button>
		</Box>
	);
};
