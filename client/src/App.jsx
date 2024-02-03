import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Editor from './pages/Editor';
import View from './pages/View';
import { ToastContainer } from 'react-toastify';
import { useAuthContext } from './contexts/AuthContext';

/* prettier-ignore */
const CheckAuth = ({ children }) => {
	const { isLoggedIn } = useAuthContext();
	return isLoggedIn ? children : <Auth />
};
const router = createBrowserRouter([
	{
		path: '/',
		element: <Auth />,
	},
	{
		path: '/home',
		element: (
			<CheckAuth>
				<Home />
			</CheckAuth>
		),
	},
	{
		path: '/editor',
		element: (
			<CheckAuth>
				<Editor />
			</CheckAuth>
		),
	},
	{
		path: '/view',
		element: (
			<CheckAuth>
				<View />
			</CheckAuth>
		),
	},
]);

function App() {
	return (
		<div className="forest">
			<ToastContainer
				position="top-right"
				autoClose={1500}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
