import {createContext, useContext, useReducer} from 'react';
import {EnterReducer} from './enterReducer';

const INITIAL_STATE = {
	user: null,
	isEntered: false,
	isError: '',
};
export const EnterContext = createContext(INITIAL_STATE);

export const EnterContextProvider = ({children}) => {
	const [state, dispatch] = useReducer(EnterReducer, INITIAL_STATE);

	return (
		<EnterContext.Provider
			value={{
				user: state.user,
				isEntered: state.isEntered,
				isError: state.isError,
				dispatch,
			}}
		>
			{children}
		</EnterContext.Provider>
	);
};

export const useEnterContext = () => useContext(EnterContext);
