import { connect, connection } from "mongoose";
import { mongoURI } from "../constants";

export { MongooseProject, ProjectModel } from "./MongooseProject";

connect(mongoURI, { useNewUrlParser: true });

connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
