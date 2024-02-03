import { useState, useRef, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { Terminal } from 'xterm';
import { useLocation } from 'react-router-dom';

const View = () => {
	const location = useLocation();
	const snippet = location.state?.snippet;
	const [isTerminalOpen, setIsTerminalOpen] = useState(false);
	const xtermRef = useRef(null);
	var term = new Terminal();

	console.log('aagya', snippet);
	useEffect(() => {
		if (!isTerminalOpen) {
			term.open(xtermRef.current);
			snippet.output.map((log) => {
				term.writeln(log);
			});
			setIsTerminalOpen(true);
		}
	}, []);

	return (
		<div>
			<div className="flex justify-center mt-5">
				<div>
					<MonacoEditor
						height="435px"
						width="800px"
						language={snippet.runtime}
						theme="vs-dark"
						value={snippet.content}
						options={{ readOnly: true }}
					/>
				</div>
				<div>
					<div ref={xtermRef}></div>
				</div>
			</div>
		</div>
	);
};

export default View;
