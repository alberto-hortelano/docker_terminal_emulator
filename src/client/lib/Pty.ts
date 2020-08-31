import { RunningCommand } from "./RunningCommand";

const generateId = ((n: number) => () => n++)(0);

interface PtyArgs {
	pid?: string;
	id?: number;
	command?: RunningCommand;
}

export class Pty {
	public pid: string;
	public id: number;
	public command?: RunningCommand;
	constructor({ pid, id, command }: PtyArgs = {}) {
		this.pid = pid || '';
		this.id = id || generateId();
		this.command = command;
	}
}
