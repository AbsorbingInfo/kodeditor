import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCodeSnippetsService } from '../services/codeServices';
import SnippetCard from '../components/SnippetCard';

const Home = () => {
	const [snippets, setSnippets] = useState([]);
	const navigate = useNavigate();
	const handleCreateNew = () => {
		navigate('/editor');
	};

	const fetchSnippets = async () => {
		const response = await getCodeSnippetsService();
		if (response.status === 200) {
			setSnippets(response.data.snippets);
		}
	};

	useEffect(() => {
		fetchSnippets();
	}, []);
	return (
		<div className="mx-auto w-8/12">
			<div className="navbar bg-base-100">
				<a
					onClick={handleCreateNew}
					className="btn btn-primary text-xl"
				>
					Create New
				</a>
			</div>
			<div className="flex flex-wrap">
				{snippets.map((snippet) => (
					<SnippetCard snippet={snippet} />
				))}
			</div>
		</div>
	);
};

export default Home;
