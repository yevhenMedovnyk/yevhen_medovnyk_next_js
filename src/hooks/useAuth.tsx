'use client';

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import {
	signInWithPopup,
	GoogleAuthProvider,
	onAuthStateChanged,
	signOut,
	User,
} from 'firebase/auth';
import { useAppDispatch } from './redux';
import { setUser } from '../redux/slices/authSlice';
import { IUser } from '../types/IUser';
import { auth } from '../../firebase';
import { useFetchClient } from './useFetchClient';

const AuthContext = createContext({
	signInWithGoogle: async () => {},
	logout: async () => {},
	loading: true,
});

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const dispatch = useAppDispatch();
	const provider = new GoogleAuthProvider();
	const [loading, setLoading] = React.useState(true);
	const fetchClient = useFetchClient();

	// універсальна функція: створює юзера тільки якщо треба
	const fetchAndSetUser = async (user: User, shouldCreate = false) => {
		try {
			const idTokenResult = await user.getIdTokenResult(true);
			const claims = idTokenResult.claims;

			const { uid, displayName, email } = user;

			let user_db;

			try {
				const res = await fetchClient('/api/users/get-user?uid=' + uid);
				user_db = res;
			} catch {
				user_db = null;
			}

			if (!user_db && shouldCreate) {
				const newUser: IUser = {
					displayName: displayName || '',
					email: email || '',
					uid,
					isAdmin: Boolean(claims.isAdmin),
				};

				await fetchClient(
					'/api/users/create-user',
					{
						method: 'POST',
						body: JSON.stringify(newUser),
					},
					true
				);
				user_db = newUser;
			}

			if (user_db) {
				dispatch(
					setUser({
						...user_db,
						isAdmin: Boolean(claims.isAdmin),
					})
				);
			}
		} catch (error) {
			console.error('fetchAndSetUser error:', error);
		}
	};

	const signInWithGoogle = async () => {
		try {
			const userCredential = await signInWithPopup(auth, provider);
			const user = userCredential?.user;
			if (user) {
				await fetchAndSetUser(user, true); //створюємо користувача лише тут
			}
		} catch (error) {
			console.error('Error during Google login:', error);
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
			dispatch(
				setUser({
					displayName: '',
					email: '',
					uid: '',
					isAdmin: false,
				})
			);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			if (currentUser?.uid) {
				await fetchAndSetUser(currentUser, false); // без створення
			}
			setLoading(false);
		});
		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={{ signInWithGoogle, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const UserAuth = () => useContext(AuthContext);
