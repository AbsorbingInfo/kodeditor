import React from 'react';
import LOGO from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const SnippetCard = ({ snippet }) => {
	const navigate = useNavigate();
	const handleView = () => {
		navigate('/view', { state: { snippet } });
	};
	console.log('snippet card:', snippet);
	return (
		<div>
			<div className="card card-compact w-96 bg-base-100 shadow-xl">
				<figure>
					<img
						src={LOGO}
						alt="logo"
					/>
				</figure>
				<div className="card-body">
					<h2 className="card-title">{snippet.id}</h2>
					<p>{snippet.runtime}</p>
					<div className="card-actions justify-end">
						<button
							onClick={handleView}
							className="btn btn-primary"
						>
							View
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SnippetCard;
