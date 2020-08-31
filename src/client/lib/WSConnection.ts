import { EventEmitter } from 'events';
import { paths } from '../../common/paths';
import { Logger } from '../../common/Logger';
import { decodeData } from '../../common/lib';
import { WSServices } from '../../common/constants';

const console = new Logger(__filename, true);

const minTimeToRetry = 5000;

export interface WSConnection {
	on(event: DataTypes, listener: (data: string) => void): this;
}

export class WSConnection extends EventEmitter implements Connection {
	private ws: WebSocket;
	private wsUrl = `ws://${location.host + paths.ws}`;
	private connecting = false;

	constructor(public service: WSServices, public name = '') {
		super();
		console.warn("log: WSConnection  -> constructor ->  connectionName", this.name);
		this.wsUrl = `ws://${location.host + paths.ws}`;
		this.wsUrl += `?service=${this.service}`;
		if (this.name) {
			this.wsUrl += `&name=${this.name}`;
		}
		this.createConnection();
	}

	private waitToReconnect = async (lastAttempt = 0) => {
		const timeSinceLastAttempt = Math.max(0, Date.now() - lastAttempt);
		const delay = Math.max(0, minTimeToRetry - timeSinceLastAttempt);
		await new Promise(r => setTimeout(r, delay));
	}

	private createConnection = async (lastAttempt = 0) => {
		this.ws = null;
		if (this.connecting) {
			return;
		}
		this.emit('connected', false);
		this.connecting = true;
		await this.waitToReconnect(lastAttempt);
		this.connecting = false;
		lastAttempt = Date.now();
		try {
			console.warn('Created connection ', this.wsUrl);
			this.ws = new WebSocket(this.wsUrl);
		} catch (error) {
			console.error("log: createConnection -> new WebSocket error", this.wsUrl, error);
			return;
		}
		// this.ws.addEventListener('close', event => {
		// 	console.warn("log: Connection -> createConnection -> close", event);
		// 	this.createConnection(lastAttempt);
		// });
		this.ws.addEventListener('error', event => {
			console.warn("log: Connection -> createConnection -> error", event);
			this.createConnection(lastAttempt);
		});
		this.ws.addEventListener('message', ({ data }) => {
			const [eventType, eventData] = decodeData(data);
			this.emit(eventType, eventData);
		});
		this.ws.addEventListener('open', event => {
			console.warn("log: Connection -> createConnection -> open", event);
			this.emit('connected', true);
		});
	}

	send(data: string) {
		try {
			this.ws.send(data);
			console.log("log: WSConnection -> send -> data", data);
		} catch (error) {
			console.error("log: Connection -> send -> error ", error);
		}
	}

	close() {
		if (this.ws) {
			this.connecting = true;
			this.ws.close();
			console.warn('CONNECTION CLOSE');
		}
	}
}