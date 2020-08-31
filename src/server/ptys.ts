import * as WS from "ws";
import { spawn, IPty } from "node-pty";
import { parse } from "url";
import { Logger } from "../common/Logger";
import { encodeData } from "../common/lib";
import { terminalConfig } from "../common/constants";
import { addService } from "./wsServer";

const console = new Logger(__filename, true);

const ptys: { [pid: number]: IPty } = {};

const initPty = (ws: WS) => {
	const ptyProcess = spawn('sh', [], {
		name: 'xterm-256color',
		cwd: '../../projects',
		env: process.env,
		...terminalConfig
	});
	ptys[ptyProcess.pid] = ptyProcess;
	console.log("log: initPty -> ptyProcess", ptyProcess);
	ws.send(encodeData('pid', ptyProcess.pid.toString()));
	return ptyProcess;
}

const linkConnectionToPty = (ws: WS, pty: IPty) => {
	// WS
	ws.on('message', message => {
		// console.log("log: initWebSocket -> message", message);
		try {
			pty.write(message.toString());
		} catch (error) {
			console.error("log: initWebSocket -> error", error);
		}
	});
	ws.on('close', (code, reason) => {
		console.log('ws.close', { pid: pty.pid, code, reason });
	});
	ws.on('error', err => {
		console.error('ws.close -> error', err, pty.pid);
		pty.kill();
	});
	// PTY
	pty.on('data', data => {
		ws.send(encodeData('processData', data));
	});
	pty.on('exit', () => {
		ws.close();
		delete ptys[pty.pid];
		console.log("log: pty on exit   ", pty.pid, JSON.stringify(Object.keys(ptys)));
	});
}

export const getPtys = () => ptys;

export const getPty = (id: number) => ptys[id];

addService('pty', (ws, req) => {
	const name = parse(req.url, true)?.query?.name?.toString();
	console.warn("log: initWebSocket -> name", name);
	const pty = ptys[name] || initPty(ws);
	linkConnectionToPty(ws, pty);
	console.warn("log: initWebSocket ->", pty.pid);
});
