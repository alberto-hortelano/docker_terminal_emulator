import { Command, SerializableCommand } from "../../common/entities/Command";
import { Pty } from "./Pty";

const _pid = Symbol('pid');
const _pty = Symbol('pty');

export class RunningCommand extends Command {
	private [_pid]: Pty['pid'];
	private [_pty]: Pty;
	constructor(command: SerializableCommand) {
		super(command);
	}
	get pid() {
		return this[_pid];
	}
	set pid(pid) {
		this[_pid] = pid;
	}
	get pty() {
		return this[_pty];
	}
	set pty(pty) {
		this[_pty] = pty;
	}
}
