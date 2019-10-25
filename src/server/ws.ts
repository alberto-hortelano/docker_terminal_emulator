import * as WS from "ws";
import { Server as HttpServer } from "http";
import { spawn, ChildProcess } from "child_process";
// import { route } from "./router";

const parseData = (data: WS.Data) => {
	try {
		const [termId, command, ...options] = data.toString().split(' ');
		return { termId, command, options };
	} catch (error) {
		console.log("log: initWebSocket -> error", error);
		return { termId: null, command: null, options: null };
	}
}

export const initWebSocket = (server: HttpServer, path: string) => {
	const wss = new WS.Server({ server, path });
	console.log("log: initWebSocket -> wss", wss);
	wss.on('connection', ws => {
		console.log("log: WebSocket connection  -> ws", ws);
		let child: ChildProcess;
		ws.on('message', data => {
			// let msg;
			// try {
			// 	msg = JSON.parse(data.toString());
			// 	// route(data.toString(), ws.send);
			// } catch (error) {
			// 	console.log("log: initWebSocket -> error", error);
			// 	throw error.message;
			// }
			console.log("log: initWebSocket -> data", data);
			const { termId, command, options } = parseData(data);
			console.log("log: getWS -> data", termId, command, options, child);
			if (!child) {
				child = spawn(command, options);
				child.stdout.on('data', (data: Uint8Array) => {
					console.log("log: getWS.stdout -> data ", data.toString());
					ws.send(data.toString() + 'by term: ' + termId);
				});
				child.on('close', () => {
					console.log("log: getWS -> spwn", termId, child);
					child = null;
				})
				child.on('exit', () => {
					console.log("log: getWS -> spwn", termId, child);
					child = null;
				})
				child.on('disconnect', () => {
					console.log("log: getWS -> spwn", termId, child);
					child = null;
				})
				child.on('error', err => {
					console.log('error ', termId, err)
					ws.send(err.name + ' - ' + err.message + 'by term: ' + termId);
					child = null;
				})
				console.log("log: getWS -> spwn", child);
			} else {
				console.log("log: getWS -> stdin", child.stdin);
				child.stdin.write(data.toString())
			}
		})
		ws.on('close', () => console.log('closed', ws))

		console.log("log: getWS -> clients", wss.clients.size);
	});

};
