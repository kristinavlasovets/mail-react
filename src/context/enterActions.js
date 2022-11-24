export const EnterSuccess = (user) => ({
	type: 'ENTER_SUCCESS',
	payload: user,
});
export const EnterFailure = (error) => ({
	type: 'ENTER_FAILURE',
	payload: error,
});
export const LogoutAction = () => ({type: 'LOGOUT'});
