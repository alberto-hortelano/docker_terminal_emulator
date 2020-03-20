import * as React from 'react';
import { Terminal, ITerminalOptions } from 'xterm';
import { FitAddon } from "xterm-addon-fit";
import { WSConnection } from "../../lib/WSConnection";
import { Logger } from '../../../common/Logger';
import { terminalConfig } from '../../../common/lib';
import { paths } from '../../../common/paths';

const console = new Logger(__filename, true);

const { useEffect, useState } = React;

interface Props {
	initialPid?: string;
	remove: (xId: number) => void;
	xId: number;
}

const xtermOptions: ITerminalOptions = {
	rendererType: 'dom',
	convertEol: true,
	rightClickSelectsWord: true,
	theme: {
		foreground: 'green'
	},
	...terminalConfig
}

const fitAddon = new FitAddon();

const initXterm = (connection: WSConnection, target: HTMLElement, setPid: (pid: string) => void, setConnected: (connected: boolean) => void) => {
	const xterm = new Terminal(xtermOptions);
	xterm.open(target);
	connection.on('processData', (data) => {
		xterm.write(data);
	});
	connection.on('error', (data) => {
		xterm.write(data);
	});
	connection.on('pid', (pid) => {
		xterm.clear();
		setPid(pid);
	});
	connection.on('connected', (connected) => {
		if (connection.name) {
			setPid(connection.name);
			connection.send('clear\n');
		}
		setConnected(!!connected);
		console.log("log: initXterm -> connected", connected, !!connected);
	});
	xterm.onData(data => {
		console.log('--->    onData', data);
		connection.send(data);
	});
	xterm.loadAddon(fitAddon);
	// fitAddon.fit();
	console.log("log: initXterm -> xterm", xterm.cols);
}

const close = async (pid: string, connection: WSConnection, remove: () => void) => {
	console.log("log: close  -> close", pid);
	const res = await fetch(`${paths.ptys}/${pid}`, {
		method: 'DELETE'
	});
	const killResponse = await res.json();
	console.log("log: close -> res", res, killResponse);
	connection.close();
	console.log("log: close", pid, connection.name);
	remove();
}

export const Term: React.FunctionComponent<Props> = ({ initialPid = '', remove, xId }) => {
	const ref = React.createRef<HTMLDivElement>();
	const [pid, setPid] = useState(initialPid);
	const [connected, setConnected] = useState(false);
	const [connection] = useState(() => {
		console.log("log: XTERM new WSConnection", pid);
		return new WSConnection(pid);
	});

	// Execute only once, when component is ready
	useEffect(() => {
		console.log("log: connection", connection);
		initXterm(connection, ref.current, setPid, setConnected);
	}, []);
	useEffect(() => {
		setPid(() => initialPid);
		console.log("log: initialPid", pid, initialPid);
	}, [initialPid]);

	return <div className={Term.displayName.toLowerCase() + (connected ? " connected" : "")}>
		<div className="term-buttons">PID: {pid}<button onClick={() => close(pid, connection, () => remove(xId))}>X</button></div>
		<div ref={ref}></div>
	</div>
}
Term.displayName = 'Term';
