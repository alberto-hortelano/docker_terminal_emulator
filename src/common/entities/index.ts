import { Project, SerializableProject } from './Project';

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

