

export class Project {
	private commands: string[] = [];
	private scripts: string[] = [];

	constructor(
		private name: string,
		public path: string,
		private description?: string
	) { }
	addCommand(command: string) {
		this.commands.push(command);
	}
	addScript(script: string) {
		this.scripts.push(script);
	}
	save() {

	}
}
