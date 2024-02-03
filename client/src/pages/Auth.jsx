import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import LOGO from '../assets/logo.png';
const Auth = () => {
	const [isRegisterd, setIsRegisterd] = useState(true);

	return (
		<div className="mb-4 flex justify-evenly items-center min-h-screen max-sm:flex-col">
			<div>
				<img
					className=" h-16 mx-auto mb-2 max-sm:mt-3 max-sm:mb-2"
					alt="Logo"
					src={LOGO}
				/>
				<div className="text-7xl font-mono font-black max-[855px]:text-4xl">
					Kod<span className="text-red-600">e</span>ditor
				</div>
			</div>
			<div>
				{isRegisterd ? (
					<LoginForm setIsRegisterd={setIsRegisterd} />
				) : (
					<RegisterForm setIsRegisterd={setIsRegisterd} />
				)}
			</div>
		</div>
	);
};

export default Auth;
