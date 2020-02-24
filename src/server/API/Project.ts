import { SerializableProject } from "../../common/entities/Project";
import { MongooseProject, ProjectModel } from "../database";

export const createProject = (serializableProject: SerializableProject = {
	name: 'Project-1',
	path: '/a/b',
	description: 'This is project one',
}) => {
	const project = new MongooseProject(serializableProject);
	console.log("log: project", project);

	project.path = '/new/path';
	console.log("log: project path", project.path);

	project.commands.push('new command');
	console.log("log: project commands", project.commands);
	project.save();
	ProjectModel.find({}, projects => {
		console.log("log: projects", projects);

	})
};

export const getProject = (name: SerializableProject['name'] = 'Project-1') => {
	ProjectModel.find({}, (err, projects) => {
		if (err) {
			console.log("log: getProject -> err", err);
		} else {
			console.log("log: projects", name, projects);
		}
	})
}
