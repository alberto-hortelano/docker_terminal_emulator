import { connect, connection } from "mongoose";
import { mongoURI } from "../constants";

export const initDB = () => {
	console.log("log: initDB -> mongoURI", mongoURI);
	connect(mongoURI, { useNewUrlParser: true });

	connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

}