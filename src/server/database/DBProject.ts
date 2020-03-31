import { SerializableProject, Project, projectKeys } from "../../common/entities/Project";
import { model, Schema, Document, SchemaTypeOpts, SchemaType, Model } from "mongoose";
import { commandSchemaBase } from "./DBCommand";

export interface ProjectDoc extends SerializableProject, Document { };

function isProjectDoc(project: SerializableProject | ProjectDoc): project is ProjectDoc {
	// "model" is the name of the class that generates documents in mongoose
	return project.constructor?.name?.toLowerCase() === 'model';
}

type SerializableProjectKeys = {
	[K in keyof SerializableProject]: SchemaTypeOpts<any> | Schema | SchemaType;
}

const schemaBase: SerializableProjectKeys = {
	name: {
		type: String,
		required: true,
		lowercase: true,
		unique: true,
	},
	path: {
		type: String,
		required: true,
		lowercase: true,
	},
	description: String,
	commands: [commandSchemaBase],
}

const projectSchema = new Schema<ProjectDoc>(schemaBase);

/**
 * The model created by Mongoose for Project
 */
const ProjectModel = model<ProjectDoc, Model<ProjectDoc>>('Project', projectSchema);

const _projectDoc = Symbol('projectDoc');

export class DBProject extends Project {
	private [_projectDoc]: ProjectDoc;

	constructor(project: SerializableProject | ProjectDoc) {
		super(project);
		if (isProjectDoc(project)) {
			this[_projectDoc] = project;
		}
	}
	syncronizeModel() {
		projectKeys.forEach(k => {
			if (this[_projectDoc][k] !== this[k]) {
				// When accessing property of ProjectDoc by key the type is 
				// string & string[] instead of string | string[].
				// Don't know how to solve it :(
				this[_projectDoc][k] = this[k] as any;
			}
		});
	}
	update(project: SerializableProject) {
		const updatedFields: string[] = [];
		Object.keys(project).forEach(k => {
			if (this[k] !== project[k]) {
				this[k] = project[k];
				updatedFields.push(k);
			}
		});
		return updatedFields;
	}
	async save() {
		if (!this[_projectDoc]) {
			this[_projectDoc] = new ProjectModel(this.serializableProject);
			console.log("log: DBProject -> save -> new ProjectModel", this[_projectDoc]);
		} else {
			this.syncronizeModel();
		}
		console.log("log: DBProject -> save -> _projectDoc", this[_projectDoc]);
		const project = await this[_projectDoc].save();
		console.log("log: DBProject -> save -> project saved", project);
		return project;
	}
	static async delete(name: string) {
		try {
			const response = await ProjectModel.deleteOne({ name });
			console.log("log: DBProject -> delete -> response", response);
			return response;
		} catch (error) {
			console.log("log: DBProject -> delete -> error", error);
		}
	}
	static async load(name: string) {
		try {
			const projectDoc = await ProjectModel.findOne({ name });
			console.log("log: DBProject -> load -> projectDoc", projectDoc);
			const dbProject = new DBProject(projectDoc);
			return dbProject;
		} catch (error) {
			console.log("log: DBProject -> load -> error", error);
			return error;
		}
	}
	static async getAllProjects() {
		try {
			const response = await ProjectModel.find({});
			console.log("log: getAllProjects -> response", response);
			const dbProjects = response.map(projectDoc => new DBProject(projectDoc));
			return dbProjects;
		} catch (error) {
			console.log("log: getAllProjects -> error", error);
			return error;
		}
	}
}

