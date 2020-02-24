const _name = Symbol('name');
const _path = Symbol('path');
const _description = Symbol('description');
const _commands = Symbol('commands');

export interface SerializableProject { // Serializable properties. 
	name: string,
	path: string,
	description?: string,
	commands?: string[],
}

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
	get commands() {
		return this[_commands];
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

const p: SerializableProject = {
	name: 'name',
	path: 'path',
	commands: ['dd']
}
const p1 = new Project(p);
console.log("log: p1 getName", p1.name);
console.log("log: p1", p1, JSON.parse(JSON.stringify(p1.serializableProject)), p1.serializableProject, JSON.parse(JSON.stringify(p1)));
console.log("log: p1 getPath", p1.path);
p1.path = 'new path';
console.log("log: p1 getPath", p1.path);

