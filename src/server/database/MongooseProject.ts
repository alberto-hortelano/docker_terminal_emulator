import { model, Schema, Document, SchemaTypeOpts, SchemaType, Model } from "mongoose";
import { SerializableProject, Project } from "../../common/entities/Project";

interface ProjectDoc extends Document, SerializableProject { };

type SerializableProjectKeys = {
	[K in keyof SerializableProject]: SchemaTypeOpts<any> | Schema | SchemaType;
}

const schemaBase: SerializableProjectKeys = {
	name: { type: String, required: true, unique: true },
	path: { type: String, required: true },
	description: String,
	commands: [String],
}

const projectSchema = new Schema(schemaBase);

export const ProjectModel = model<ProjectDoc>('Project', projectSchema);

const _model = Symbol('model');
const _ensureModel = Symbol('ensureModel');

export class MongooseProject extends Project {
	private [_model]: ProjectDoc;
	constructor(project: SerializableProject, model?: ProjectDoc) {
		super(project);
		this[_model] = model;
	}
	private [_ensureModel]() {
		if (!this[_model]) {
			this[_model] = new ProjectModel(this.serializableProject);
		}
	}
	syncronizeModel() {
		console.log("log: MongooseProject -> syncronizeModel", this[_model]);
		this[_model].name = this.name;
		this[_model].path = this.path;
		this[_model].description = this.description;
		this[_model].commands = this.commands;
	}
	save() {
		console.log("log: MongooseProject -> save -> this[_model] before", this[_model]);
		this[_ensureModel]();
		console.log("log: MongooseProject -> save -> this[_model] after ensure", this[_model]);
		this.syncronizeModel();
		this[_model].save();
	}
}

