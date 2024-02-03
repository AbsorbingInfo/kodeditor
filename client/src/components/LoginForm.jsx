import { useState } from 'react';
import { loginService } from '../services/userServices';
import { toast } from 'react-toastify';
import { useAuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setIsRegisterd }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { setIsLoggedIn } = useAuthContext();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const userNameRegEx = /^[a-zA-Z0-9-_]+$/;
		const passwordRegEx = /^\S+$/;
		if (!userNameRegEx.test(username)) {
			toast.error(
				"Username can only include alphanumeric characters, '_', and '-'.",
			);
		} else if (!passwordRegEx.test(password)) {
			toast.error('Password should not contain spaces');
		} else {
			const response = await loginService(username, password);
			if (response.status === 200) {
				toast.success('user logged in successfully');
				setIsLoggedIn(true);
				navigate('/home');
			} else {
				toast.error(response.data.message);
			}
		}
	};

	return (
		<div>
			<div className="text-5xl text-center text-accent font-bold my-6">
				Login
			</div>
			<form onSubmit={handleSubmit}>
				<div className="my-3">
					<input
						type="text"
						placeholder="Username"
						className="input input-bordered w-full max-w-xs"
						maxLength={15}
						minLength={3}
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="my-3">
					<input
						type="password"
						placeholder="Password"
						className="input input-bordered w-full max-w-xs"
						maxLength={15}
						minLength={8}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="my-4 flex justify-end">
					<button className="btn">Login</button>
				</div>
			</form>
			<div>
				Don't have an account?{' '}
				<span
					className="link link-accent"
					onClick={() => setIsRegisterd(false)}
				>
					Register Now
				</span>
			</div>
		</div>
	);
};

export default LoginForm;
