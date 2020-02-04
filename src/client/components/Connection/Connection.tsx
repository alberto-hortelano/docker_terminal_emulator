import * as React from 'react';
import { Logger } from '../../../common/Logger';
import { paths } from '../../../common/paths';
import { Xterm } from '../Term/Xterm';

const console = new Logger(__filename, true);

const { useEffect, useState } = React;

interface Pty {
	pid: string;
	id: number;
}

const generateId = ((n: number) => () => n++)(0);

const getPtyIds = async (cb: (value: Pty[]) => void) => {
	const res = await fetch(paths.ptys);
	console.log("log: getPtyIds -> res", res);
	const ptyIds: string[] = await res.json();
	const ptys = ptyIds.map(ptyId => ({
		pid: ptyId,
		id: generateId()
	}));
	console.log("log: getPtyIds -> ptys", ptys);
	cb(ptys);
};

export const Connection: React.FunctionComponent = () => {
	const [ptys, setPtys] = useState<Pty[]>([]);
	const ref = React.createRef<HTMLButtonElement>();
	// Execute only once, when component is ready
	useEffect(() => {
		getPtyIds((newPtys) => setPtys(newPtys));
		ref.current.addEventListener('click', () => {
			console.log("log: Connection:React.FunctionComponent ->  ptys", ptys);
			const newPty = {
				pid: '',
				id: generateId()
			};
			setPtys((oldPtys) => [...oldPtys, newPty]);
			console.log("log: Connection:React.FunctionComponent -> ptys 2", ptys);
		});
	}, []);

	return <div id="Connection">
		<div className="buttons">
			<button ref={ref}>New Terminal</button>
		</div>
		{
			ptys.map((pty, i) => {
				console.log('Xterm', i, pty)
				console.log("log: Connection:React.FunctionComponent -> ptys 3", ptys);
				return <Xterm key={pty.id} xId={pty.id} initialPid={pty.pid} remove={(xId: number) => {
					console.log("log: Connection:React.FunctionComponent -> ptys", ptys);
					setPtys(() => {
						const newPtys = ptys.filter(pty => {
							console.log("log: Connection:React.FunctionComponent -> pty.pid, pty.id, xId", pty.pid, pty.id, xId);
							return pty.id !== xId;
						})
						console.log("log: Connection:React.FunctionComponent -> newPtys", newPtys);
						return newPtys;
					})
				}}></Xterm>
			})
		}
		<div className="term fake"></div>
		<div className="term fake"></div>
	</div>
}