import { RunningCommand } from "./RunningCommand";

const generateId = ((n: number) => () => n++)(0);

export class Pty {
	constructor(
		public pid = '',
		public id = generateId(),
		public command?: RunningCommand,
	) { }
}
