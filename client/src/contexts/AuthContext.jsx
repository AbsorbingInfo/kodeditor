import { createContext, useContext, useState, FC, ReactNode } from 'react';
import { useEffect } from 'react';
import { verifyToken } from '../services/userServices';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const checkLoginStatus = async () => {
		const response = await verifyToken();
		console.log(55, response);
		if (response?.status === 200) {
			setIsLoggedIn(true);
		}
	};
	useEffect(() => {
		checkLoginStatus();
	}, []);

	return (
		<AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useUserContext must be used within a UserProvider');
	}
	return context;
};
