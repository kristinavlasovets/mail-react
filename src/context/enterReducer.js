export const EnterReducer = (state, action) => {
	switch (action.type) {
		case 'ENTER_SUCCESS':
			return {
				user: action.payload,
				isEntered: true,
				isError: '',
			};
		case 'ENTER_FAILURE':
			return {
				user: null,
				isEntered: false,
				isError: action.payload,
			};
		case 'LOGOUT':
			return {
				user: null,
				isEntered: false,
				isError: '',
			};

		default:
			return state;
	}
};
