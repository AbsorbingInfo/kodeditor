import { useState, useRef, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { Terminal } from 'xterm';
import { toast } from 'react-toastify';
import { executeCodeService, saveCodeService } from '../services/codeServices';
import { useNavigate } from 'react-router-dom';

const Editor = () => {
	const [code, setCode] = useState(null);
	const [language, setLanguage] = useState(null);
	const [isTerminalOpen, setIsTerminalOpen] = useState(false);
	const [output, setOutput] = useState([]);
	const [isValid, setIsValid] = useState(false);
	const navigate = useNavigate();
	const xtermRef = useRef(null);
	var term = new Terminal();

	useEffect(() => {
		if (!isTerminalOpen) {
			term.open(xtermRef.current);
			setIsTerminalOpen(true);
			xtermRef.current = term;
		}
	}, []);

	const handleExecute = async () => {
		if (!language) {
			toast.error('Choose a language');
			return;
		}
		if (!code) {
			toast.error('Write code in the editor');
			return;
		}
		const response = await executeCodeService(language, code);
		if (response.status === 200) {
			toast.success('Executed successfully');
			response?.data?.output?.logged.map((log) => {
				xtermRef.current.clear();
				xtermRef.current.writeln(log);
				setIsValid(true);
			});
			setOutput(response?.data?.output?.logged);
		} else {
			toast.error('Internal server error');
		}
	};

	const handleSave = async (e) => {
		e.preventDefault();
		const response = await saveCodeService(language, code, output);
		if (response.status === 200) {
			toast.success('Snippet saved successfully');
			navigate('/home');
		} else {
			toast.error('Internal server error');
		}
	};

	return (
		<div>
			<div className="flex justify-center mt-5">
				<div>
					<MonacoEditor
						height="435px"
						width="800px"
						language={language}
						theme="vs-dark"
						value={code}
						onChange={(newValue) => setCode(newValue)}
					/>
				</div>
				<div>
					<div>
						<div ref={xtermRef}></div>
					</div>
					<div className="flex justify-end">
						{isValid && (
							<button
								onClick={handleSave}
								className="btn btn-accent"
							>
								Save
							</button>
						)}
						{language && (
							<button
								onClick={handleExecute}
								className="btn btn-accent"
							>
								Execute
							</button>
						)}
						<div className="dropdown">
							<div
								tabIndex={0}
								role="button"
								className="btn btn-accent m-1"
							>
								{language ? language : 'Choose Language'}
							</div>
							<ul
								tabIndex={0}
								className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
							>
								<li onClick={(e) => setLanguage('Javascript')}>
									<a>Javascript</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Editor;
