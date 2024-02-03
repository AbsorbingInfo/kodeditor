import { useState } from 'react';
import { toast } from 'react-toastify';
import { registerService } from '../services/userServices';

const Register = ({ setIsRegisterd }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

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
			if (
				password === confirmPassword &&
				username.length > 2 &&
				password.length > 7
			) {
				const response = await registerService(username, password);
				if (response?.status === 201) {
					toast.success('user created successfully');
					setIsRegisterd(true);
				} else {
					toast.error(response?.data.message);
				}
			} else if (password !== confirmPassword) {
				toast.error('password and confirm password does not match');
			}
		}
	};

	return (
		<div>
			<div className="text-5xl text-center text-accent font-bold my-6">
				Register
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
				<div className="my-3">
					<input
						type="password"
						placeholder="Confirm Password"
						className="input input-bordered w-full max-w-xs"
						maxLength={15}
						minLength={8}
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</div>
				<div className="my-4 flex justify-end">
					<button
						type="submit"
						className="btn"
					>
						Sign up
					</button>
				</div>
			</form>
			<div>
				Already have an account?{' '}
				<span
					className="link link-accent"
					onClick={() => setIsRegisterd(true)}
				>
					Login Now
				</span>
			</div>
		</div>
	);
};

export default Register;
