import * as React from 'react';
import { Logger } from '../../../common/Logger';
import { paths } from '../../../common/paths';
import { Term } from '../Term/Term';
import { Projects } from '../Projects/Projects';
import { Pty } from '../../lib/Pty';
import { listenDockerEvents } from '../../lib/dockerEvents';

const console = new Logger(__filename, true);

const { useEffect, useState } = React;

const getPtyIds = async (cb: (value: Pty[]) => void) => {
	try {
		const res = await fetch(paths.ptys);
		console.log("log: getPtyIds -> res", res);
		const ptyIds: string[] = await res.json();
		const ptys = ptyIds.map(ptyId => new Pty(ptyId));
		console.log("log: getPtyIds -> ptys", ptys);
		cb(ptys);
	} catch (error) {
		console.log("log: getPtyIds -> error", error);
	}
};

export const Connection: React.FunctionComponent = () => {
	const [ptys, setPtys] = useState<Pty[]>([]);
	const ref = React.createRef<HTMLButtonElement>();
	// Execute only once, when component is ready
	useEffect(() => {
		listenDockerEvents();
		getPtyIds((newPtys) => setPtys(newPtys));
		ref.current.addEventListener('click', () => {
			console.log("log: Connection:React.FunctionComponent ->  ptys", ptys);
			const newPty = new Pty();
			setPtys((oldPtys) => [...oldPtys, newPty]);
			console.log("log: Connection:React.FunctionComponent -> ptys 2", ptys);
		});
	}, []);

	return <div className={Connection.displayName.toLowerCase()}>
		<Projects addPty={(newPty: Pty) => {
			setPtys((oldPtys) => [...oldPtys, newPty]);
			console.log("log: Connection:React.FunctionComponent -> ptys", ptys);
		}} />
		<div className="buttons">
			<button ref={ref}>New Terminal</button>
		</div>
		<div className="terminals">
			{
				console.log("log: Connection:React.FunctionComponent -> ptys", ptys) ||
				ptys.map((pty, i) => {
					console.log('Xterm', i, pty)
					console.log("log: Connection:React.FunctionComponent -> ptys 3", ptys);
					return <Term
						key={pty.id}
						xId={pty.id}
						initialPid={pty.pid}
						command={pty.command}
						remove={
							(xId: number) => {
								console.log("log: Connection:React.FunctionComponent -> ptys", ptys);
								setPtys(() => {
									const newPtys = ptys.filter(pty => {
										console.log("log: Connection:React.FunctionComponent -> pty.pid, pty.id, xId", pty.pid, pty.id, xId);
										return pty.id !== xId;
									})
									console.log("log: Connection:React.FunctionComponent -> newPtys", newPtys);
									return newPtys;
								})
							}
						}
					/>
				})
			}
			<div className="term fake"></div>
			<div className="term fake"></div>
		</div>
	</div>
}
Connection.displayName = 'Connection';
