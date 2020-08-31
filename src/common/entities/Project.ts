import { SerializableCommand } from "./Command";

const _name = Symbol('name');
const _path = Symbol('path');
const _description = Symbol('description');
const _commands = Symbol('commands');

export interface SerializableProject { // Serializable properties. 
	name: string,
	path: string,
	description?: string,
	commands?: SerializableCommand[],
}

export const projectKeys: (keyof SerializableProject)[] = ["name", "path", "description", "commands"];

export class Project {
	private [_name]: SerializableProject['name'];
	private [_path]: SerializableProject['path'];
	private [_description]?: SerializableProject['description'];
	private [_commands]?: SerializableProject['commands'];

	constructor(project: SerializableProject) {
		this[_name] = project.name;
		this[_path] = project.path;
		this[_description] = project.description;
		this[_commands] = project.commands || [];
	}

	get name() {
		return this[_name];
	}
	get path() {
		return this[_path];
	}
	set path(newPath: SerializableProject['path']) {
		this[_path] = newPath;
	}
	get description() {
		return this[_description];
	}
	set description(description: SerializableProject['description']) {
		this[_description] = description;
	}
	get commands() {
		return this[_commands];
	}
	set commands(commands: SerializableProject['commands']) {
		this[_commands] = commands;
	}
	get serializableProject() {
		return {
			name: this[_name],
			path: this[_path],
			description: this[_description],
			commands: this[_commands],
		};
	}
}
