
const _name = Symbol('name');
const _text = Symbol('text');
const _active = Symbol('active');
const _dockerEvent = Symbol('dockerEvent');
const _dependencies = Symbol('dependencies');

// Acions emmited by "docker-compose events"
export const dockerActions = <const>[
	"none", "attach", "commit", "copy", "create", "destroy", "detach", "die", "exec_create",
	"exec_detach", "exec_die", "exec_start", "export", "health_status", "kill", "oom",
	"pause", "rename", "resize", "restart", "start", "stop", "top", "unpause", "update"
];

interface DockerEvent {
	service: string,
	action: typeof dockerActions[number],
}

export interface SerializableCommand { // Serializable properties. 
	name: string,
	text: string,
	active?: boolean;
	dockerEvent?: DockerEvent,
	dependencies?: Command['name'][],
}

export class Command {
	private [_name]: SerializableCommand['name'];
	private [_text]: SerializableCommand['text'];
	private [_active]: SerializableCommand['active'];
	private [_dockerEvent]: SerializableCommand['dockerEvent'];
	private [_dependencies]: SerializableCommand['dependencies'];

	constructor(command: SerializableCommand) {
		this[_name] = command.name;
		this[_text] = command.text;
		this[_active] = command.active || false;
		this[_dockerEvent] = command.dockerEvent || {
			service: '',
			action: 'none'
		};
		this[_dependencies] = command.dependencies || [];
	}
	get name() {
		return this[_name];
	}
	get text() {
		return this[_text];
	}
	get active() {
		return this[_active];
	}
	get dockerEvent() {
		return this[_dockerEvent];
	}
	get dependencies() {
		return this[_dependencies];
	}
}