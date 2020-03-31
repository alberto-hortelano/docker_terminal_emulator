import { IncomingMessage, Server as HttpServer } from "http";
import { parse } from "url";
import * as WS from "ws";
import { WSServices } from "../common/constants";

type Service = (socket: WS, request: IncomingMessage) => void;

type Services = {
	[name: string]: Service
};

export const services: Services = {};

export const addService = (name: WSServices, cb: Service) => {
	services[name] = cb;
}

export const initWebSocket = (server: HttpServer, path: string) => {
	const wss = new WS.Server({ server, path });
	// console.log("log: initWebSocket -> wss", wss);
	wss.on('connection', (ws, req) => {
		const service = parse(req.url, true).query.service.toString();
		services[service](ws, req);
	});
};
