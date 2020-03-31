import { SerializableCommand, dockerActions } from "../../common/entities/Command"
import { SchemaTypeOpts, Schema, SchemaType } from "mongoose"


type SerializableProjectKeys = {
	[K in keyof SerializableCommand]: SchemaTypeOpts<any> | Schema | SchemaType;
}

export const commandSchemaBase: SerializableProjectKeys = {
	name: {
		type: String,
		required: true,
		lowercase: true,
		unique: true,
	},
	text: {
		type: String,
		required: true,
	},
	dockerEvent: {
		service: String,
		action: {
			type: String,
			enum: dockerActions
		}
	},
	dependencies: [String],
}