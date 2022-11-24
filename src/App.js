import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {LoginPage} from './pages/LoginPage';
import {MainPage} from './pages/MainPage';
import {useEnterContext} from './context/enterContext';

export const App = () => {
	const {isEntered, user} = useEnterContext();
	console.log(user);
	return isEntered ? (
		<Routes>
			<Route path="/main" element={<MainPage />} />
			<Route path="*" element={<Navigate to="/main" />} />
		</Routes>
	) : (
		<Routes>
			<Route path="/" element={<LoginPage />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
};
