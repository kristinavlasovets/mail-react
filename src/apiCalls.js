import axios from 'axios';

export const enterCall = async (username, dispatch) => {
	try {
		const res = await axios.post('http://localhost:5000/enter/user', username);
		dispatch({type: 'ENTER_SUCCESS', payload: res.data});
	} catch (e) {
		dispatch({type: 'ENTER_FAILURE', payload: e});
	}
};
