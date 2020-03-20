import { SerializableProject, Project, projectKeys } from "../../common/entities/Project";
import { model, Schema, Document, SchemaTypeOpts, SchemaType, Model } from "mongoose";

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
	commands: [String],
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
	static load(name: string) {
		return new Promise<DBProject>((resolve, reject) => {
			ProjectModel.findOne({ name }, (err, projectDoc) => {
				if (err) {
					reject(err);
				} else if (!projectDoc) {
					resolve();
				} else {
					const dbProject = new DBProject(projectDoc);
					resolve(dbProject);
				}
			});
		});
	}
	static getAllProjects() {
		return new Promise<DBProject[]>((resolve, reject) => {
			console.log("log: getAllProjects -> prev");
			ProjectModel.find({}, function FUUUUUUUU(err, projectDocs) {
				console.warn("log: getAllProjects -> err, projectDocs ", err, projectDocs);
				if (err) {
					console.log("log: getAllProjects -> err", err);
					reject(err);
				} else {
					console.log("log: getAllProjects -> dbProjects 1");
					const dbProjects = projectDocs.map(projectDoc => new DBProject(projectDoc));
					console.log("log: getAllProjects -> dbProjects 2", dbProjects);
					resolve(dbProjects);
				}
			})
		});
	}
}

