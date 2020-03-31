import { SerializableProject } from "../../common/entities/Project";
import { DBProject } from "../database/DBProject";

export const createProject = async (serializableProject: SerializableProject) => {
	const dbProject = new DBProject(serializableProject);
	const projectDoc = await dbProject.save();
	console.log("log: createProject -> projectDoc", projectDoc);
	return dbProject;
};

export const editProject = async (project: SerializableProject) => {
	const dbProject = await DBProject.load(project.name);
	console.log("log: editProject -> dbProject", dbProject);
	const updatedFields = dbProject.update(project);
	console.log("log: editProject -> updatedFields", updatedFields);
	if (updatedFields.length) {
		const projectDoc = await dbProject.save();
		console.log("log: editProject -> projectDoc", projectDoc);
	}
	return {
		project: dbProject,
		updatedFields
	};
};

export const getProjects = async (): Promise<DBProject[]> => {
	const projects = await DBProject.getAllProjects();
	return projects;
};

export const getProject = async (name: SerializableProject['name']): Promise<DBProject> => {
	const project = await DBProject.load(name);
	return project;
};

export const deleteProject = async (name: SerializableProject['name']) => {
	const project = await DBProject.delete(name);
	console.log("log: deleteProject -> project", project);
};



