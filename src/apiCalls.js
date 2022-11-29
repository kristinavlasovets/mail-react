import axios from 'axios';

export const enterCall = async (username, dispatch) => {
	try {
		const res = await axios.post(
			process.env.REACT_APP_SERVER_URL + '/enter/user',
			username
		);
		dispatch({type: 'ENTER_SUCCESS', payload: res.data});
	} catch (e) {
		dispatch({type: 'ENTER_FAILURE', payload: e});
	}
};
